const faker = require('faker')
const { createGameType } = require('../../services/gameTypeService')

module.exports = db => {
  const hasGameType = async (name, weight) => {
    name = name || `${faker.random.words()}`
    weight = weight || 10
    return createGameType(db.getKnex(), { name, weight })
  }

  const hasGameTypes = async (howMany = 2) => {
    const promises = []
    for (let index = 0; index < howMany; index++) {
      promises.push(createGameType(db.getKnex(), { name: `${faker.random.words()}`, weight: 10 }))
    }
    return Promise.all(promises)
  }

  return {
    hasGameType,
    hasGameTypes
  }
}
