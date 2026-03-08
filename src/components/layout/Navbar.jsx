/**
 * Navbar - Top navigation. MELIKA theme (vibrant pink #E85B84, plum #6C3D5A).
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout as clearUser } from '../../lib/authStorage'

const LOGO_URL = '/melika-logo.png'

function Navbar({ role = 'investor' }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    clearUser()
    navigate('/')
  }

  const investorLinks = [
    { to: '/investor', label: 'Home' },
    { to: '/investor/businesses', label: 'Businesses' },
    { to: '/investor/investments', label: 'My Investments' },
  ]

  const adminLinks = [
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/businesses', label: 'Businesses' },
    { to: '/admin/analytics', label: 'Analytics' },
  ]

  const userLinksBase = [
    { to: '/user', label: 'Dashboard' },
    { to: '/user/profile', label: 'Profile' },
    { to: '/user/status', label: 'Status' },
    { to: '/user/team', label: 'Team' },
    { to: '/user/chat', label: 'Live Chat' },
  ]
  const userLinks = userLinksBase

  const links =
    role === 'admin' ? adminLinks
    : role === 'user' ? userLinks
    : investorLinks
  const homePath = role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/investor'

  return (
    <header className="bg-white border-b border-brand-dark/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to={homePath} className="flex items-center gap-3 shrink-0 group">
            <img src={LOGO_URL} alt="MELIKA" className="h-14 md:h-16 w-auto object-contain group-hover:opacity-90 transition-opacity" />
            <span className="font-semibold text-text hidden sm:inline">MELIKA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-primary hover:bg-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
            >
              Logout
            </button>
            <button
              type="button"
              className="md:hidden p-2 rounded-btn text-text hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-brand-dark/20">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-text hover:bg-brand transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
