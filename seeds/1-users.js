exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, name: 'Cat' },
    { id: 2, name: 'Eliza' },
  ])
}
