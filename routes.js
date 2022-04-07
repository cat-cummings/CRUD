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

  db.getUserByName(name).then((userObj) => {
    //get user id that matches name for tasks table
    const new_task = {
      task,
      creation_date,
      due_date,
    }
    db.addTask(new_task) //adds task to task table
      .then(() => {
        db.getLastTaskID().then((id) => {
          const user_task = {
            user_id: userObj.id,
            task_id: id[0].task_id, //gets id of task just added
          }
          db.addUserTask(user_task).then(() => {
            //adds task id and user id to users_tasks table
            res.redirect('/')
          })
        })
      })
      .catch((err) => {
        res.status(500).send('oops -' + err.message)
      })
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
