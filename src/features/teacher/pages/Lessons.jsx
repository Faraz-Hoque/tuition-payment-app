import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import PageHeader from '@/components/ui/PageHeader'
import PersonCell from '@/components/ui/PersonCell'
import ProgressBar from '@/components/ui/ProgressBar'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useTeacherEnrollments } from '@/services/queries'
import { formatDate } from '@/utils/format'
import { getLessonProgress, getLessonStatus } from '@/utils/status'

const columns = [
  {
    key: 'student',
    header: 'Student',
    render: (e) => <PersonCell id={e.student.id} name={e.student.name} sub={e.subject} />,
  },
  { key: 'schedule', header: 'Schedule' },
  { key: 'lessonStart', header: 'Starts', render: (e) => formatDate(e.lessonStart) },
  { key: 'lessonEnd', header: 'Ends', render: (e) => formatDate(e.lessonEnd) },
  {
    key: 'progress',
    header: 'Progress',
    render: (e) => {
      const pct = getLessonProgress(e.lessonStart, e.lessonEnd)
      return (
        <div className="progress-cell">
          <ProgressBar value={pct} label={`${e.student.name} lesson progress`} />
          <span className="muted small">{pct}%</span>
        </div>
      )
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (e) => {
      const s = getLessonStatus(e.lessonStart, e.lessonEnd)
      return <Badge tone={s.tone}>{s.label}</Badge>
    },
  },
]

export default function Lessons() {
  const { user } = useAuth()
  const enrollments = useTeacherEnrollments(user.id)

  return (
    <>
      <PageHeader title="Lesson periods" description="When each student’s lessons start and end." />
      <QueryState queries={enrollments}>
        {() => {
          const rows = [...enrollments.data].sort((a, b) => a.lessonStart.localeCompare(b.lessonStart))
          return (
            <Card>
              <DataTable columns={columns} rows={rows} />
            </Card>
          )
        }}
      </QueryState>
    </>
  )
}
