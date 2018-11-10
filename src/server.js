/* eslint-disable no-path-concat */
process.env.dbEnvironment = 'local'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

// Resets the database and launches the express app on :8081

database
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 8081, () => {
      console.log('listening to port localhost:8081')
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
