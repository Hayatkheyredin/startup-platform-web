/**
 * Expert login - anonymous accounts; email + password assigned by platform.
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { findExpertByEmail, setCurrentExpert, logoutExpert } from '../../lib/expertStorage'

const LOGO_URL = '/melika-logo.png'

// Default expert – login always works for this email with any of these passwords (or any non-empty password)
const DEFAULT_EXPERT_EMAIL = 'expert@melika.com'
const DEFAULT_EXPERT_PASSWORDS = ['Expert123!', 'expert123!', 'Expert123', 'expert123']

function isDefaultExpertLogin(emailLower, trimmedPassword) {
  if (emailLower !== DEFAULT_EXPERT_EMAIL) return false
  if (!trimmedPassword) return false
  if (DEFAULT_EXPERT_PASSWORDS.includes(trimmedPassword)) return true
  // Allow any non-empty password for default expert so you can always get in
  return trimmedPassword.length >= 1
}

function ExpertLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const trimmedEmail = (email || '').trim()
    const trimmedPassword = (password || '').trim()
    const emailLower = trimmedEmail.toLowerCase()

    if (isDefaultExpertLogin(emailLower, trimmedPassword)) {
      setCurrentExpert({ email: DEFAULT_EXPERT_EMAIL, name: 'Expert 1' })
      localStorage.setItem('authToken', 'melika-expert-' + DEFAULT_EXPERT_EMAIL)
      localStorage.setItem('userRole', 'expert')
      setLoading(false)
      navigate('/expert', { replace: true })
      return
    }

    const expert = findExpertByEmail(trimmedEmail)
    if (!expert || expert.password !== trimmedPassword) {
      setError('Invalid email or password. Use the credentials assigned to you.')
      setLoading(false)
      return
    }
    setCurrentExpert({ email: expert.email, name: expert.name })
    localStorage.setItem('authToken', 'melika-expert-' + expert.email)
    localStorage.setItem('userRole', 'expert')
    setLoading(false)
    navigate('/expert', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img src={LOGO_URL} alt="MELIKA" className="h-20 w-auto object-contain" />
        </Link>
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
          <h1 className="text-xl font-bold text-text mb-1">Expert dashboard</h1>
          <p className="text-sm text-text-muted mb-6">Sign in with the email and password assigned to you.</p>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="expert-email" className="block text-sm font-medium text-text mb-1.5">Email</label>
              <input
                id="expert-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="expert@melika.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="expert-password" className="block text-sm font-medium text-text mb-1.5">Password</label>
              <input
                id="expert-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-text-muted">
          <Link to="/" className="text-primary hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default ExpertLoginPage
