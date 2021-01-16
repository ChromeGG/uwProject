const Users = require('../models/User')

exports.getUsers = async (db, { query, page = 0, perPage = 10 }) => {
  const qb = Users.query(db)

  if (query) {
    qb.where('name', 'like', `%${query}%`)
  }

  return qb.orderBy('id', 'ASC').page(page, perPage)
}
