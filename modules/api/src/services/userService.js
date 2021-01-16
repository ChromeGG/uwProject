// const Boom = require('@hapi/boom')
const Users = require('../models/User')

exports.createUser = async (db, input) => {
  // const schema = Joi.object({
  //   nickname: Joi.string()
  // .min(3)
  // .max(30)
  // .required()
  // })

  // const result = schema.validate(input)

  // console.log(result)
  // const user = await Users.query(db)
  //   .where('nickname', input.nickname)
  //   .first()

  // if (user) {
  //   throw Boom.badData('"Nickname" should be unique')
  // }

  return Users.query(db).insert(input)
}

// exports.updateTag = async (db, tagId, name) => {
//   const tag = await Users.query(db)
//     .where('name', name)
//     .where('id', '!=', tagId)
//     .first()
//   if (tag) {
//     throw Boom.badData(null, { name: ['"name" should be unique'] })
//   }
//   return Users.query(db).updateAndFetchById(tagId, { name })
// }

// exports.deleteTag = async (db, tagId) => Users.query(db).deleteById(tagId)
