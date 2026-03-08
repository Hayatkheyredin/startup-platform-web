/**
 * Placeholder page for Investor dashboard.
 */
import React from 'react'
import { Link } from 'react-router-dom'

const LOGO_URL = '/melika-logo.png'

function InvestorPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-brand-dark/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="MELIKA" className="h-14 w-auto object-contain" />
            <span className="font-semibold text-text">MELIKA</span>
          </Link>
          <nav className="flex gap-2">
            <Link to="/admin/login" className="px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-primary">Admin</Link>
            <Link to="/investor" className="px-3 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10">Investor</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-6">💰</div>
          <h1 className="text-2xl font-bold text-text mb-2">Investor Dashboard</h1>
          <p className="text-text-muted mb-6">
            Login and dashboard for investors will be available here. You’ll be able to discover businesses, track investments, and more.
          </p>
          <Link to="/" className="text-primary font-semibold hover:underline">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}

export default InvestorPlaceholder
