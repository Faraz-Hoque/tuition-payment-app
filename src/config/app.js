// App-wide settings. Change these in one place instead of hunting through components.

export const APP_NAME = 'TuitionPay'

// Used by Intl formatters in utils/format.js
export const CURRENCY = 'USD'
export const LOCALE = 'en-US'

// A payment is shown as "due soon" when it is this many days away or fewer.
export const DUE_SOON_DAYS = 7

// Simulated network delay for the mock API (ms). Set to 0 for instant responses.
export const MOCK_LATENCY_MS = 350
