const faker = require('faker')
const { createUser } = require('../../services/userService')

module.exports = db => {
  const hasUser = async nickname => {
    nickname = nickname || `${faker.random.words()}`
    return createUser(db.getKnex(), { nickname })
  }

  const hasUsers = async (howMany = 3) => {
    const promises = []
    for (let index = 0; index < howMany; index++) {
      promises.push(createUser(db.getKnex(), { nickname: `${faker.random.words()}` }))
    }
    return Promise.all(promises)
  }

  return {
    hasUser,
    hasUsers
  }
}
