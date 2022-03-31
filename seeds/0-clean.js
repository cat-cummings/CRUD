// This file is used to empty out the database in a specific order so foreign key constraints aren't violated
// the filename begins with a 0 so it runs before any other seed file (and those files are also ordered to ensure foreign key data is present when needed)

exports.seed = (knex) => {
  // The following function is added to make the statements below easier/quicker to read and write
  const empty = (table) => knex(table).delete()

  return empty('users_tasks')
    .then(() => empty('users'))
    .then(() => empty('tasks'))
}
