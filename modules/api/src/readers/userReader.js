const Users = require('../models/User')

exports.getUsers = async (db, query) => {
  const users = await Users.query(db).select('*').orderBy('id', 'ASC')
  if (!users) {
    return []
  }

  return users
}
