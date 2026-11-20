// Dates are stored as plain 'YYYY-MM-DD' strings (what most APIs/databases send for a date
// without a time). These helpers work in LOCAL time on purpose: `new Date('2026-11-20')`
// is parsed as UTC midnight, which can show up as the previous day in some time zones.

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** Today at local midnight. */
export function today() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Date -> 'YYYY-MM-DD' (local). */
export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** 'YYYY-MM-DD' -> Date at local midnight. */
export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** 'YYYY-MM-DD' for today + n days (n can be negative). */
export function daysFromToday(n) {
  const d = today()
  d.setDate(d.getDate() + n)
  return toISODate(d)
}

/** Whole days from today until the given date (negative = in the past). */
export function daysUntil(iso) {
  return Math.round((parseISODate(iso) - today()) / MS_PER_DAY)
}
