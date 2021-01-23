module.exports = db => ({
  ...require('./db')(db),
  ...require('./users')(db),
  ...require('./gameTypes')(db),
  ...require('./ranks')(db),
  ...require('./games')(db)
})
