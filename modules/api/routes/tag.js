const Joi = require('@hapi/joi')
const {
  createUser: createTag,
  updateTag,
  deleteTag
} = require('../src/services/userService')
const { getTags } = require('../src/readers/tagsReader')

module.exports = [
  {
    method: 'GET',
    path: '/tags',
    config: {
      auth: false,
      description: 'Get all tags',
      notes: 'Get tags',
      tags: ['api'],
      validate: {
        query: Joi.object({
          page: Joi.number()
            .integer()
            .optional(),
          perPage: Joi.number()
            .integer()
            .optional(),
          query: Joi.string().optional()
        })
      }
    },
    handler: async ({ db, query }, h) => {
      return getTags(db, query)
    }
  },
  {
    method: 'POST',
    path: '/tags',
    config: {
      auth: false,
      description: 'Post tags',
      notes: 'Post tags',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required()
        })
      }
    },
    handler: async ({ db, payload: { name } }, h) => {
      const tag = await createTag(db, name)
      return h.response(tag).code(201)
    }
  },
  {
    method: 'DELETE',
    path: '/tags/{tagId}',
    config: {
      auth: false,
      description: 'Delete tags',
      notes: 'Delete tags',
      tags: ['api'],
      validate: {
        params: Joi.object({
          tagId: Joi.number().integer()
        })
      }
    },
    handler: async ({ db, params: { tagId } }, h) => {
      await deleteTag(db, tagId)
      return h.response().code(204)
    }
  },
  {
    method: 'PATCH',
    path: '/tags/{tagId}',
    config: {
      auth: false,
      description: 'Change tag name by its id',
      notes: 'Change tag name',
      tags: ['api'],
      validate: {
        params: Joi.object({
          tagId: Joi.number().integer()
        }),
        payload: Joi.object({
          name: Joi.string().required()
        })
      }
    },
    handler: async ({ db, params: { tagId }, payload: { name } }, h) => {
      return updateTag(db, tagId, name)
    }
  }
]
