import { useState } from 'react'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useStudentPayments } from '@/services/queries'
import { formatCurrency, pluralize } from '@/utils/format'
import { PAYMENT_STATUS } from '@/utils/status'
import PaymentsTable from '../components/PaymentsTable'

export default function PaymentHistory() {
  const { user } = useAuth()
  const payments = useStudentPayments(user.id)
  const [status, setStatus] = useState('all')

  return (
    <>
      <PageHeader
        title="Payment history"
        description="Every payment you’ve made, newest first."
        actions={
          <label className="field field--inline">
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All</option>
              {Object.entries(PAYMENT_STATUS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
        }
      />
      <QueryState queries={payments}>
        {() => {
          const rows = status === 'all' ? payments.data : payments.data.filter((p) => p.status === status)
          const totalPaid = rows.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
          return (
            <Card
              title={pluralize(rows.length, 'payment')}
              action={<span className="muted">Total paid: <strong>{formatCurrency(totalPaid)}</strong></span>}
            >
              <PaymentsTable payments={rows} />
            </Card>
          )
        }}
      </QueryState>
    </>
  )
}
