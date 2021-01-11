const Boom = require('@hapi/boom')
const Tags = require('../models/Tag')

exports.createTag = async (db, name) => {
  const tag = await Tags.query(db)
    .where('name', name)
    .first()
  if (tag) {
    throw Boom.badData(null, { name: ['"name" should be unique'] })
  }

  return Tags.query(db).insert({ name })
}

exports.updateTag = async (db, tagId, name) => {
  const tag = await Tags.query(db)
    .where('name', name)
    .where('id', '!=', tagId)
    .first()
  if (tag) {
    throw Boom.badData(null, { name: ['"name" should be unique'] })
  }
  return Tags.query(db).updateAndFetchById(tagId, { name })
}

exports.deleteTag = async (db, tagId) => Tags.query(db).deleteById(tagId)
