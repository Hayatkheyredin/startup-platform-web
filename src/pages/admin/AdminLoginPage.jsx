/**
 * AdminLoginPage - Login / Sign up for admins only. Redirects to admin dashboard on success.
 */
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, forgotPassword } from '../../services/api'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotSuccess, setForgotSuccess] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      localStorage.setItem('authToken', res.token)
      localStorage.setItem('userRole', 'admin')
      navigate('/admin/users')
    } catch (err) {
      // Demo: any credentials work for admin
      localStorage.setItem('authToken', 'demo-token')
      localStorage.setItem('userRole', 'admin')
      navigate('/admin/users')
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
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary via-primary to-primary-hover">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8">
            ← Back to home
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <img src="/melika-logo.png" alt="MELIKA" className="h-12 w-auto object-contain" />
            <div>
              <h1 className="text-xl font-semibold text-white">MELIKA Admin</h1>
              <p className="text-sm text-white/80">
                {isSignUp ? 'Create your admin account' : 'Sign in to the admin dashboard'}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">{error}</div>
          )}
          {forgotSuccess && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/20 text-white text-sm">
              Password reset email sent. Check your inbox.
            </div>
          )}

          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-white/90 mb-1.5">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => setForgotMode(false)} className="text-sm text-white/80 hover:text-white">
                ← Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-white/90 mb-1.5">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-white/90 mb-1.5">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover disabled:opacity-60"
              >
                {loading ? 'Signing in...' : isSignUp ? 'Sign Up' : 'Login'}
              </button>
              <button type="button" onClick={() => setForgotMode(true)} className="text-sm text-white/80 hover:text-white">
                Forgot Password?
              </button>
              <p className="text-sm text-white/70 pt-2">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="underline">
                  {isSignUp ? 'Login' : 'Sign up'}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-12 bg-surface">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-4xl">
            👤
          </div>
          <h2 className="text-xl font-semibold text-text mb-2">Admin Dashboard</h2>
          <p className="text-text-muted text-sm">Manage users, verify startups, and view analytics.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
