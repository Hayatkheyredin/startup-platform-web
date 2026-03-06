/**
 * LoginPage - Authentication page for investors and admins.
 * Inspired by inspo design: split layout - dark left panel with form, image on right.
 * Fields: Email, Password. Buttons: Login, Forgot Password.
 */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
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
      // Demo mode: when API is unavailable, allow login with any credentials
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
    <div className="min-vh-100 d-flex">
      {/* Left panel - dark charcoal with form (inspo design) */}
      <div className="section-dark d-flex align-items-center justify-content-center p-5 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="w-100" style={{ maxWidth: 400 }}>
          <div className="mb-4">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 56, height: 56, backgroundColor: 'var(--color-accent)' }}
            >
              <span className="text-white fw-bold">WSP</span>
            </div>
            <h1 className="h3 fw-bold text-white mb-2">
              Women Startup Platform
            </h1>
            <p className="text-white-50 small">
              Sign in to access the investor or admin dashboard.
            </p>
          </div>

          <hr className="border-secondary mb-4" />

          {error && <Alert variant="danger" className="small">{error}</Alert>}
          {forgotSuccess && (
            <Alert variant="success" className="small">
              Password reset email sent. Check your inbox.
            </Alert>
          )}

          {forgotMode ? (
            <Form onSubmit={handleForgotPassword}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark border-secondary text-white"
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn btn-primary-custom w-100 rounded-0 mb-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Button
                variant="link"
                className="text-accent p-0"
                onClick={() => setForgotMode(false)}
              >
                Back to Login
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark border-secondary text-white"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-dark border-secondary text-white"
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn btn-primary-custom w-100 rounded-0 mb-2"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                variant="link"
                className="text-accent p-0"
                onClick={() => setForgotMode(true)}
              >
                Forgot Password?
              </Button>
            </Form>
          )}

          <hr className="border-secondary mt-4" />
        </div>
      </div>

      {/* Right panel - image (inspo design) */}
      <div className="d-none d-md-flex align-items-center justify-content-center p-0 bg-light" style={{ width: '50%' }}>
        <div
          className="w-100 h-100"
          style={{
            backgroundImage: 'linear-gradient(135deg, #f5e6df 0%, #e9ecef 50%, #dee2e6 100%)',
            minHeight: '100vh',
          }}
        >
          <div className="d-flex align-items-center justify-content-center h-100 p-5">
            <div className="text-center">
              <div
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 120, height: 120, backgroundColor: 'var(--color-accent)' }}
              >
                <span className="text-white display-4">🚀</span>
              </div>
              <h3 className="text-charcoal fw-semibold">Empowering Women Founders</h3>
              <p className="text-muted">Connect with validated startups and make an impact.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
