// Wraps one or more TanStack Query results and shows a loader or an error box
// until ALL of them have data. Then it renders `children()`.
//
//   <QueryState queries={[enrollments, payments]}>
//     {() => <Dashboard enrollments={enrollments.data} payments={payments.data} />}
//   </QueryState>
export default function QueryState({ queries, children }) {
  const list = Array.isArray(queries) ? queries : [queries]

  const failed = list.find((q) => q.isError)
  if (failed) {
    return (
      <div className="query-error" role="alert">
        <p>Something went wrong: {failed.error?.message ?? 'Unknown error'}</p>
        <button type="button" className="btn btn--secondary" onClick={() => list.forEach((q) => q.refetch())}>
          Try again
        </button>
      </div>
    )
  }

  if (list.some((q) => q.isPending)) {
    return (
      <div className="query-loading" aria-busy="true">
        <span className="spinner" />
        Loading…
      </div>
    )
  }

  return children()
}
