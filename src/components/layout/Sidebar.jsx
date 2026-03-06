/**
 * Sidebar - Vertical navigation for dashboard (inspired by inspo design).
 * Dark charcoal background with orange accent for active items.
 */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

function Sidebar({ role = 'investor' }) {
  const location = useLocation()

  const investorItems = [
    { to: '/investor', label: 'Dashboard', icon: '📊' },
    { to: '/investor/startups', label: 'Startup List', icon: '🚀' },
    { to: '/investor/investments', label: 'My Investments', icon: '💰' },
  ]

  const adminItems = [
    { to: '/admin/users', label: 'User Management', icon: '👥' },
    { to: '/admin/startups', label: 'Startup Monitoring', icon: '📋' },
    { to: '/admin/analytics', label: 'Platform Analytics', icon: '📈' },
  ]

  const items = role === 'admin' ? adminItems : investorItems

  return (
    <div
      className="h-100 py-4"
      style={{
        backgroundColor: 'var(--color-charcoal)',
        minHeight: 'calc(100vh - var(--navbar-height))',
      }}
    >
      <Nav className="flex-column px-3">
        {items.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to !== '/investor' && item.to !== '/admin' && location.pathname.startsWith(item.to))
          return (
            <Nav.Link
              key={item.to}
              as={Link}
              to={item.to}
              className={`d-flex align-items-center py-3 px-3 mb-1 rounded text-decoration-none ${
                isActive ? 'text-white' : 'text-white-50'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Nav.Link>
          )
        })}
      </Nav>
    </div>
  )
}

export default Sidebar
