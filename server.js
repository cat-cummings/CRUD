// Server set up

const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
const server = express()

// Server Config

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.use(express.static('public'))

// Middleware

server.set('view engine', 'hbs')
server.use(express.urlencoded({ extended: true }))

// Routes

server.use('/', routes)

module.exports = server
