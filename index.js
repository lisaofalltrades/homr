// modules
const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// server
const http = require('http').createServer(app)
const port = process.env.PORT || 8000


// middleware
app.use(express.static(path.join(__dirname, 'client-react/build')))
app.use(express.json())
app.use(morgan('tiny'))


http.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
