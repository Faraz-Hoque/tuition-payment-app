export default function EmptyState({ message = 'Nothing to show yet.' }) {
  return <p className="empty-state">{message}</p>
}
