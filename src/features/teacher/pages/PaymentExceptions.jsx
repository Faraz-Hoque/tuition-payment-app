import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/DataTable'
import PageHeader from '@/components/ui/PageHeader'
import PersonCell from '@/components/ui/PersonCell'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useTeacherExceptions } from '@/services/queries'
import { formatDateRange, pluralize } from '@/utils/format'
import { EXCEPTION_TYPES, getExceptionStatus } from '@/utils/status'

const columns = [
  {
    key: 'student',
    header: 'Student',
    render: (x) => <PersonCell id={x.student.id} name={x.student.name} sub={x.subject} />,
  },
  {
    key: 'type',
    header: 'Type',
    render: (x) => <Badge tone={EXCEPTION_TYPES[x.type].tone}>{EXCEPTION_TYPES[x.type].label}</Badge>,
  },
  {
    key: 'detail',
    header: 'Details',
    wrap: true,
    render: (x) => (
      <>
        <div>{x.detail}</div>
        {x.note && <div className="muted small">{x.note}</div>}
      </>
    ),
  },
  { key: 'period', header: 'Applies', render: (x) => formatDateRange(x.startDate, x.endDate) },
  {
    key: 'status',
    header: 'Status',
    render: (x) => {
      const s = getExceptionStatus(x)
      return <Badge tone={s.tone}>{s.label}</Badge>
    },
  },
]

export default function PaymentExceptions() {
  const { user } = useAuth()
  const exceptions = useTeacherExceptions(user.id)

  // Future: pass an "Add exception" button (opening a form) as PageHeader's `actions` prop.
  return (
    <>
      <PageHeader
        title="Payment exceptions"
        description="Discounts, scholarships, waivers, extensions and installment plans for your students."
      />
      <QueryState queries={exceptions}>
        {() => (
          <Card title={pluralize(exceptions.data.length, 'exception')}>
            <DataTable columns={columns} rows={exceptions.data} emptyMessage="No exceptions yet." />
          </Card>
        )}
      </QueryState>
    </>
  )
}
