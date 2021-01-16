const Import = require('../models/GameType')

exports.deleteImport = async (db, importId) => {
  return Import.query(db).deleteById(importId)
}
