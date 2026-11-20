import EmptyState from './EmptyState'

// Reusable table. Describe columns once, pass rows, done.
//
//   columns = [
//     { key: 'name', header: 'Student' },                                 // shows row.name
//     { key: 'fee', header: 'Fee', align: 'right', render: (row) => formatCurrency(row.fee) },
//     { key: 'note', header: 'Note', wrap: true },                        // long text may wrap
//   ]
//
// On small screens the table scrolls sideways inside its wrapper instead of breaking the page.
function cellClass(col) {
  return [col.align === 'right' && 'is-right', col.wrap && 'is-wrap'].filter(Boolean).join(' ') || undefined
}

export default function DataTable({ columns, rows, getRowKey = (row) => row.id, emptyMessage }) {
  if (rows.length === 0) return <EmptyState message={emptyMessage} />

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.align === 'right' ? 'is-right' : undefined} scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((col) => (
                <td key={col.key} className={cellClass(col)}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
