const { giveRank: giveUserRank } = require('../../services/rankService')

module.exports = (db) => {
  const giveRank = async (user, gameType, rank = 1000) => {
    return giveUserRank(db.getKnex(), { userId: user.id, gameTypeId: gameType.id, rank })
  }

  return {
    giveRank
  }
}
