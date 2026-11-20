// ---------------------------------------------------------------------------
// API LAYER — the only place in the app that knows where data comes from.
//
// Components never import mock data directly. They call these async functions
// (through the hooks in ./queries.js). Right now the functions read the mock DB.
// Later, swap each body for a real request, e.g.
//
//   async getStudentEnrollments(studentId) {
//     const res = await fetch(`/api/students/${studentId}/enrollments`)
//     if (!res.ok) throw new Error('Could not load enrollments')
//     return res.json()
//   }
//
// As long as the returned shape stays the same, no component has to change.
// ---------------------------------------------------------------------------

import { MOCK_LATENCY_MS } from '@/config/app'
import * as db from '@/mock/db'

/** Simulates a network round-trip and returns a copy (so callers can't mutate the "DB"). */
async function respond(data) {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
  return structuredClone(data)
}

const byId = (list, id) => list.find((item) => item.id === id)
const newestFirst = (a, b) => b.paidOn.localeCompare(a.paidOn)

// --- Auth -------------------------------------------------------------------
// Demo login: picks a fixed user per role. Replace with a real login endpoint.
const DEMO_USERS = { student: 's1', teacher: 't1' }

export const authApi = {
  async loginAs(role) {
    const table = role === 'student' ? db.students : db.teachers
    const person = byId(table, DEMO_USERS[role])
    return respond({ id: person.id, name: person.name, email: person.email, role })
  },
}

// --- Student-facing ---------------------------------------------------------

export const studentApi = {
  /** Teachers this student learns from, with fee + due date + lesson period. */
  async getEnrollments(studentId) {
    const rows = db.enrollments
      .filter((e) => e.studentId === studentId)
      .map((e) => ({ ...e, teacher: byId(db.teachers, e.teacherId) }))
    return respond(rows)
  },

  /** All payments made by this student, newest first. */
  async getPayments(studentId) {
    const myEnrollments = db.enrollments.filter((e) => e.studentId === studentId)
    const rows = db.payments
      .filter((p) => myEnrollments.some((e) => e.id === p.enrollmentId))
      .map((p) => {
        const enrollment = byId(db.enrollments, p.enrollmentId)
        return {
          ...p,
          subject: enrollment.subject,
          teacherName: byId(db.teachers, enrollment.teacherId).name,
        }
      })
      .sort(newestFirst)
    return respond(rows)
  },
}

// --- Teacher-facing ---------------------------------------------------------

export const teacherApi = {
  /** Students this teacher teaches, with fee, due date, lesson period and exception count. */
  async getEnrollments(teacherId) {
    const rows = db.enrollments
      .filter((e) => e.teacherId === teacherId)
      .map((e) => ({
        ...e,
        student: byId(db.students, e.studentId),
        exceptionCount: db.paymentExceptions.filter((x) => x.enrollmentId === e.id).length,
      }))
    return respond(rows)
  },

  /** Payments received by this teacher, newest first. */
  async getPayments(teacherId) {
    const rows = db.payments
      .map((p) => ({ payment: p, enrollment: byId(db.enrollments, p.enrollmentId) }))
      .filter(({ enrollment }) => enrollment.teacherId === teacherId)
      .map(({ payment, enrollment }) => ({
        ...payment,
        subject: enrollment.subject,
        studentName: byId(db.students, enrollment.studentId).name,
      }))
      .sort(newestFirst)
    return respond(rows)
  },

  /** Payment exceptions (discounts, waivers, extensions...) for this teacher's students. */
  async getExceptions(teacherId) {
    const rows = db.paymentExceptions
      .map((x) => ({ exception: x, enrollment: byId(db.enrollments, x.enrollmentId) }))
      .filter(({ enrollment }) => enrollment.teacherId === teacherId)
      .map(({ exception, enrollment }) => ({
        ...exception,
        subject: enrollment.subject,
        student: byId(db.students, enrollment.studentId),
      }))
    return respond(rows)
  },
}
