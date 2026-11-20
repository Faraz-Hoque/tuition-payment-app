// ---------------------------------------------------------------------------
// PAGE REGISTRY: the single source of truth for pages in each area.
// router.jsx builds the routes from these lists and the Sidebar builds its links
// from them, so they can never drift apart.
//
// To add a page:
//   1. Create the component in src/features/<area>/pages/
//   2. Add ONE entry below. That's it: it gets a URL and a sidebar link.
//
// path: '' is the area's home page (e.g. /student). Others become /student/<path>.
// ---------------------------------------------------------------------------

import { BadgePercent, BookOpen, CalendarClock, LayoutDashboard, Receipt, Users } from 'lucide-react'
import MyTeachers from '@/features/student/pages/MyTeachers'
import PaymentHistory from '@/features/student/pages/PaymentHistory'
import StudentDashboard from '@/features/student/pages/StudentDashboard'
import DueDates from '@/features/teacher/pages/DueDates'
import Lessons from '@/features/teacher/pages/Lessons'
import PaymentExceptions from '@/features/teacher/pages/PaymentExceptions'
import StudentList from '@/features/teacher/pages/StudentList'
import TeacherDashboard from '@/features/teacher/pages/TeacherDashboard'

export const studentPages = [
  { path: '', label: 'Dashboard', icon: LayoutDashboard, Component: StudentDashboard },
  { path: 'payments', label: 'Payment history', icon: Receipt, Component: PaymentHistory },
  { path: 'teachers', label: 'My teachers', icon: Users, Component: MyTeachers },
]

export const teacherPages = [
  { path: '', label: 'Dashboard', icon: LayoutDashboard, Component: TeacherDashboard },
  { path: 'students', label: 'Students', icon: Users, Component: StudentList },
  { path: 'due-dates', label: 'Due dates', icon: CalendarClock, Component: DueDates },
  { path: 'exceptions', label: 'Payment exceptions', icon: BadgePercent, Component: PaymentExceptions },
  { path: 'lessons', label: 'Lesson periods', icon: BookOpen, Component: Lessons },
]

// Each "area" = one role with its own URL prefix, sidebar and pages.
export const areas = [
  { role: 'student', basePath: '/student', sectionLabel: 'Student', pages: studentPages },
  { role: 'teacher', basePath: '/teacher', sectionLabel: 'Teacher', pages: teacherPages },
]
