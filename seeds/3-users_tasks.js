exports.seed = function (knex) {
  return knex('users_tasks').insert([
    { id: 1, user_id: 1, task_id: 101 },
    { id: 2, user_id: 1, task_id: 102 },
    { id: 3, user_id: 2, task_id: 103 },
    { id: 4, user_id: 1, task_id: 104 },
    { id: 5, user_id: 2, task_id: 105 },
    { id: 6, user_id: 2, task_id: 106 },
  ])
}
