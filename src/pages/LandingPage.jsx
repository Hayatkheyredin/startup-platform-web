/**
 * LandingPage - First screen when opening the app. Project overview and nav to dashboards.
 */
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Navbar: Logo + name (large) | Admin, Investor */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-card">
                WSP
              </div>
              <span className="text-xl md:text-2xl font-bold text-text">
                Women Startup Platform
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                to="/admin/login"
                className="text-sm font-semibold text-text hover:text-primary transition-colors"
              >
                Admin
              </Link>
              <Link
                to="/investor"
                className="text-sm font-semibold text-text hover:text-primary transition-colors"
              >
                Investor
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero / Overview */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
              Empowering Women-Led Startups
            </h1>
            <p className="text-lg text-text-muted mb-8">
              A platform connecting women founders with investors. Validate your idea,
              get funded, and grow. For admins and investors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/admin/login"
                className="px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/investor"
                className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-text hover:bg-slate-200 transition-colors"
              >
                Investor
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text text-center mb-10">What we offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                  👤
                </div>
                <h3 className="font-semibold text-text mb-2">Admin</h3>
                <p className="text-sm text-text-muted">
                  Manage users, verify startups, and view platform analytics.
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-slate-50">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                  💰
                </div>
                <h3 className="font-semibold text-text mb-2">Investor</h3>
                <p className="text-sm text-text-muted">
                  Discover validated startups, track investments, and support founders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-text-muted">
        Women Startup Platform — Hackathon MVP
      </footer>
    </div>
  )
}

export default LandingPage
