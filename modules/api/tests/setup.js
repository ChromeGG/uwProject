const knex = require('knex')
const { mergeDeepRight, mergeDeepLeft, omit } = require('ramda')
const qs = require('querystring')
const { initServer } = require('../src/server')
const { initDatabase } = require('../src/database')
const testHelpers = require('../src/utils/data/index')

const testRequest = async ({
  baseUrl = '',
  server,
  method,
  url,
  options = {}
}) => {
  const { query } = options
  let uri = url
  if (query) {
    for (const k of Object.keys(query)) {
      if (Array.isArray(query[k])) {
        query[k] = `[${query[k].join(',')}]`
      }
    }
    uri += `?${qs.stringify(query)}`
  }
  const requestData = mergeDeepRight({
    method,
    headers: {}
  })(omit(['query'], options))
  return server.sendTestRequest({ ...requestData, url: `${baseUrl}${uri}` })
}

const functionalTester = ({ db, server }) => ({
  async request(method, url, options = {}) {
    return testRequest({
      server,
      method,
      url,
      options: mergeDeepLeft(options, {
        payload: {}
      })
    })
  },
  ...testHelpers(db)
})
const integrationTester = ({ db }) => ({
  ...testHelpers(db)
})

// This is a workaround to have code completion in VSCode when we need to immediately return
// something that is set later. We're doing this because we want to have a nice one-liner setup function
/** @type functionalTester  */
const functionalCodeCompletion = () => ({})
/** @type integrationTester */
const integrationCodeCompletion = () => ({})

/** @param {Server} server */
exports.functional = (existingServer = false) => {
  /** @type Server */
  const server = existingServer || {}
  const Tester = functionalCodeCompletion()
  if (!existingServer) {
    beforeAll(async () => {
      try {
        Object.assign(server, await initServer())
      } catch (err) {
        console.error(err)
      }
    })
  }
  beforeEach(async () => {
    await server.getDatabaseProvider().startTransaction()
    Object.assign(
      Tester,
      functionalTester({
        db: server.getDatabaseProvider(),
        server
      })
    )
  })
  afterEach(async () => {
    await server.getDatabaseProvider().rollbackTransaction()
  })
  if (!existingServer) {
    afterAll(async () => {
      await server.getDatabaseProvider().destroy()
    })
  }
  return {
    server,
    Tester
  }
}

exports.integration = () => {
  const Tester = integrationCodeCompletion()
  const databaseProvider = initDatabase()
  const db = knex({ client: 'pg' })

  beforeEach(async () => {
    Object.assign(db, await databaseProvider.startTransaction())
    Object.assign(Tester, integrationTester({ db: databaseProvider }))
  })

  afterEach(async () => {
    await databaseProvider.rollbackTransaction()
  })

  afterAll(async () => {
    await databaseProvider.destroy()
  })

  return {
    /** @type {knex} */
    db,
    Tester
  }
}
