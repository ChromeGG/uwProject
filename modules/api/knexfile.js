const config = require('./config/config')

module.exports = {
  test: config('test').db,
  development: config('development').db,
  production: config('production').db
}
