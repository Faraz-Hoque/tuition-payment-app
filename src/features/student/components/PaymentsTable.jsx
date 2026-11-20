import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import { formatCurrency, formatDate } from '@/utils/format'
import { PAYMENT_STATUS } from '@/utils/status'

// Shared by the dashboard (compact: fewer columns) and the Payment history page.
export default function PaymentsTable({ payments, compact = false }) {
  const columns = [
    { key: 'paidOn', header: 'Date', render: (p) => formatDate(p.paidOn) },
    {
      key: 'teacher',
      header: 'Teacher',
      render: (p) => (
        <>
          <div>{p.teacherName}</div>
          <div className="muted small">{p.subject}</div>
        </>
      ),
    },
    !compact && { key: 'period', header: 'For' },
    !compact && { key: 'method', header: 'Method' },
    { key: 'amount', header: 'Amount', align: 'right', render: (p) => formatCurrency(p.amount) },
    {
      key: 'status',
      header: 'Status',
      render: (p) => <Badge tone={PAYMENT_STATUS[p.status].tone}>{PAYMENT_STATUS[p.status].label}</Badge>,
    },
  ].filter(Boolean) // removes the `false` entries when compact

  return <DataTable columns={columns} rows={payments} emptyMessage="No payments yet." />
}
