exports.seed = async (knex) => {
  await knex('users').insert([
    { nickname: 'J3rzy Bralczyq', created_at: new Date('2019-01-03') },
    { nickname: 'Jan Krzyś Duda', created_at: new Date('2019-02-13') },
    { nickname: 'John Cena', created_at: new Date('2019-11-21') },
    { nickname: 'Foo', created_at: new Date('2020-10-22') },
    { nickname: 'JuniorDev', created_at: new Date('2020-10-22') },
    { nickname: 'L0ck', created_at: new Date('2020-03-09') },
    { nickname: 'Dimple', created_at: new Date('2020-10-11') },
    { nickname: 'Rocky17', created_at: new Date('2021-01-11') }
  ])

  await knex('game_types').insert([
    { name: 'Szachy', weight: 0.3, created_at: new Date('2019-01-04') },
    { name: 'Scrabble', weight: 0.1, created_at: new Date('2019-11-04') },
    { name: 'Warcaby', weight: 0.1, created_at: new Date('2019-11-24') },
    { name: 'Go', weight: 0.05, created_at: new Date('2020-01-30') },
    { name: 'Kierki', weight: 0.2, created_at: new Date('2020-01-04') }
  ])

  await knex('games').insert([
    {
      game_types_id: '1',
      moves: `1.e4 e5
    2.Hh5 Sc6
    3.Gc4 Sf6
    4.Hxf7#`,
      date: new Date('2019-03-04'),
      created_at: new Date('2019-01-04')
    },
    {
      game_types_id: '2',
      moves: `J3rzy:?CEFPPU8FPFU+2020
      John:BLŚH6ŚL.B+1313
      Foo:?BCCEPPwym. BCPP+020
      JuniorDev:ADŁOZ6CZDAŁO.+1932
      J3rzy:?CEEHSZD2SCHE.ZiE+7292
      John:AAIRTC9TIARA+2153
      Foo:AABCĆMSB13BAĆ+24116
      JuniorDev:ADIJNRWE9NADRWIJ+74127
      J3rzy:ACEEIMS12E.ECESAMI+72188
      John:HYŹ10GHYŹ+29156
      Foo:IJKNOPYK6KOPNIJ.Y+78266
      JuniorDev:ÓSTF3STÓ.+11167
      J3rzy:AKLOPUW5IULW+42308
      John:AACEGKZwym. AACE+0167
      Foo:AGKMOPWA9KWAGOM+21329
      JuniorDev:?AIMNYZ3F.ZNYtAMI+74241`,
      date: new Date('2019-03-04'),
      created_at: new Date('2019-03-05')
    },
    {
      game_types_id: '3',
      moves: `1.e4 e5
      2.f3 c6
      3.b5 a6
      4.a4 f6
      5.h7 e7
      6.e1 b5
      7.b3 d6
      8.c3 a5
      9.c2 c5
      10.d4 c7`,
      date: new Date('2019-11-04'),
      created_at: new Date('2019-11-06')
    },
    {
      game_types_id: '1',
      moves: `1. e4 e5
      2. Nf3 d6
      3. d4 Bg4
      4. d4xe5 Bxf3
      5. Qxf3 d6xe5
      6. Bc4 Nf6
      7. Qb3 Qe7
      8. Nc3 c6
      9. Bg5 b5
      10. Nxb5 c6xb5
      11. Bxb5+ Nd7
      12. 0-0-0 Rd8
      13. Rxd7 Rxd7
      14. Rd1#`,
      date: new Date('2019-12-14'),
      created_at: new Date('2019-12-15')
    },
    {
      game_types_id: '1',
      moves: `1. e4 e5
      2. Nf3 Nc6
      3. Bb5 a6
      4. d4xe5 Bxf3
      5. Qxf3 d6xe5
      6. Bc4 Nf6
      7. Bb3 Qe7
      8. Nc3 e6
      9. Rg5 h5
      10. Nxb5 c6xb5
      11. Bxb5+ Nd7
      12. 0-0 Rd8
      13. Rxd7 Rxd7
      14. Qd1#`,
      date: new Date('2020-01-01'),
      created_at: new Date('2020-01-01')
    },
    {
      game_types_id: '4',
      moves: `A B C D E F G H
      8- X - Y X - X -
      7- X - Y - - X -
      6- Y - Y X - Y X
      5- - X - - - - X
      4- Y Y - Y - X X
      3X Y - X - - X -
      2X - Y X - - - X
      1- Y - -X - - X`,
      date: new Date('2020-01-01'),
      created_at: new Date('2020-01-01')
    },
    {
      game_types_id: '2',
      moves: `Dimple:?CEFPPU8FPFU+2020
      John:BLŚH6ŚL.B+1313
      Dimple:?BCCEPPwym. BCPP+020
      Dimple:ADŁOZ6CZDAŁO.+1932
      J3rzy:?CEEHSZD2SCHE.ZiE+7292
      John:AAIRTC9TIARA+2153
      Foo:AABCĆMSB13BAĆ+24116
      Dimple:ADIJNRWE9NADRWIJ+74127
      J3rzy:ACEEIMS12E.ECESAMI+72188
      Dimple:HYŹ10GHYŹ+29156
      Foo:IJKNOPYK6KOPNIJ.Y+78266
      Dimple:ÓSTF3STÓ.+11167
      J3rzy:AKLOPUW5IULW+42308
      John:AACEGKZwym. AACE+0167
      Dimple:AGKMOPWA9KWAGOM+21329
      JuniorDev:?AIMNYZ3F.ZNYtAMI+74241`,
      date: new Date('2020-02-04'),
      created_at: new Date('2020-04-05')
    },
    {
      game_types_id: '3',
      moves: `1.a4 g5
      2.d3 c6
      3.b5 a6
      4.a4 e6
      5.h7 e7
      6.e1 b5
      7.b3 d6
      8.c3 a5
      9.c2 h5
      10.e4 c1`,
      date: new Date('2021-01-04'),
      created_at: new Date('2021-01-06')
    }
  ])

  await knex('users_games').insert([
    { game_id: '1', user_id: '2', place: 1 }, // chess
    { game_id: '1', user_id: '1', place: 2 },
    { game_id: '2', user_id: '1', place: 1 }, // scrabble
    { game_id: '2', user_id: '3', place: 2 },
    { game_id: '2', user_id: '4', place: 3 },
    { game_id: '2', user_id: '5', place: 4 },
    { game_id: '3', user_id: '2', place: 1 }, // checkers
    { game_id: '3', user_id: '5', place: 2 },
    { game_id: '4', user_id: '2', place: 1 }, // chess
    { game_id: '4', user_id: '4', place: 2 },
    { game_id: '5', user_id: '5', place: 1 }, // go
    { game_id: '5', user_id: '1', place: 2 },
    { game_id: '6', user_id: '3', place: 1 }, // scrabble
    { game_id: '6', user_id: '5', place: 2 },
    { game_id: '6', user_id: '7', place: 3 },
    { game_id: '7', user_id: '2', place: 1 }, // chess
    { game_id: '7', user_id: '1', place: 2 },
    { game_id: '8', user_id: '5', place: 1 }, // checkers
    { game_id: '8', user_id: '6', place: 2 }
  ])

  await knex('ranks').insert([
    { user_id: '1', game_type_id: '1', rank: 1050 },
    { user_id: '2', game_type_id: '1', rank: 1555 },
    { user_id: '4', game_type_id: '1', rank: 885 },
    { user_id: '1', game_type_id: '2', rank: 1155 },
    { user_id: '3', game_type_id: '2', rank: 1200 },
    { user_id: '4', game_type_id: '2', rank: 1020 },
    { user_id: '5', game_type_id: '2', rank: 900 },
    { user_id: '7', game_type_id: '2', rank: 920 },
    { user_id: '3', game_type_id: '3', rank: 1050 },
    { user_id: '6', game_type_id: '3', rank: 920 },
    { user_id: '5', game_type_id: '4', rank: 1050 },
    { user_id: '1', game_type_id: '4', rank: 1025 },
    { user_id: '2', game_type_id: '3', rank: 1125 },
    { user_id: '5', game_type_id: '3', rank: 825 }
  ])
}
