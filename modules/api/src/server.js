const { port, host, corsOrigins } = require('../config/config')()
const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const hapiSwagger = require('hapi-swagger')
const { initDatabase } = require('./database')
const routes = require('../routes/index')
const errorHandler = require('./errorHandler')

exports.initServer = async (options = {}) => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: corsOrigins,
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      timeout: {
        server: 5000,
        socket: false
      },
      validate: {
        options: {
          abortEarly: false
        },
        failAction: errorHandler.validationFailAction
      }
    }
  })

  const databaseProvider = initDatabase()

  const scheme = () => {
    return {
      async authenticate(request, h) {
        return h.authenticated({
          credentials: { id: 1, email: 'john.doe@example.com' }
        })
      }
    }
  }

  server.auth.scheme('custom', scheme)

  server.auth.strategy('default', 'custom')

  server.auth.default('default')

  if (options.middlewares) {
    await server.register(options.middlewares)
  }

  await server.register([inert, vision])
  await server.register({
    plugin: hapiSwagger,
    options: {
      produces: ['application/json', 'application/vnd.ms-excel'],
      documentationPath: '/documentation',
      sortPaths: 'path-method',
      pathPrefixSize: 5,
      info: {
        title: 'API Documentation'
      },
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  })

  server.route(routes)

  server.events.on(
    { name: 'request', channels: 'error' },
    (request, event, tags) => {
      if (tags.error) {
        console.error(event.error)
      }
    }
  )

  server.ext('onPreHandler', async (request, h) => {
    request.db = databaseProvider.getKnex()
    return h.continue
  })

  server.ext('onPreResponse', errorHandler.preResponse)

  function getDatabaseProvider() {
    return databaseProvider
  }

  function getServerUri() {
    return server ? server.info.uri : null
  }

  /**
   * @param {object} data
   */
  async function sendTestRequest(data) {
    const res = await server.inject(data)
    if (
      res.headers['content-type'] &&
      res.headers['content-type'].match(/^application\/json/)
    ) {
      res.payload = JSON.parse(res.payload)
    }
    return res
  }

  async function start({ testPort } = {}) {
    if (testPort) {
      server.settings.port = testPort
    }
    return server.start()
  }

  async function stop() {
    return server.stop()
  }

  return {
    getDatabaseProvider,
    getServerUri,
    sendTestRequest,
    start,
    stop
  }
}
