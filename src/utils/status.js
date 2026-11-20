// "Business rules" that turn raw data into something the UI can show.
// Each function returns { key, label, tone }. `tone` is one of
// 'success' | 'warning' | 'danger' | 'info' | 'neutral' and maps to <Badge tone=...>.
// Keeping these rules here (not inside components) means the student and teacher
// screens always agree, and you can unit-test them later.

import { DUE_SOON_DAYS } from '@/config/app'
import { daysUntil } from './date'
import { pluralize } from './format'

export function getDueStatus(nextDueDate) {
  const days = daysUntil(nextDueDate)
  if (days < 0) {
    return { key: 'overdue', label: `Overdue by ${pluralize(-days, 'day')}`, tone: 'danger' }
  }
  if (days === 0) return { key: 'due-today', label: 'Due today', tone: 'warning' }
  if (days <= DUE_SOON_DAYS) {
    return { key: 'due-soon', label: `Due in ${pluralize(days, 'day')}`, tone: 'warning' }
  }
  return { key: 'upcoming', label: `Due in ${pluralize(days, 'day')}`, tone: 'neutral' }
}

/** True when a payment needs attention now (overdue or due today). */
export function isOutstanding(nextDueDate) {
  return daysUntil(nextDueDate) <= 0
}

export function getLessonStatus(startDate, endDate) {
  if (daysUntil(startDate) > 0) return { key: 'not-started', label: 'Not started', tone: 'info' }
  if (daysUntil(endDate) < 0) return { key: 'ended', label: 'Ended', tone: 'neutral' }
  return { key: 'ongoing', label: 'Ongoing', tone: 'success' }
}

/** 0–100: how much of the lesson period has passed. */
export function getLessonProgress(startDate, endDate) {
  const total = daysUntil(endDate) - daysUntil(startDate)
  if (total <= 0) return 100
  const elapsed = -daysUntil(startDate)
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)))
}

export const PAYMENT_STATUS = {
  paid: { label: 'Paid', tone: 'success' },
  pending: { label: 'Pending', tone: 'warning' },
  failed: { label: 'Failed', tone: 'danger' },
  refunded: { label: 'Refunded', tone: 'info' },
}

export const EXCEPTION_TYPES = {
  discount: { label: 'Discount', tone: 'info' },
  scholarship: { label: 'Scholarship', tone: 'success' },
  waiver: { label: 'Waiver', tone: 'success' },
  extension: { label: 'Extension', tone: 'warning' },
  installment: { label: 'Installment plan', tone: 'neutral' },
}

export function getExceptionStatus(exception) {
  if (daysUntil(exception.startDate) > 0) return { label: 'Scheduled', tone: 'info' }
  if (daysUntil(exception.endDate) < 0) return { label: 'Expired', tone: 'neutral' }
  return { label: 'Active', tone: 'success' }
}
