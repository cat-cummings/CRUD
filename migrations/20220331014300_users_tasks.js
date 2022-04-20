exports.up = function (knex) {
  return knex.schema.createTable('users_tasks', (table) => {
    table.increments('id').primary()
    table.int('user_id')
    table.int('task_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users_tasks')
}
