import { Search } from 'lucide-react'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import PageHeader from '@/components/ui/PageHeader'
import PersonCell from '@/components/ui/PersonCell'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useTeacherEnrollments } from '@/services/queries'
import { formatCurrency, formatDate, pluralize } from '@/utils/format'
import { getDueStatus, getLessonStatus } from '@/utils/status'

const columns = [
  {
    key: 'student',
    header: 'Student',
    render: (e) => <PersonCell id={e.student.id} name={e.student.name} sub={e.student.grade} />,
  },
  {
    key: 'contact',
    header: 'Guardian / contact',
    render: (e) => (
      <>
        <div>{e.student.guardian}</div>
        <div className="muted small">{e.student.email}</div>
      </>
    ),
  },
  { key: 'schedule', header: 'Schedule' },
  { key: 'monthlyFee', header: 'Fee / month', align: 'right', render: (e) => formatCurrency(e.monthlyFee) },
  {
    key: 'nextDueDate',
    header: 'Next due',
    render: (e) => {
      const s = getDueStatus(e.nextDueDate)
      return (
        <>
          <div>{formatDate(e.nextDueDate)}</div>
          <Badge tone={s.tone}>{s.label}</Badge>
        </>
      )
    },
  },
  {
    key: 'lesson',
    header: 'Lessons',
    render: (e) => {
      const s = getLessonStatus(e.lessonStart, e.lessonEnd)
      return <Badge tone={s.tone}>{s.label}</Badge>
    },
  },
  {
    key: 'exceptionCount',
    header: 'Exceptions',
    align: 'right',
    render: (e) => (e.exceptionCount ? <Badge tone="info">{e.exceptionCount}</Badge> : <span className="muted">—</span>),
  },
]

export default function StudentList() {
  const { user } = useAuth()
  const enrollments = useTeacherEnrollments(user.id)
  const [search, setSearch] = useState('')

  return (
    <>
      <PageHeader
        title="Students"
        description="Everyone you teach, with their fees and payment status."
        actions={
          <label className="search">
            <Search aria-hidden="true" />
            <input
              type="search"
              placeholder="Search students…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
            />
          </label>
        }
      />
      <QueryState queries={enrollments}>
        {() => {
          const term = search.trim().toLowerCase()
          const rows = enrollments.data.filter((e) => e.student.name.toLowerCase().includes(term))
          return (
            <Card title={pluralize(rows.length, 'student')}>
              <DataTable columns={columns} rows={rows} emptyMessage="No students match your search." />
            </Card>
          )
        }}
      </QueryState>
    </>
  )
}
