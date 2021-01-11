const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /tags', () => {
  test('should return empty array when no tags are found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/tags')

    expect(statusCode).toEqual(200)
    expect(payload.results).toEqual([])
  })

  test('should return only one tag', async () => {
    const tag = await Tester.hasTag()

    const { statusCode, payload } = await Tester.request('GET', '/tags')

    expect(statusCode).toEqual(200)
    expect(payload.results).toHaveLength(1)
    expect(payload.results).toContainObject({
      id: tag.id,
      name: tag.name
    })
  })

  test('should return multiple tags', async () => {
    const tag1 = await Tester.hasTag()
    const tag2 = await Tester.hasTag()

    const { statusCode, payload } = await Tester.request('GET', '/tags')

    expect(statusCode).toEqual(200)
    expect(payload.results).toHaveLength(2)
    expect(payload.results).toContainObject({
      id: tag1.id,
      name: tag1.name
    })
    expect(payload.results).toContainObject({
      id: tag2.id,
      name: tag2.name
    })
  })

  test('should be able to search & paginate the results', async () => {
    const [tag1, , tag3] = await Promise.all([
      Tester.hasTag('lol'),
      Tester.hasTag('rotfl'),
      Tester.hasTag('xDlol')
    ])

    const { statusCode, payload } = await Tester.request('GET', '/tags', {
      query: { page: 0, perPage: 10, query: 'lol' }
    })

    expect(statusCode).toEqual(200)
    expect(payload.total).toEqual(2)
    expect(payload.results).toHaveLength(2)
    expect(payload.results).toContainObject({
      id: tag1.id,
      name: tag1.name
    })
    expect(payload.results).toContainObject({
      id: tag3.id,
      name: tag3.name
    })
  })

  test('should be able to paginate the results', async () => {
    await Promise.all([
      Tester.hasTag('lol'),
      Tester.hasTag('rotfl'),
      Tester.hasTag('xDlol')
    ])

    const { statusCode, payload } = await Tester.request('GET', '/tags', {
      query: { page: 0, perPage: 2 }
    })

    expect(statusCode).toEqual(200)
    expect(payload.total).toEqual(3)
    expect(payload.results).toHaveLength(2)
  })
})

describe('POST /tags', () => {
  test('should validate payload', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/tags', {
      payload: {
        lol: 'testTag'
      }
    })

    expect(statusCode).toEqual(422)
    expect(payload).toMatchObject({
      errors: {
        lol: ['"lol" is not allowed'],
        name: ['"name" is required']
      },
      message: 'Unprocessable Entity',
      statusCode: 422
    })
  })

  test('should create new tag', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/tags', {
      payload: {
        name: 'testTag'
      }
    })

    expect(statusCode).toEqual(201)
    expect(payload).toMatchObject({
      id: expect.any(Number),
      name: 'testTag'
    })
  })

  test('should fail when trying to create tag with already existing name', async () => {
    await Tester.hasTag('testTag')

    const { statusCode, payload } = await Tester.request('POST', '/tags', {
      payload: {
        name: 'testTag'
      }
    })

    expect(statusCode).toEqual(422)
    expect(payload).toMatchObject({
      errors: {
        name: ['"name" should be unique']
      },
      message: 'Unprocessable Entity',
      statusCode: 422
    })
  })
})

describe('DELETE /tags/{tagId}', () => {
  test('should return 204 and no body after removing tag', async () => {
    const tag = await Tester.hasTag()

    const { statusCode, payload } = await Tester.request(
      'DELETE',
      `/tags/${tag.id}`
    )

    expect(statusCode).toEqual(204)
    expect(payload).toBe('')
  })
})

describe('PATCH /tags/{tagId}', () => {
  test('should change name of created tag', async () => {
    const tag = await Tester.hasTag()

    const { statusCode, payload } = await Tester.request(
      'PATCH',
      `/tags/${tag.id}`,
      {
        payload: {
          name: 'newTag'
        }
      }
    )

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      id: expect.any(Number),
      name: 'newTag',
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  })

  test('should success if name is the same as name being changed', async () => {
    const tag = await Tester.hasTag('oldName')

    const { payload } = await Tester.request('PATCH', `/tags/${tag.id}`, {
      payload: {
        name: 'oldName'
      }
    })

    expect(payload).toMatchObject({
      id: tag.id,
      name: 'oldName'
    })
  })

  test('should fail if name is already taken by other tag', async () => {
    await Tester.hasTag('newName')
    const tag = await Tester.hasTag('oldName')

    const { payload } = await Tester.request('PATCH', `/tags/${tag.id}`, {
      payload: {
        name: 'newName'
      }
    })

    expect(payload).toMatchObject({
      statusCode: 422,
      message: 'Unprocessable Entity',
      errors: {
        name: ['"name" should be unique']
      }
    })
  })
})
