const Joi = require('@hapi/joi')
const { parseHtmlDocument } = require('../src/utils/parse')
const { importExpenses } = require('../src/services/expensesService')
const { deleteImport } = require('../src/services/importsService')
const { getImports, getExpenses } = require('../src/readers/expensesReader')

module.exports = [
  {
    method: 'GET',
    path: '/imports',
    config: {
      auth: false,
      description: 'Get all imports',
      notes: 'Get imports',
      tags: ['api']
    },
    handler: async ({ db }, h) => {
      return getImports(db)
    }
  },
  {
    method: 'POST',
    path: '/imports',
    config: {
      auth: false,
      description: 'Import expenses endpoint',
      notes: 'Imports expenses',
      tags: ['api'],
      payload: {
        output: 'data',
        parse: true,
        allow: 'multipart/form-data'
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),

          file: Joi.string().required()
        })
      }
    },
    handler: async ({ db, payload: { file, name } }, h) => {
      const parsed = parseHtmlDocument(name, file)
      const result = await importExpenses(db, parsed)
      return h.response(result).code(201)
    }
  },
  {
    method: 'DELETE',
    path: '/imports/{importId}',
    config: {
      auth: false,
      description: 'Delete single import',
      notes: 'Delete import',
      tags: ['api'],
      validate: {
        params: Joi.object({
          importId: Joi.number().integer()
        })
      }
    },
    handler: async ({ db, params: { importId } }, h) => {
      await deleteImport(db, importId)
      return h.response().code(204)
    }
  },
  {
    method: 'GET',
    path: `/imports/{importId}/expenses`,
    config: {
      auth: false,
      description: 'Get expenses by importId',
      notes: 'Get expenses',
      tags: ['api'],
      validate: {
        params: Joi.object({
          importId: Joi.number().integer()
        })
      }
    },
    handler: async ({ db, params: { importId } }, h) => {
      return getExpenses(db, importId)
    }
  }
]
