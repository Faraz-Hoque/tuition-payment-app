import { CURRENCY, LOCALE } from '@/config/app'
import { parseISODate } from './date'

// Intl formatters are relatively expensive to create, so build them once and reuse.
const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
})

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

export function formatDate(iso) {
  return iso ? dateFormatter.format(parseISODate(iso)) : '—'
}

export function formatDateRange(startIso, endIso) {
  return `${formatDate(startIso)} – ${formatDate(endIso)}`
}

/** "1 day", "3 days" */
export function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

/** "Nadia Rahman" -> "NR" */
export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
