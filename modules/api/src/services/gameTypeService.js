// const Boom = require('@hapi/boom')
const GameTypes = require('../models/GameType')

exports.createGameType = async (db, input) => {
  input.weight = input.weight / 100
  // console.log(result)
  // const user = await Users.query(db)
  //   .where('nickname', input.nickname)
  //   .first()

  // if (user) {
  //   throw Boom.badData('"Nickname" should be unique')
  // }

  return GameTypes.query(db).insert(input)
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
