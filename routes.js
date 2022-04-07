/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/no-nesting */
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

//add post route
router.post('/add', (req, res) => {
  const { name, task, due_date } = req.body

  //logic for creation date
  let creation_date = new Date()
  const yyyy = creation_date.getFullYear()
  let mm = creation_date.getMonth() + 1
  let dd = creation_date.getDate()

  creation_date = `${dd}/${mm}/${yyyy}`

  db.getUserByName(name)
    .then((userObj) => {
      const user_id = userObj.id
      const new_task = {
        user_id, //this throws error
        task,
        creation_date,
        due_date,
      }

      db.addTask(new_task).then(() => {
        res.redirect('/')
      })
    })
    .catch((err) => {
      res.status(500).send('oops -' + err.message)
    })
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
