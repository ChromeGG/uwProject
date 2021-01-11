/**
 * @param {import('knex')} db
 */
exports.getReports = async db => {
  const series = []

  const total = await db
    .from('expenses')
    .select('date', db.raw('SUM(value) as value'))
    .groupBy('date')
    .orderBy('date', 'ASC')

  series.push({
    label: 'total',
    data: total.map(({ date, value }) => ({
      x: date.toISOString().substring(0, 10),
      y: value
    }))
  })

  const tags = await db
    .select('date', 'tags.name', db.raw('SUM(value) as value'))
    .from('expenses')
    .join('tags_expenses', 'expenses.id', 'tags_expenses.expense_id')
    .join('tags', 'tags.id', 'tags_expenses.tag_id')
    .groupBy(['date', 'tags.name'])
    .orderBy('date', 'ASC')

  const groupedByTags = tags.reduce((r, a) => {
    r[a.name] = [...(r[a.name] || []), a]
    return r
  }, {})

  for (const [label, value] of Object.entries(groupedByTags)) {
    series.push({
      label,
      data: value.map(({ date, value }) => ({
        x: date.toISOString().substring(0, 10),
        y: value
      }))
    })
  }

  return {
    series
  }
}
