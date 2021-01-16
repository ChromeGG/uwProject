const { Model } = require('objection')

class Base extends Model {
  $beforeInsert() {
    if (this.constructor.timestamps) {
      const timestamp = new Date().toISOString()
      this.createdAt = timestamp
      this.updatedAt = timestamp
    }
  }

  $beforeUpdate() {
    if (this.constructor.timestamps) {
      this.updatedAt = new Date().toISOString()
    }
  }

  getTableName() {
    return this.constructor.tableName
  }

  static get pickJsonSchemaProperties() {
    return true
  }
}

module.exports = Base
