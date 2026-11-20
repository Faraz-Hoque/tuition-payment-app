import { initials } from '@/utils/format'

// Picks a stable colour from the id, so the same person always gets the same colour.
const PALETTE = ['#4f46e5', '#0891b2', '#16a34a', '#c2410c', '#be185d', '#7c3aed', '#0d9488']

function colorFor(id = '') {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return PALETTE[hash % PALETTE.length]
}

export default function Avatar({ id, name, size = 'md' }) {
  return (
    <span className={`avatar avatar--${size}`} style={{ background: colorFor(id) }} aria-hidden="true">
      {initials(name)}
    </span>
  )
}
