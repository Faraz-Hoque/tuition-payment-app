import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { authApi } from '@/services/api'
import { AuthContext } from './AuthContext'

const STORAGE_KEY = 'tuitionpay.user'

// localStorage can throw (private mode, blocked storage), so always guard it.
function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
  } catch {
    return null
  }
}

function saveUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

// DEMO AUTH: keeps the logged-in user in memory + localStorage.
// When you add real auth, `login` will send credentials to your server and the
// server will set a secure, httpOnly session cookie (don't store tokens in localStorage).
export default function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(loadUser)

  const login = useCallback(async (role) => {
    const loggedIn = await authApi.loginAs(role)
    saveUser(loggedIn)
    setUser(loggedIn)
    return loggedIn
  }, [])

  const logout = useCallback(() => {
    saveUser(null)
    setUser(null)
    queryClient.clear() // drop cached data so the next user never sees it
  }, [queryClient])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
