const Tags = require('../models/Tag')

exports.getTags = async (db, { query, page = 0, perPage = 10 }) => {
  const qb = Tags.query(db)

  if (query) {
    qb.where('name', 'like', `%${query}%`)
  }

  return qb.orderBy('id', 'ASC').page(page, perPage)
}
