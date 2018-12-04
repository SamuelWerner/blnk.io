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

    // Websocket
    var positions = []
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
            socket.emit('messageSaved', {saved: false, expected: body.length, delivered: bodyLength})
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
      socket.on('addCaret', function (data) {
        let room = data['room']
        let event = data['event']
        if (positions.length > 0) {
          for (let i = 0; i < positions.length; i++) {
            if (positions[i]['username'] === data['message']['username']) {
              positions[i] = data['message']
            } else if (i === positions.length - 1) {
              positions.push(data['message'])
            }
          }
        } else {
          positions.push(data['message'])
        }
        console.log(positions)
        socket.to(room).emit(event, positions)
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
