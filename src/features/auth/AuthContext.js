import { createContext, useContext } from 'react'

// React Context lets any component read "who is logged in" without passing
// props through every level. The provider lives in AuthProvider.jsx.
export const AuthContext = createContext(null)

/** const { user, login, logout } = useAuth() */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
