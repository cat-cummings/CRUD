exports.seed = function (knex) {
  return knex('tasks').insert([
    {
      id: 101,
      task: 'Book haircuts',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
    {
      id: 102,
      task: 'Water plants',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
    {
      id: 103,
      task: 'Mow lawns',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
    {
      id: 104,
      task: 'Wash sheets',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
    {
      id: 105,
      task: 'Clean the shower',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
    {
      id: 106,
      task: 'Vacuum room',
      creation_date: '31/3/22',
      due_date: '30/4/22',
    },
  ])
}
