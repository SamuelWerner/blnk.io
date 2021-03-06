'use strict'

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const opn = require('opn')
const path = require('path')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('../build/webpack.prod.conf')
  : require('../build/webpack.dev.conf')
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable
const compiler = webpack(webpackConfig)
const uri = 'http://localhost:' + port

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

let app = express()

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
app.use(bodyParser({limit: '20mb'}))
app.use(bodyParser.json())

const Op = Sequelize.Op
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
  operatorsAliases: { // Prevent SQL Incjection see more -> https://stackoverflow.com/questions/46608382/sequelize-deprecated-error-message
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
})

database
  .sync({ force: false })
  .then(() => {
    var http = require('http').Server(app)
    http.listen(process.env.PORT || port, () => {
      console.log('listening to port localhost:' + port)
    })

    console.log('> Starting dev server...')
    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + uri + '\n')
      // when env is testing, don't need open it
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
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
