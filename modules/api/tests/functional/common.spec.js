const { functional } = require('../setup')

const { Tester } = functional()

test('should return statusCode 200 on /health check endpoint', async () => {
  // 1. Setup
  // 2. Test
  const { statusCode, payload } = await Tester.request('GET', '/health')

  // 3. Assertions
  expect(statusCode).toEqual(200)
  expect(payload).toEqual({ ok: true })
})
