export default function ProgressBar({ value, label }) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="progress__fill" style={{ width: `${value}%` }} />
    </div>
  )
}
