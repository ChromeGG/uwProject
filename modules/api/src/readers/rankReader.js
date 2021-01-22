const Ranks = require('../models/Rank')

exports.getRank = async (db, query) => {
  console.log(query)
  // FIX IT
  const rank = await Ranks.query(db).select('*').withGraphJoined('user').where({ gameTypeId: query.gameTypeId })
  if (!rank) {
    return []
  }

  console.log(rank)

  // if (query) {
  //   users.where('nickname', 'like', `%${query}%`)
  // }

  return rank
}
