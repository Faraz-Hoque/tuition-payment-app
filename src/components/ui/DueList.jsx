import { formatCurrency, formatDate } from '@/utils/format'
import { getDueStatus } from '@/utils/status'
import Badge from './Badge'
import EmptyState from './EmptyState'
import PersonCell from './PersonCell'

// A compact list of upcoming/overdue payments. Shared by student + teacher dashboards.
// items: [{ id, person: { id, name }, sub, amount, dueDate }]
export default function DueList({ items, emptyMessage = 'No payments due.' }) {
  if (items.length === 0) return <EmptyState message={emptyMessage} />

  return (
    <ul className="due-list">
      {items.map((item) => {
        const status = getDueStatus(item.dueDate)
        return (
          <li key={item.id} className="due-list__item">
            <PersonCell id={item.person.id} name={item.person.name} sub={item.sub} />
            <div className="due-list__right">
              <span className="due-list__amount">{formatCurrency(item.amount)}</span>
              <span className="due-list__date">{formatDate(item.dueDate)}</span>
              <Badge tone={status.tone}>{status.label}</Badge>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
