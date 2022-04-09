/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/no-nesting */

// route setup
const express = require('express')
const db = require('./db')
const router = express.Router()

// routes

// Home
router.get('/', (req, res) => {
  res.render('home')
})

// All tasks
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

// Add task
router.get('/add', (req, res) => {
  res.render('add_tasks')
})

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

// Delete task
router.get('/delete', (req, res) => {
  res.render('delete_task')
})

router.post('/delete', (req, res) => {
  const task = req.body.task
  db.getTaskByTaskID(task)
    .then((taskID) => {
      const task = taskID.id
      db.deleteTask(task).then(() => {
        res.redirect('/all')
      })
    })
    .catch((err) => {
      res.status(500).send('oops -' + err.message)
    })
})

// Update task
router.get('/update', (req, res) => {
  res.render('update_task')
})

router.post('/update', (req, res) => {
  const task = req.body.task
  db.getTaskByTaskID(task)
    .then((taskID) => {
      const task = taskID.id
      const new_date = req.body.due_date
      db.updateTaskDueDate(task, new_date).then(() => {
        res.redirect('all')
      })
    })
    .catch((err) => {
      res.status(500).send('oops -' + err.message)
    })
})

// Task by user
router.get('/id/:id', (req, res) => {
  const id = req.params.id
  db.getTasksByUserID(id)
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
