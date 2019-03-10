/* eslint-disable no-path-concat */
global.dbEnvironment = 'server'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect')

let app = express()
app.use(sslRedirect())
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
    var positions = new Map()
    const io = require('socket.io')(http)
    io.on('connection', function (socket) {
      var currentRoomId // room = document
      socket.on('joinRoom', function (room) {
        socket.join(room)
        currentRoomId = room
        if (!positions.has(currentRoomId)) positions.set(currentRoomId, [])
      })

      socket.on('titleChange', function (data) {
        let room = data['room']
        let event = data['event']
        let title = data['message']
        socket.to(room).emit(event, title)
      })
      socket.on('distributeChanges', function (data) {
        let room = data['room']
        let difference = data['difference']
        if (!difference || difference === '[]' || difference === []) {
          return
        }
        socket.to(room).emit('textChange', {difference: difference})
      })
      socket.on('savePaper', function (data) {
        let hash = data['hash']
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
        })
      })
      socket.on('addCaret', function (data) {
        if (positions.get(currentRoomId).length > 0) {
          for (let i = 0; i < positions.get(currentRoomId).length; i++) {
            if (positions.get(currentRoomId)[i]['username'] === data['message']['username']) {
              positions.get(currentRoomId)[i] = data['message']
              break
            } else if (i === positions.get(currentRoomId).length - 1) {
              positions.get(currentRoomId).push(data['message'])
            }
          }
        } else {
          positions.get(currentRoomId).push(data['message'])
        }
        socket.to(currentRoomId).emit('updateUsers', {message: positions.get(currentRoomId), roomID: currentRoomId})
        // Send to all including Sender
        io.sockets.in(currentRoomId).emit('updateUsers', {message: positions.get(currentRoomId)})
      })
      socket.on('disconnect', function () {
        // Delete User from Position
        for (var i = 0; i < positions.get(currentRoomId).length; i++) {
          if (positions.get(currentRoomId)[i]['username'] === socket.id) {
            positions.get(currentRoomId).splice(i, 1)
          }
        }
        // Send to all excluding sender
        socket.to(currentRoomId).emit('disconnectUser', {user: socket.id})
      })
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
