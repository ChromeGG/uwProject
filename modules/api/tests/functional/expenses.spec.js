const { functional } = require('../setup')

const { Tester } = functional()

const checkTagsPivot = (tagId, expenseId) =>
  Tester.seeInDatabase('tags_expenses', {
    tagId,
    expenseId
  })

describe('GET /expenses', () => {
  test('should return empty array when no expenses found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/expenses')

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should return existing expenses', async () => {
    const { expenses } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request('GET', '/expenses')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload[0]).toMatchObject({
      id: expenses[0].id,
      value: expenses[0].value
    })
  })
})

describe('GET /expenses/{expenseId}', () => {
  test('should return choosen expense when correct id is present', async () => {
    const {
      expenses: [{ id, value }]
    } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'GET',
      `/expenses/${id}`
    )

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      id,
      value
    })
  })
})

describe('PATCH /expenses/{expenseId}', () => {
  test('should be able to update description', async () => {
    const { expenses } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'PATCH',
      `/expenses/${expenses[0].id}`,
      {
        payload: {
          description: 'test123'
        }
      }
    )

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      id: expenses[0].id,
      description: 'test123'
    })
  })

  test('should clear description when empty string is send', async () => {
    const { expenses } = await Tester.hasImportedExpenses(name, [
      {
        date: '2019-10-21',
        value: 421,
        description: 'test123'
      }
    ])

    expect(expenses[0]).toMatchObject({
      description: 'test123',
      id: expect.any(Number)
    })

    const { statusCode, payload } = await Tester.request(
      'PATCH',
      `/expenses/${expenses[0].id}`,
      {
        payload: {
          description: ''
        }
      }
    )

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      id: expenses[0].id,
      description: ''
    })
  })
})

describe('PUT /expenses/{expenseId}/tags', () => {
  test('should not be able to send string as payload', async () => {
    const { expenses } = await Tester.hasImportedExpenses()

    const { payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: ['aaaa']
        }
      }
    )

    expect(payload).toMatchObject({
      statusCode: 422,
      message: 'Unprocessable Entity',
      errors: { 'tagIds[0]': ['"tagIds[0]" must be a number'] }
    })
  })

  test('should be able to tag expense with single tag', async () => {
    const tag = await Tester.hasTag()
    const { expenses } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: [tag.id]
        }
      }
    )

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload[0]).toMatchObject({
      tag_id: tag.id,
      expense_id: expenses[0].id
    })
  })

  test('should be able to tag expense with multiple tags', async () => {
    const [tag1, tag2] = await Tester.hasTags(2)
    const { expenses } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: [tag1.id, tag2.id]
        }
      }
    )

    expect(payload).toHaveLength(2)
    expect(statusCode).toEqual(200)
    expect(await checkTagsPivot(tag1.id, expenses[0].id)).toBeTruthy()
    expect(await checkTagsPivot(tag2.id, expenses[0].id)).toBeTruthy()
  })

  test('should unrelate one tag from expense', async () => {
    const tag = await Tester.hasTag()
    const { expenses } = await Tester.hasImportedExpenses()

    await Tester.request('PUT', `/expenses/${expenses[0].id}/tags`, {
      payload: {
        tagIds: [tag.id]
      }
    })

    expect(await checkTagsPivot(tag.id, expenses[0].id)).toBeTruthy()

    const { statusCode, payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: []
        }
      }
    )

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should unrelate multiple tags from expense', async () => {
    const [tag1, tag2, tag3] = await Tester.hasTags(3)
    const { expenses } = await Tester.hasImportedExpenses()

    await Tester.request('PUT', `/expenses/${expenses[0].id}/tags`, {
      payload: {
        tagIds: [tag1.id, tag2.id, tag3.id]
      }
    })

    const { statusCode, payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: []
        }
      }
    )
    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should unrelate old tags and relate new tags to expense', async () => {
    const [oldTag1, oldTag2, newtag1, newtag2] = await Tester.hasTags(4)

    const { expenses } = await Tester.hasImportedExpenses()

    await Tester.request('PUT', `/expenses/${expenses[0].id}/tags`, {
      payload: {
        tagIds: [oldTag1.id, oldTag2.id]
      }
    })

    const { statusCode, payload } = await Tester.request(
      'PUT',
      `/expenses/${expenses[0].id}/tags`,
      {
        payload: {
          tagIds: [newtag1.id, newtag2.id]
        }
      }
    )

    const results = await Promise.all([
      checkTagsPivot(newtag1.id, expenses[0].id),
      checkTagsPivot(newtag2.id, expenses[0].id),
      checkTagsPivot(oldTag1.id, expenses[0].id),
      checkTagsPivot(oldTag2.id, expenses[0].id)
    ])

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(2)
    expect(results).toEqual([true, true, false, false])
  })
})
