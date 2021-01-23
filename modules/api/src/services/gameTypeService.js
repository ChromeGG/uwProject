const GameTypes = require('../models/GameType')

exports.createGameType = async (db, input) => {
  input.weight = input.weight / 100

  return GameTypes.query(db).insert(input)
}
