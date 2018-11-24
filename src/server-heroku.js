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

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize(process.env.DATABASE_URL)

// Resets the database and launches the express app on :8081

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
        let room = data['room']
        let event = data['event']
        let newBody = data['message']
        socket.to(room).emit(event, newBody)
      })

      console.log('a user connected')
    })
  })

let Doc = database.define('docs2', {
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
