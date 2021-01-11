const convert = require('html-to-json-data')
const { group, text } = require('html-to-json-data/definitions')

exports.parseHtmlDocument = (fileName, html) => {
  let balance = 0
  const charges = []
  const recognition = []
  const parsed = convert(html, {
    fileName,
    data: group($ => $('div > table:nth-child(7) tr'), {
      id: text('td:first-child'),
      date: text('td:nth-child(2)'),
      description: text('td:nth-child(3)'),
      details: text('td:nth-child(4)'),
      value: text('td:nth-child(5)'),
      valuePLN: text('td:nth-child(6)')
    })
  })

  for (const entry of parsed.data) {
    if (!isNaN(parseInt(entry.id, 10))) {
      const value = parseFloat(
        entry.valuePLN
          .replace(',', '.')
          .replace('- ', '-')
          .replace(/ /g, '')
      )

      const date = entry.date.substring(0, 10)

      if (value < 0) {
        charges.push({
          date,
          operation: entry.description,
          details: entry.details,
          value
        })
      } else {
        recognition.push({
          date,
          operation: entry.description,
          details: entry.details,
          value
        })
      }
    } else {
      if (entry.id.match(/^SALDO/)) {
        balance = parseFloat(
          entry.date
            .replace(',', '.')
            .replace('- ', '-')
            .replace(/ /g, '')
        )
      }
    }
  }

  return { fileName, charges, recognition, balance }
}
