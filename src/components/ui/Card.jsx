// Generic white box with an optional header row (title + something on the right, e.g. a link).
export default function Card({ title, action, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <header className="card__header">
          {title && <h2 className="card__title">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
