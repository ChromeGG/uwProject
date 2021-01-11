const { initServer } = require('./src/server')

;(async () => {
  const server = await initServer()
  await server.start()
  console.log(`Server started at: ${server.getServerUri()}`)
})()

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})
