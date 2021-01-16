const faker = require('faker')
const { createUser: createTag } = require('../../services/userService')

module.exports = db => {
  const hasTag = async name => {
    name = name || `${faker.random.words()}`
    return createTag(db.getKnex(), name)
  }

  const hasTags = async (howMany = 3) => {
    const promises = []
    for (let index = 0; index < howMany; index++) {
      promises.push(createTag(db.getKnex(), `${faker.random.words()}`))
    }
    return Promise.all(promises)
  }

  return {
    hasTag,
    hasTags
  }
}
