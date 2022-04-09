// db functions

const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

function listTasks(db = conn) {
  return db('tasks').select()
}

function getTasksByUserId(id, db = conn) {
  return db('tasks')
    .join('users_tasks', 'tasks.id', 'users_tasks.task_id')
    .join('users', 'users_tasks.user_id', 'users.id')
    .where('user_id', id)
    .select()
}

function getUserByName(name, db = conn) {
  return db('users').where('name', name).first()
}

function addTask(input, db = conn) {
  return db('tasks').insert(input)
}

function addUserTask(input, db = conn) {
  return db('users_tasks').insert(input)
}

function getLastTaskID(db = conn) {
  return db('tasks').max('id AS task_id')
}

function deleteTask(id, db = conn) {
  return db('tasks').where('id', id).del()
}

function getTaskByTaskID(task, db = conn) {
  return db('tasks').where('task', task).select()
}

module.exports = {
  listTasks,
  getTasksByUserId,
  addTask,
  getUserByName,
  addUserTask,
  getLastTaskID,
  deleteTask,
  getTaskByTaskID,
}
