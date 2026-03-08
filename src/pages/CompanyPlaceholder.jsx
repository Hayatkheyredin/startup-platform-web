/**
 * Company dashboard placeholder. Full flow TBD.
 */
import React from 'react'
import { Link } from 'react-router-dom'

function CompanyPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-text hover:text-primary">MELIKA</Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-text mb-2">Company dashboard</h1>
          <p className="text-text-muted mb-6">Company flow is coming soon. You’re signed up successfully.</p>
          <Link to="/auth" className="text-primary font-semibold hover:underline">Back to Login</Link>
        </div>
      </main>
    </div>
  )
}

export default CompanyPlaceholder
