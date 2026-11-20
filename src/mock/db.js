// ---------------------------------------------------------------------------
// MOCK DATABASE
// Shaped like tables in a real database: each record has an `id`, and records
// point at each other with foreign keys (`studentId`, `teacherId`, `enrollmentId`).
// Only src/services/api.js should import this file. When a real backend exists,
// this file gets deleted and api.js calls the server instead.
//
// Dates are generated relative to today so the demo never goes stale.
// ---------------------------------------------------------------------------

import { LOCALE } from '@/config/app'
import { daysFromToday as d, today } from '@/utils/date'

function monthLabel(offsetMonths) {
  const date = today()
  date.setDate(1)
  date.setMonth(date.getMonth() + offsetMonths)
  return date.toLocaleDateString(LOCALE, { month: 'long', year: 'numeric' })
}

export const teachers = [
  { id: 't1', name: 'Nadia Rahman', subject: 'Mathematics', email: 'nadia@example.com', phone: '+1 555 0101' },
  { id: 't2', name: 'Daniel Okafor', subject: 'Physics', email: 'daniel@example.com', phone: '+1 555 0102' },
  { id: 't3', name: 'Mei Lin', subject: 'English Literature', email: 'mei@example.com', phone: '+1 555 0103' },
  { id: 't4', name: 'Carlos Mendes', subject: 'Guitar', email: 'carlos@example.com', phone: '+1 555 0104' },
]

export const students = [
  { id: 's1', name: 'Ayaan Khan', grade: 'Grade 10', email: 'ayaan@example.com', guardian: 'Imran Khan' },
  { id: 's2', name: 'Sara Ahmed', grade: 'Grade 9', email: 'sara@example.com', guardian: 'Leila Ahmed' },
  { id: 's3', name: 'Leo Martins', grade: 'Grade 11', email: 'leo@example.com', guardian: 'Ana Martins' },
  { id: 's4', name: 'Priya Nair', grade: 'Grade 10', email: 'priya@example.com', guardian: 'Ravi Nair' },
  { id: 's5', name: 'Omar Haddad', grade: 'Grade 12', email: 'omar@example.com', guardian: 'Hana Haddad' },
  { id: 's6', name: 'Emma Novak', grade: 'Grade 8', email: 'emma@example.com', guardian: 'Petr Novak' },
]

// An enrollment = one student taking lessons from one teacher.
// This is where fees, due dates and the lesson period live.
export const enrollments = [
  { id: 'e1', studentId: 's1', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(3), lessonStart: d(-60), lessonEnd: d(120), schedule: 'Mon & Wed · 5:00 PM' },
  { id: 'e2', studentId: 's1', teacherId: 't2', subject: 'Physics', monthlyFee: 140, nextDueDate: d(-4), lessonStart: d(-30), lessonEnd: d(150), schedule: 'Tue & Thu · 6:00 PM' },
  { id: 'e3', studentId: 's1', teacherId: 't3', subject: 'English Literature', monthlyFee: 90, nextDueDate: d(15), lessonStart: d(-90), lessonEnd: d(90), schedule: 'Sat · 10:00 AM' },
  { id: 'e4', studentId: 's1', teacherId: 't4', subject: 'Guitar', monthlyFee: 80, nextDueDate: d(0), lessonStart: d(-10), lessonEnd: d(80), schedule: 'Fri · 4:00 PM' },
  { id: 'e5', studentId: 's2', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(-10), lessonStart: d(-120), lessonEnd: d(60), schedule: 'Mon & Wed · 6:00 PM' },
  { id: 'e6', studentId: 's3', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(12), lessonStart: d(-45), lessonEnd: d(135), schedule: 'Tue · 4:00 PM' },
  { id: 'e7', studentId: 's4', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(6), lessonStart: d(7), lessonEnd: d(187), schedule: 'Thu · 5:00 PM' },
  { id: 'e8', studentId: 's5', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(-1), lessonStart: d(-200), lessonEnd: d(-5), schedule: 'Sat · 2:00 PM' },
  { id: 'e9', studentId: 's6', teacherId: 't1', subject: 'Mathematics', monthlyFee: 120, nextDueDate: d(20), lessonStart: d(-15), lessonEnd: d(165), schedule: 'Sun · 11:00 AM' },
  { id: 'e10', studentId: 's2', teacherId: 't3', subject: 'English Literature', monthlyFee: 90, nextDueDate: d(2), lessonStart: d(-60), lessonEnd: d(120), schedule: 'Sat · 12:00 PM' },
  { id: 'e11', studentId: 's3', teacherId: 't2', subject: 'Physics', monthlyFee: 140, nextDueDate: d(9), lessonStart: d(-75), lessonEnd: d(105), schedule: 'Fri · 6:00 PM' },
]

// Special arrangements that change what/when a student pays.
// `value` meaning depends on `type`: percent for discount/scholarship, days for extension.
export const paymentExceptions = [
  { id: 'x1', enrollmentId: 'e7', type: 'discount', value: 20, detail: 'Sibling discount (20%)', startDate: d(7), endDate: d(187), note: 'Brother also enrolled.' },
  { id: 'x2', enrollmentId: 'e5', type: 'extension', value: 14, detail: 'Due date extended by 14 days', startDate: d(-10), endDate: d(4), note: 'Family emergency.' },
  { id: 'x3', enrollmentId: 'e8', type: 'waiver', value: 120, detail: 'Final month fee waived', startDate: d(-30), endDate: d(-5), note: 'Missed lessons due to teacher travel.' },
  { id: 'x4', enrollmentId: 'e9', type: 'scholarship', value: 50, detail: 'Merit scholarship (50%)', startDate: d(-15), endDate: d(165), note: 'Top of regional olympiad.' },
  { id: 'x5', enrollmentId: 'e6', type: 'discount', value: 10, detail: 'Early-bird discount (10%)', startDate: d(-45), endDate: d(-15), note: 'First month only.' },
  { id: 'x6', enrollmentId: 'e2', type: 'installment', value: 2, detail: 'Split into 2 installments', startDate: d(-30), endDate: d(30), note: '' },
]

// Payment history is generated: roughly one payment per month since each enrollment started.
function buildPayments() {
  const methods = ['Card', 'Bank transfer', 'Cash']
  // Make the most recent payment of a few enrollments non-"paid" so every status appears.
  const latestStatusOverrides = { e2: 'failed', e10: 'pending', e11: 'refunded' }
  const result = []
  let n = 1

  enrollments.forEach((enrollment, i) => {
    for (let monthsAgo = 1; monthsAgo <= 4; monthsAgo++) {
      const paidOn = d(-monthsAgo * 30 + 2)
      if (paidOn < enrollment.lessonStart) continue // ISO date strings compare correctly as text
      result.push({
        id: `p${n++}`,
        enrollmentId: enrollment.id,
        amount: enrollment.monthlyFee,
        paidOn,
        period: monthLabel(-monthsAgo),
        method: methods[(i + monthsAgo) % methods.length],
        status: monthsAgo === 1 ? (latestStatusOverrides[enrollment.id] ?? 'paid') : 'paid',
      })
    }
  })
  return result
}

export const payments = buildPayments()
