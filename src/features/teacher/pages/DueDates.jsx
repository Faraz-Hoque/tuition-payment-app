import Card from '@/components/ui/Card'
import DueList from '@/components/ui/DueList'
import PageHeader from '@/components/ui/PageHeader'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useTeacherEnrollments } from '@/services/queries'
import { formatCurrency } from '@/utils/format'
import { getDueStatus } from '@/utils/status'

// Groups are defined as data, so adding e.g. "Due this month" is one more entry.
const GROUPS = [
  { title: 'Overdue', keys: ['overdue'] },
  { title: 'Due within a week', keys: ['due-today', 'due-soon'] },
  { title: 'Later', keys: ['upcoming'] },
]

export default function DueDates() {
  const { user } = useAuth()
  const enrollments = useTeacherEnrollments(user.id)

  return (
    <>
      <PageHeader title="Due dates" description="Upcoming and overdue tuition payments, grouped by urgency." />
      <QueryState queries={enrollments}>
        {() => {
          const sorted = [...enrollments.data].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
          return (
            <div className="stack">
              {GROUPS.map((group) => {
                const rows = sorted.filter((e) => group.keys.includes(getDueStatus(e.nextDueDate).key))
                const total = rows.reduce((sum, e) => sum + e.monthlyFee, 0)
                return (
                  <Card
                    key={group.title}
                    title={`${group.title} (${rows.length})`}
                    action={<span className="muted">{formatCurrency(total)}</span>}
                  >
                    <DueList
                      emptyMessage="Nothing here."
                      items={rows.map((e) => ({
                        id: e.id,
                        person: e.student,
                        sub: `${e.student.grade} · ${e.subject}`,
                        amount: e.monthlyFee,
                        dueDate: e.nextDueDate,
                      }))}
                    />
                  </Card>
                )
              })}
            </div>
          )
        }}
      </QueryState>
    </>
  )
}
