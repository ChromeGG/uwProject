const { isNil } = require('ramda')

exports.validate = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false })
  if (error) {
    const errors = {}
    error.details.forEach(element => {
      const key = element.context.key || element.context.label
      if (!isNil(errors[key])) {
        errors[key].push(element.message)
      } else {
        errors[key] = [element.message]
      }
    })

    const err = new Error('Validation Error')
    err.errors = errors
    throw err
  }
  return value
}
