const Boom = require('@hapi/boom')
const { isEmpty, isNil } = require('ramda')

const errorParser = err => {
  const result = {}
  for (const value of err.details) {
    const key = value.context.key || value.context.label
    if (typeof key === 'undefined') {
      return Boom.badRequest('Payload needs to be sent')
    }
    if (isNil(result[key])) {
      result[key] = []
    }
    result[key].push(value.message)
  }

  return Boom.badData(null, result)
}

module.exports = {
  async preResponse(request, h) {
    const { response } = request
    if (response.isBoom && !isEmpty(response.data)) {
      delete response.output.payload.error
      response.output.payload.errors = response.data
      return response
    }
    return h.continue
  },

  async validationFailAction(request, h, err) {
    if (err.isJoi && Array.isArray(err.details)) {
      throw errorParser(err)
    }
    return h.response(err).takeover()
  }
}
