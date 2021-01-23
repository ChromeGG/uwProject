const Ranks = require('../models/Rank')

exports.getRank = async (db, query) => {
  const queryRank = Ranks.query(db)
    .select('nickname', 'rank')
    .join('users', 'ranks.user_id', 'users.id')

  if (query) {
    queryRank.where({ gameTypeId: query.gameTypeId })
  }

  const rank = await queryRank

  if (!rank) {
    return []
  }

  return rank
}
