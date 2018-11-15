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

    // Websocket
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

// Define our Post model
// id, createdAt, and updatedAt are added by sequelize automatically
let Post = database.define('posts', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

let Doc = database.define('docs', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Post model
epilogue.resource({
  model: Post,
  endpoints: ['/posts', '/posts/:id']
})

epilogue.resource({
  model: Doc,
  endpoints: ['/docs', '/docs/:id']
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '../../dist/index.html'))
})
