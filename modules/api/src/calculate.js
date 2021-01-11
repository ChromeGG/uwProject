const fs = require('fs')
const { reduce, filter } = require('ramda')

const data = JSON.parse(fs.readFileSync('./parsed.json'))

console.log('Suma:', reduce((acc, { value }) => (acc += value), 0, data))

console.log(
  'Suma Adrian:',
  reduce(
    (acc, { value }) => (acc += value),
    0,
    filter(row => row.category === 'A', data)
  )
)

console.log(
  'Suma Dom:',
  reduce(
    (acc, { value }) => (acc += value),
    0,
    filter(row => row.category === 'D', data)
  )
)

console.log(
  'Suma Firma:',
  reduce(
    (acc, { value }) => (acc += value),
    0,
    filter(row => row.category === 'F', data)
  )
)
