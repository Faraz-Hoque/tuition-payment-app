import { AlertTriangle, CalendarClock, TrendingUp, Wallet } from 'lucide-react'
import { Link } from 'react-router'
import Card from '@/components/ui/Card'
import DueList from '@/components/ui/DueList'
import PageHeader from '@/components/ui/PageHeader'
import QueryState from '@/components/ui/QueryState'
import StatCard from '@/components/ui/StatCard'
import { useAuth } from '@/features/auth/AuthContext'
import { useStudentEnrollments, useStudentPayments } from '@/services/queries'
import { today } from '@/utils/date'
import { formatCurrency, formatDate, pluralize } from '@/utils/format'
import { isOutstanding } from '@/utils/status'
import PaymentsTable from '../components/PaymentsTable'

export default function StudentDashboard() {
  const { user } = useAuth()
  const enrollments = useStudentEnrollments(user.id)
  const payments = useStudentPayments(user.id)

  return (
    <>
      <PageHeader title={`Hi, ${user.name.split(' ')[0]}`} description="Here’s an overview of your tuition fees." />
      <QueryState queries={[enrollments, payments]}>
        {() => <DashboardContent enrollments={enrollments.data} payments={payments.data} />}
      </QueryState>
    </>
  )
}

function DashboardContent({ enrollments, payments }) {
  // Derived numbers, calculated from the data on every render (cheap at this size).
  const monthlyTotal = enrollments.reduce((sum, e) => sum + e.monthlyFee, 0)
  const outstanding = enrollments.filter((e) => isOutstanding(e.nextDueDate))
  const outstandingTotal = outstanding.reduce((sum, e) => sum + e.monthlyFee, 0)
  const byDueDate = [...enrollments].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
  const nextUp = byDueDate.find((e) => !isOutstanding(e.nextDueDate))
  const year = String(today().getFullYear())
  const paidThisYear = payments
    .filter((p) => p.status === 'paid' && p.paidOn.startsWith(year))
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="stack">
      <div className="stat-grid">
        <StatCard label="Monthly total" value={formatCurrency(monthlyTotal)} hint={pluralize(enrollments.length, 'teacher')} icon={Wallet} />
        <StatCard
          label="Outstanding now"
          value={formatCurrency(outstandingTotal)}
          hint={outstanding.length ? `${pluralize(outstanding.length, 'payment')} overdue or due today` : 'All caught up'}
          icon={AlertTriangle}
          tone={outstanding.length ? 'danger' : 'success'}
        />
        <StatCard
          label="Next payment"
          value={nextUp ? formatCurrency(nextUp.monthlyFee) : '—'}
          hint={nextUp ? `${nextUp.teacher.name} · ${formatDate(nextUp.nextDueDate)}` : 'Nothing scheduled'}
          icon={CalendarClock}
        />
        <StatCard label={`Paid in ${year}`} value={formatCurrency(paidThisYear)} icon={TrendingUp} />
      </div>

      <div className="two-col">
        <Card title="Upcoming payments" action={<Link to="teachers" className="link">All teachers</Link>}>
          <DueList
            items={byDueDate.map((e) => ({
              id: e.id,
              person: e.teacher,
              sub: e.subject,
              amount: e.monthlyFee,
              dueDate: e.nextDueDate,
            }))}
          />
        </Card>

        <Card title="Recent payments" action={<Link to="payments" className="link">View all</Link>}>
          <PaymentsTable payments={payments.slice(0, 5)} compact />
        </Card>
      </div>
    </div>
  )
}
