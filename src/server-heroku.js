/* eslint-disable no-path-concat */
global.dbEnvironment = 'server'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
var path = require('path')

let app = express()
app.use(bodyParser({limit: '20mb'}))
app.use(bodyParser.json())
app.use(express.static('dist'))

let database = new Sequelize(process.env.DATABASE_URL)

database
  .sync({ force: false })
  .then(() => {
    var http = require('http').Server(app)
    http.listen(process.env.PORT || 8081, () => {
      console.log('listening to port localhost:8081')
    })

    // Socket.io
    var io = require('socket.io')(http)
    io.on('connection', function (socket) {
      socket.on('room', function (room) {
        socket.join(room)
      })

      socket.on('titleChange', function (data) {
        let room = data['room']
        let event = data['event']
        let title = data['message']
        socket.to(room).emit(event, title)
      })

      socket.on('textChange', function (data) {
        let hash = data['hash']
        let room = data['room']
        let event = data['event']
        let difference = data['difference']
        let distanceDiff = data['distanceDiff']
        let bodyLength = data['bodyLength']

        Doc.findOne({
          where: {hash: hash}
        }).then(docs => {
          let body = docs.get('body')
          if (body.length !== bodyLength) {
            console.error('Die Dokumente sind nicht mehr synchron')
            socket.emit('messageSaved', {saved: false})
            return // Die Inhalte der zwei Dokumente stimmen nicht mehr überein
          } else {
            socket.emit('messageSaved', {saved: true})
          }
          for (let i in difference) {
            let diff = (difference[i])
            if (!diff) return
            if (diff.EndDeletePosition - diff.StartInsertPosition > 0) {
              body = body.substr(0, diff.StartInsertPosition) + diff.newData + body.substr(diff.EndDeletePosition)
            } else {
              body = body.substr(0, diff.StartInsertPosition) + diff.newData + body.substr(diff.StartInsertPosition)
            }
          }

          docs.updateAttributes({
            body: body
          })
          socket.to(room).emit(event, {difference: difference, distanceDiff: distanceDiff})
        })
      })

      console.log('a user connected')
    })
  })

let Doc = database.define('docs', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  hash: Sequelize.TEXT
})
// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

var docs = epilogue.resource({
  model: Doc,
  endpoints: ['/docs', '/docs/:hash'],
  sort: {
    default: '-updatedAt,title'
  }
})
var restMiddleware = require('./middleware/docs')

docs.use(restMiddleware)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '../../dist/index.html'))
})
