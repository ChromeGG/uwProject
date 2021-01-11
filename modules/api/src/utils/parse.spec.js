const { readFileSync } = require('fs')
const { parseHtmlDocument } = require('./parse')

describe('parseHtmlDocument', () => {
  test('can parse basic html document', async () => {
    const result = parseHtmlDocument(
      'dane.html',
      readFileSync(`${__dirname}/../../tests/fixtures/dane.html`).toString()
    )

    expect(result).toMatchSnapshot()
  })
})
