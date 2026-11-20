// Small coloured label. `tone` comes from utils/status.js.
// tone: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export default function Badge({ tone = 'neutral', children }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}
