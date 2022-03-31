exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary
    table.string('task')
    table.date('creation_date')
    table.data('due_date')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}
