export const getYearMonthDay = (date: string): string[] => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDate()
  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ]
}

export const buildPath = (slug: string, date: string): string[] => [
  'blog',
  ...getYearMonthDay(date),
  slug,
]

export const printPath = (slug: string, date: string): string =>
  buildPath(slug, date).join('/')
