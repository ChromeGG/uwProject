const Import = require('../models/Import')

exports.deleteImport = async (db, importId) => {
  return Import.query(db).deleteById(importId)
}
