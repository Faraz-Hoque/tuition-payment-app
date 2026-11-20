import { LogOut, Menu } from 'lucide-react'
import { useNavigate } from 'react-router'
import Avatar from '@/components/ui/Avatar'
import { useAuth } from '@/features/auth/AuthContext'

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="topbar">
      <button type="button" className="icon-btn topbar__menu" onClick={onMenuClick} aria-label="Open navigation">
        <Menu aria-hidden="true" />
      </button>

      <div className="topbar__spacer" />

      <div className="topbar__user">
        <Avatar id={user.id} name={user.name} size="sm" />
        <div className="topbar__user-text">
          <span className="topbar__name">{user.name}</span>
          <span className="topbar__role">{user.role}</span>
        </div>
        <button type="button" className="icon-btn" onClick={handleLogout} aria-label="Sign out" title="Sign out">
          <LogOut aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
