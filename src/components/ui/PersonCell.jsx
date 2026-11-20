import Avatar from './Avatar'

// Avatar + name + small grey line underneath. Used in tables and lists.
export default function PersonCell({ id, name, sub }) {
  return (
    <span className="person">
      <Avatar id={id} name={name} size="sm" />
      <span>
        <span className="person__name">{name}</span>
        {sub && <span className="person__sub">{sub}</span>}
      </span>
    </span>
  )
}
