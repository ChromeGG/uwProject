module.exports = db => ({
  ...require('./db')(db),
  ...require('./expenses')(db),
  ...require('./tags')(db)
})
