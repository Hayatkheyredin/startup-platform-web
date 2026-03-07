/**
 * Placeholder page for Investor dashboard. Shown when user clicks "Investor" on landing until flow is built.
 */
import React from 'react'
import { Link } from 'react-router-dom'

function InvestorPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              WSP
            </div>
            <span className="font-semibold text-text">Women Startup Platform</span>
          </Link>
          <nav className="flex gap-2">
            <Link to="/admin/login" className="px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-primary">Admin</Link>
            <Link to="/investor" className="px-3 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10">Investor</Link>
            <Link to="/startup" className="px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-primary">Startup</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-6">💰</div>
          <h1 className="text-2xl font-bold text-text mb-2">Investor Dashboard</h1>
          <p className="text-text-muted mb-6">
            Login and dashboard for investors will be available here. You’ll be able to discover startups, track investments, and more.
          </p>
          <Link to="/" className="text-primary font-semibold hover:underline">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}

export default InvestorPlaceholder
