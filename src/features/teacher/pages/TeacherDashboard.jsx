import { AlertTriangle, BadgePercent, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import DueList from '@/components/ui/DueList'
import PageHeader from '@/components/ui/PageHeader'
import QueryState from '@/components/ui/QueryState'
import StatCard from '@/components/ui/StatCard'
import { useAuth } from '@/features/auth/AuthContext'
import { useTeacherEnrollments, useTeacherExceptions, useTeacherPayments } from '@/services/queries'
import { formatCurrency, formatDate, pluralize } from '@/utils/format'
import { getExceptionStatus, getLessonStatus, isOutstanding, PAYMENT_STATUS } from '@/utils/status'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const enrollments = useTeacherEnrollments(user.id)
  const payments = useTeacherPayments(user.id)
  const exceptions = useTeacherExceptions(user.id)

  return (
    <>
      <PageHeader title={`Hi, ${user.name.split(' ')[0]}`} description="Here’s how your students’ payments look today." />
      <QueryState queries={[enrollments, payments, exceptions]}>
        {() => (
          <DashboardContent enrollments={enrollments.data} payments={payments.data} exceptions={exceptions.data} />
        )}
      </QueryState>
    </>
  )
}

function DashboardContent({ enrollments, payments, exceptions }) {
  const active = enrollments.filter((e) => getLessonStatus(e.lessonStart, e.lessonEnd).key === 'ongoing')
  const expectedMonthly = active.reduce((sum, e) => sum + e.monthlyFee, 0)
  const overdue = enrollments.filter((e) => isOutstanding(e.nextDueDate))
  const overdueTotal = overdue.reduce((sum, e) => sum + e.monthlyFee, 0)
  const activeExceptions = exceptions.filter((x) => getExceptionStatus(x).label === 'Active')
  const byDueDate = [...enrollments].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))

  const paymentColumns = [
    { key: 'paidOn', header: 'Date', render: (p) => formatDate(p.paidOn) },
    { key: 'studentName', header: 'Student' },
    { key: 'amount', header: 'Amount', align: 'right', render: (p) => formatCurrency(p.amount) },
    {
      key: 'status',
      header: 'Status',
      render: (p) => <Badge tone={PAYMENT_STATUS[p.status].tone}>{PAYMENT_STATUS[p.status].label}</Badge>,
    },
  ]

  return (
    <div className="stack">
      <div className="stat-grid">
        <StatCard label="Active students" value={active.length} hint={`${enrollments.length} enrolled in total`} icon={Users} />
        <StatCard label="Expected monthly" value={formatCurrency(expectedMonthly)} hint="From ongoing lessons" icon={Wallet} />
        <StatCard
          label="Overdue / due today"
          value={formatCurrency(overdueTotal)}
          hint={pluralize(overdue.length, 'student')}
          icon={AlertTriangle}
          tone={overdue.length ? 'danger' : 'success'}
        />
        <StatCard label="Active exceptions" value={activeExceptions.length} hint="Discounts, waivers, extensions…" icon={BadgePercent} />
      </div>

      <div className="two-col">
        <Card title="Next due" action={<Link to="due-dates" className="link">All due dates</Link>}>
          <DueList
            items={byDueDate.slice(0, 6).map((e) => ({
              id: e.id,
              person: e.student,
              sub: e.student.grade,
              amount: e.monthlyFee,
              dueDate: e.nextDueDate,
            }))}
          />
        </Card>

        <Card title="Recent payments received">
          <DataTable columns={paymentColumns} rows={payments.slice(0, 6)} emptyMessage="No payments yet." />
        </Card>
      </div>
    </div>
  )
}
