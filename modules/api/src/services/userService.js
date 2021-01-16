const Boom = require('@hapi/boom')
const Users = require('../models/User')
// const Joi = require('@hapi/joi')

exports.createUser = async (db, name) => {
  console.log(name)
  // const user = await Users.query(db)
  //   .where('nickname', name)
  //   .first()

  // if (user) {
  //   throw Boom.badData(null, { name: ['"name" should be unique'] })
  // }

  // return Users.query(db).insert({ name })
}

exports.updateTag = async (db, tagId, name) => {
  const tag = await Users.query(db)
    .where('name', name)
    .where('id', '!=', tagId)
    .first()
  if (tag) {
    throw Boom.badData(null, { name: ['"name" should be unique'] })
  }
  return Users.query(db).updateAndFetchById(tagId, { name })
}

exports.deleteTag = async (db, tagId) => Users.query(db).deleteById(tagId)
