const Users = require('../models/User')

exports.createUser = async (db, input) => {
  return Users.query(db).insert(input)
}
