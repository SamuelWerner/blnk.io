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
        let difference = data['difference']
        if (!difference || difference === '[]' || difference === []) {
          return
        }

        Doc.findOne({
          where: {hash: hash}
        }).then(docs => {
          var obj = JSON.parse(docs.get('body'))
          let diff = JSON.parse(difference)
          diff.push({'timestamp': Date.now()})
          obj.changes.push(diff)
          var body = JSON.stringify(obj)
          docs.updateAttributes({
            body: body
          })
          socket.to(room).emit('textChange', {difference: difference})
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
