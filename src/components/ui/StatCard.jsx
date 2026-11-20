// Headline number for dashboards: "Outstanding now — $220.00".
export default function StatCard({ label, value, hint, icon: Icon, tone = 'neutral' }) {
  return (
    <div className={`stat stat--${tone}`}>
      <div className="stat__top">
        <span className="stat__label">{label}</span>
        {Icon && <Icon className="stat__icon" aria-hidden="true" />}
      </div>
      <div className="stat__value">{value}</div>
      {hint && <div className="stat__hint">{hint}</div>}
    </div>
  )
}
