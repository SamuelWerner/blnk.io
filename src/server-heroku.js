/* eslint-disable no-path-concat */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
var path = require('path')

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('dist'))

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize('postgres://zqwiaftoiffqit:109878db79a215594ae56e0baa01ddd45442a89ee8f944c0b8009e481def7d5d@ec2-75-101-138-26.compute-1.amazonaws.com:5432/ddui8mmmfa9dqf')

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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '../../dist/index.html'))
})