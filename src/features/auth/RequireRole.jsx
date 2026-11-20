import { Navigate } from 'react-router'
import { useAuth } from './AuthContext'

// Route guard: renders its children only for a logged-in user with the right role.
// NOTE: this only protects the UI. Real security must be enforced by the server,
// which should refuse to send a student's data to anyone else.
export default function RequireRole({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />
  return children
}
