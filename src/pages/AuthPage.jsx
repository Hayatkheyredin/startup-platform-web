/**
 * AuthPage - Login | Sign Up. Design matches reference: white background, centered, logo only, User | Investor roles.
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  saveUser,
  findUserByEmail,
  setCurrentUser,
  logout,
} from '../lib/authStorage'

const LOGO_URL = '/melika-logo.png'

const PASSWORD_HINT = 'Must be at least 8 characters with uppercase, lowercase, and number'
const passwordValid = (p) =>
  p && p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p)

function AuthPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('signup')
  const [role, setRole] = useState(null) // 'user' | 'investor'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmWomen, setConfirmWomen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // User-only
  const [needTeam, setNeedTeam] = useState(null) // true | false
  const [studentOrWorker, setStudentOrWorker] = useState(null) // 'student' | 'worker'
  const [fieldOrWork, setFieldOrWork] = useState('') // what field or what work
  // Investor-only
  const [investorType, setInvestorType] = useState(null) // 'company' | 'personal'

  const handleSignUp = (e) => {
    e.preventDefault()
    setError('')

    if (!role) {
      setError('Please select your role (User or Investor).')
      return
    }
    if (!fullName.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!passwordValid(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a number.')
      return
    }
    if (!confirmWomen) {
      setError('Please confirm that you identify as a woman to register.')
      return
    }
    if (role === 'user') {
      if (needTeam === null) {
        setError('Please select whether you need a team.')
        return
      }
      if (!studentOrWorker) {
        setError('Please select if you are a student or worker.')
        return
      }
      if (!fieldOrWork.trim()) {
        setError('Please enter your field or type of work.')
        return
      }
    }
    if (role === 'investor') {
      if (!investorType) {
        setError('Please select if you are investing as a company or personal.')
        return
      }
    }

    setLoading(true)
    try {
      const existing = findUserByEmail(email)
      if (existing) {
        setError('An account with this email already exists. Please log in.')
        setLoading(false)
        return
      }
      const user = saveUser({
        email: email.trim().toLowerCase(),
        fullName: fullName.trim(),
        password,
        role,
        status: 'pending',
        profile: {},
        ...(role === 'user'
          ? { needTeam, studentOrWorker, fieldOrWork: fieldOrWork.trim() }
          : {}),
        ...(role === 'investor' ? { investorType } : {}),
      })
      if (!user) {
        setError('Could not create account. Please try again.')
        setLoading(false)
        return
      }
      setCurrentUser(user)
      localStorage.setItem('authToken', 'melika-' + user.email)
      localStorage.setItem('userRole', user.role)
      setLoading(false)
      if (user.role === 'investor') navigate('/investor', { replace: true })
      else navigate('/user', { replace: true })
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.')
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const user = findUserByEmail(email)
      if (!user || user.password !== password) {
        setError('Invalid email or password.')
        setLoading(false)
        return
      }
      setCurrentUser(user)
      localStorage.setItem('authToken', 'melika-' + user.email)
      localStorage.setItem('userRole', user.role)
      setLoading(false)
      if (user.role === 'user') navigate('/user', { replace: true })
      else if (user.role === 'company') navigate('/company', { replace: true })
      else if (user.role === 'granter') navigate('/granter', { replace: true })
      else navigate('/investor', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
      setLoading(false)
    }
  }

  const inputBase = 'w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-100/80 border-slate-200 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-colors'
  const inputWrapper = 'relative'

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo only - bigger */}
        <Link to="/" className="mb-8 flex justify-center">
          <img src={LOGO_URL} alt="MELIKA" className="h-24 md:h-28 w-auto object-contain" />
        </Link>

        {/* Tabs: Login | Sign Up */}
        <div className="flex border-b border-slate-200 w-full max-w-md mb-8">
          <button
            type="button"
            onClick={() => { setTab('login'); setError('') }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setError('') }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === 'signup'
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 w-full max-w-md p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-text mb-1.5">
                Email Address
              </label>
              <div className={inputWrapper}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={inputBase}
                />
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-text mb-1.5">
                Password
              </label>
              <div className={inputWrapper}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className={inputBase + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-60 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="w-full max-w-md space-y-5">
            <p className="text-sm font-semibold text-text mb-3">Select Your Role</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setRole('user'); setInvestorType(null) }}
                className={`relative p-5 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                  role === 'user'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20 text-primary">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="font-semibold text-text">User</span>
                {role === 'user' && (
                  <span className="absolute top-2 right-2 text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setRole('investor'); setNeedTeam(null); setStudentOrWorker(null); setFieldOrWork('') }}
                className={`relative p-5 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                  role === 'investor'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20 text-primary">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-text">Investor</span>
                {role === 'investor' && (
                  <span className="absolute top-2 right-2 text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-text mb-1.5">
                Full Name
              </label>
              <div className={inputWrapper}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-text mb-1.5">
                Email Address
              </label>
              <div className={inputWrapper}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={`${inputBase} ${email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-primary ring-1 ring-primary/20' : ''}`}
                />
                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-text mb-1.5">
                Password
              </label>
              <div className={inputWrapper}>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={inputBase + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">{PASSWORD_HINT}</p>
            </div>

            {role === 'user' && (
              <>
                <div>
                  <p className="text-sm font-medium text-text mb-2">Do you need a team?</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setNeedTeam(true)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        needTeam === true ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedTeam(false)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        needTeam === false ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-text mb-2">Are you a student or worker?</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStudentOrWorker('student')}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        studentOrWorker === 'student' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentOrWorker('worker')}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        studentOrWorker === 'worker' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      Worker
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="fieldOrWork" className="block text-sm font-medium text-text mb-1.5">
                    What field or what work?
                  </label>
                  <input
                    id="fieldOrWork"
                    type="text"
                    placeholder="e.g. Technology, Healthcare, Marketing"
                    value={fieldOrWork}
                    onChange={(e) => setFieldOrWork(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100/80 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </>
            )}

            {role === 'investor' && (
              <div>
                <p className="text-sm font-medium text-text mb-2">Are you investing as a company or personal?</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setInvestorType('company')}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      investorType === 'company' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    Company
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvestorType('personal')}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      investorType === 'personal' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    Personal
                  </button>
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmWomen}
                onChange={(e) => setConfirmWomen(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text">
                I confirm that I identify as a woman. (MELIKA registration is for women only.)
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-slate-500">
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError('') }}
            className="font-semibold text-primary hover:underline"
          >
            {tab === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
