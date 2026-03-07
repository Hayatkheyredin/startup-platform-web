/**
 * Placeholder for Investor dashboard. Shown when clicking "Investor" on landing until flow is built.
 */
import React from 'react'
import { Link } from 'react-router-dom'

function InvestorPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-text font-semibold hover:text-primary">
            ← MELIKA
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-4xl">
            💰
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">Investor Dashboard</h1>
          <p className="text-text-muted mb-6">
            This section is coming soon. You’ll be able to log in as an investor, browse startups, and manage investments.
          </p>
          <Link to="/" className="inline-block px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

export default InvestorPlaceholder
