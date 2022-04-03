// db functions

const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

function listTasks(db = conn) {
  return db('tasks').select()
}

function getTasksById(id, db = conn) {
  return db('tasks')
    .join('users_tasks', 'tasks.id', 'users_tasks.task_id')
    .join('users', 'users_tasks.user_id', 'users.id')
    .where('user_id', id)
    .select()
}

module.exports = {
  listTasks,
  getTasksById,
}
