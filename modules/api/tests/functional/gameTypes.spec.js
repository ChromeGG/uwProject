const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /game-types', () => {
  test('should return empty array when no users are found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/game-types')

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should return only one game type', async () => {
    const gameType = await Tester.hasGameType()

    const { statusCode, payload } = await Tester.request('GET', '/game-types')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload).toContainObject({
      id: gameType.id,
      name: gameType.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  })

  // test('should return multiple game types', async () => {
  //   const [gameType1, gameType2] = await Tester.hasGameTypes(2)

  //   const { statusCode, payload } = await Tester.request('GET', '/game-types')

  //   console.log(payload)
  //   expect(statusCode).toEqual(200)
  //   expect(payload).toHaveLength(2)
  //   expect(payload).toContainObject({
  //     id: gameType1.id,
  //     nickname: gameType1.nickname
  //   })
  //   expect(payload).toContainObject({
  //     id: gameType2.id,
  //     nickname: gameType2.nickname
  //   })
  // })

  // test('should be able to search & paginate the results', async () => {
  //   const [tag1, , tag3] = await Promise.all([
  //     Tester.hasTag('lol'),
  //     Tester.hasTag('rotfl'),
  //     Tester.hasTag('xDlol')
  //   ])

  //   const { statusCode, payload } = await Tester.request('GET', '/users', {
  //     query: { page: 0, perPage: 10, query: 'lol' }
  //   })

  //   expect(statusCode).toEqual(200)
  //   expect(payload.total).toEqual(2)
  //   expect(payload.results).toHaveLength(2)
  //   expect(payload.results).toContainObject({
  //     id: tag1.id,
  //     name: tag1.name
  //   })
  //   expect(payload.results).toContainObject({
  //     id: tag3.id,
  //     name: tag3.name
  //   })
  // })

  // test('should be able to paginate the results', async () => {
  //   await Promise.all([
  //     Tester.hasTag('lol'),
  //     Tester.hasTag('rotfl'),
  //     Tester.hasTag('xDlol')
  //   ])

  //   const { statusCode, payload } = await Tester.request('GET', '/users', {
  //     query: { page: 0, perPage: 2 }
  //   })

  //   expect(statusCode).toEqual(200)
  //   expect(payload.total).toEqual(3)
  //   expect(payload.results).toHaveLength(2)
  // })
})

describe('POST /game-types', () => {
  test('should create new game type', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/game-types', {
      payload: {
        name: 'Chess',
        weight: 20
      }
    })

    expect(statusCode).toEqual(201)
    expect(payload).toMatchObject({
      id: expect.any(String),
      name: 'Chess',
      weight: 0.2
    })

    const resultInDb = await Tester.grabFirstFromDatabase('game_types')
    expect(resultInDb).toMatchObject({
      name: 'Chess',
      weight: '0.2'
    })
  })

  // test('should fail when trying to create user with already existing name', async () => {
  //   await Tester.hasTag('testTag')

  //   const { statusCode, payload } = await Tester.request('POST', '/users', {
  //     payload: {
  //       name: 'testTag'
  //     }
  //   })

  //   expect(statusCode).toEqual(422)
  //   expect(payload).toMatchObject({
  //     errors: {
  //       name: ['"name" should be unique']
  //     },
  //     message: 'Unprocessable Entity',
  //     statusCode: 422
  //   })
  // })
})

// describe('DELETE /users/{tagId}', () => {
//   test('should return 204 and no body after removing user', async () => {
//     const user = await Tester.hasTag()

//     const { statusCode, payload } = await Tester.request(
//       'DELETE',
//       `/users/${user.id}`
//     )

//     expect(statusCode).toEqual(204)
//     expect(payload).toBe('')
//   })
// })

// describe('PATCH /users/{tagId}', () => {
//   test('should change name of created user', async () => {
//     const user = await Tester.hasTag()

//     const { statusCode, payload } = await Tester.request(
//       'PATCH',
//       `/users/${user.id}`,
//       {
//         payload: {
//           name: 'newTag'
//         }
//       }
//     )

//     expect(statusCode).toEqual(200)
//     expect(payload).toMatchObject({
//       id: expect.any(Number),
//       name: 'newTag',
//       createdAt: expect.any(String),
//       updatedAt: expect.any(String)
//     })
//   })

//   test('should success if name is the same as name being changed', async () => {
//     const user = await Tester.hasTag('oldName')

//     const { payload } = await Tester.request('PATCH', `/users/${user.id}`, {
//       payload: {
//         name: 'oldName'
//       }
//     })

//     expect(payload).toMatchObject({
//       id: user.id,
//       name: 'oldName'
//     })
//   })

//   test('should fail if name is already taken by other user', async () => {
//     await Tester.hasTag('newName')
//     const user = await Tester.hasTag('oldName')

//     const { payload } = await Tester.request('PATCH', `/users/${user.id}`, {
//       payload: {
//         name: 'newName'
//       }
//     })

//     expect(payload).toMatchObject({
//       statusCode: 422,
//       message: 'Unprocessable Entity',
//       errors: {
//         name: ['"name" should be unique']
//       }
//     })
//   })
// })
