// ---------------------------------------------------------------------------
// DATA HOOKS — built on TanStack Query (https://tanstack.com/query).
//
// useQuery handles loading/error state, caching and refetching for you.
// The `queryKey` identifies the data in the cache: two components asking for
// ['student', 's1', 'payments'] share ONE request and ONE cached result.
// So the dashboard and the Payment history page reuse each other's data.
//
// When you add mutations later (e.g. "record a payment"), use useMutation and
// then invalidate the matching keys so lists refresh automatically:
//   queryClient.invalidateQueries({ queryKey: queryKeys.student.payments(id) })
// ---------------------------------------------------------------------------

import { useQuery } from '@tanstack/react-query'
import { studentApi, teacherApi } from './api'

// Centralised keys so you never mistype one in two places.
export const queryKeys = {
  student: {
    enrollments: (id) => ['student', id, 'enrollments'],
    payments: (id) => ['student', id, 'payments'],
  },
  teacher: {
    enrollments: (id) => ['teacher', id, 'enrollments'],
    payments: (id) => ['teacher', id, 'payments'],
    exceptions: (id) => ['teacher', id, 'exceptions'],
  },
}

// --- Student ---
export function useStudentEnrollments(studentId) {
  return useQuery({
    queryKey: queryKeys.student.enrollments(studentId),
    queryFn: () => studentApi.getEnrollments(studentId),
  })
}

export function useStudentPayments(studentId) {
  return useQuery({
    queryKey: queryKeys.student.payments(studentId),
    queryFn: () => studentApi.getPayments(studentId),
  })
}

// --- Teacher ---
export function useTeacherEnrollments(teacherId) {
  return useQuery({
    queryKey: queryKeys.teacher.enrollments(teacherId),
    queryFn: () => teacherApi.getEnrollments(teacherId),
  })
}

export function useTeacherPayments(teacherId) {
  return useQuery({
    queryKey: queryKeys.teacher.payments(teacherId),
    queryFn: () => teacherApi.getPayments(teacherId),
  })
}

export function useTeacherExceptions(teacherId) {
  return useQuery({
    queryKey: queryKeys.teacher.exceptions(teacherId),
    queryFn: () => teacherApi.getExceptions(teacherId),
  })
}
