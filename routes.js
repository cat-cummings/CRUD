// route setup

const express = require('express')
const db = require('./db')
const router = express.Router()

// routes

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/all', (req, res) => {
  db.listTasks()
    .then((tasks) => {
      const data = {
        tasks,
      }
      res.render('all_tasks', data)
    })
    .catch((err) => {
      res.status(500).send('uh oh - ' + err.message)
    })
})

router.get('/add', (req, res) => {
  res.render('add_tasks')
})

router.post('/add', (req, res) => {
  console.log(req.body)
  res.redirect('/add')
})

router.get('/id/:id', (req, res) => {
  const id = req.params.id
  db.getTasksById(id)
    .then((tasks) => {
      const data = {
        tasks,
      }
      res.render('user', data)
    })
    .catch((err) => {
      res.status(500).send('uh oh - ' + err.message)
    })
})

module.exports = router
