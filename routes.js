// route setup

const express = require('express')
const db = require('./db')
const router = express.Router()

// routes

router.get('/', (req, res) => {
  res.send('this works!')
})
