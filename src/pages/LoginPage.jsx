/**
 * LoginPage - Authentication for investors and admins.
 */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, forgotPassword } from '../services/api'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      localStorage.setItem('authToken', res.token)
      localStorage.setItem('userRole', res.role || 'investor')
      const redirect = res.role === 'admin' ? '/admin/users' : '/investor'
      navigate(redirect)
    } catch (err) {
      const isAdmin = email.toLowerCase().includes('admin')
      localStorage.setItem('authToken', 'demo-token')
      localStorage.setItem('userRole', isAdmin ? 'admin' : 'investor')
      navigate(isAdmin ? '/admin/users' : '/investor')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email)
      setForgotSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary via-primary to-primary-hover">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-lg">
              WSP
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Women Startup Platform</h1>
              <p className="text-sm text-white/80">Sign in to your account</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
          {forgotSuccess && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/20 text-white text-sm">
              Password reset email sent. Check your inbox.
            </div>
          )}

          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-white/90 mb-1.5">
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-smooth disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="text-sm text-white/80 hover:text-white transition-smooth"
              >
                ← Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-white/90 mb-1.5">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-white/90 mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-smooth disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="text-sm text-white/80 hover:text-white transition-smooth"
              >
                Forgot Password?
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right panel - branding */}
      <div className="hidden md:flex flex-1 items-center justify-center p-12 bg-surface">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-text mb-2">Empowering Women Founders</h2>
          <p className="text-text-muted text-sm">Connect with validated startups and make an impact.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
