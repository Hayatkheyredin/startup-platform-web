/**
 * Granter dashboard placeholder.
 */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../lib/authStorage'

function GranterPlaceholder() {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-text hover:text-primary">MELIKA</Link>
          <button type="button" onClick={handleLogout} className="text-sm font-medium text-primary hover:underline">Log out</button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-text mb-2">Granter dashboard</h1>
          <p className="text-text-muted mb-6">You’re signed up as a Granter. Grant management and tools are coming soon.</p>
          <Link to="/" className="text-primary font-semibold hover:underline">Back to home</Link>
        </div>
      </main>
    </div>
  )
}

export default GranterPlaceholder
