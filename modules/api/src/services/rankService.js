const Rank = require('../models/Rank')

exports.giveRank = async (db, input) => {
  return Rank.query(db).insert(input)
}
