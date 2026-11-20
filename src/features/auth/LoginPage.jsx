import { GraduationCap, School } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { APP_NAME } from '@/config/app'
import { useAuth } from './AuthContext'

const ROLES = [
  { role: 'student', title: 'I’m a student', text: 'See your teachers, fees, due dates and payment history.', icon: GraduationCap },
  { role: 'teacher', title: 'I’m a teacher', text: 'Track students, due dates, lesson periods and payment exceptions.', icon: School },
]

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [pendingRole, setPendingRole] = useState(null)

  if (user) return <Navigate to={`/${user.role}`} replace />

  async function handleLogin(role) {
    setPendingRole(role)
    await login(role)
    navigate(`/${role}`)
  }

  return (
    <main className="login">
      <div className="login__panel">
        <h1 className="login__brand">{APP_NAME}</h1>
        <p className="login__subtitle">Tuition fees, due dates and payments in one place.</p>

        <div className="login__roles">
          {ROLES.map(({ role, title, text, icon: Icon }) => (
            <button
              key={role}
              type="button"
              className="role-option"
              onClick={() => handleLogin(role)}
              disabled={pendingRole !== null}
            >
              <Icon className="role-option__icon" aria-hidden="true" />
              <span className="role-option__title">
                {pendingRole === role ? 'Signing in…' : title}
              </span>
              <span className="role-option__text">{text}</span>
            </button>
          ))}
        </div>

        <p className="login__note">Demo mode: no password needed. You’ll be signed in with sample data.</p>
      </div>
    </main>
  )
}
