/**
 * Navbar - Top navigation bar (inspired by inspo design).
 * White background, logo, nav links, primary orange CTA button.
 */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar as BSNavbar, Nav, Button, Container } from 'react-bootstrap'

function Navbar({ role = 'investor' }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Placeholder - clear auth and redirect to login
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  const investorLinks = [
    { to: '/investor', label: 'HOME' },
    { to: '/investor/startups', label: 'STARTUPS' },
    { to: '/investor/investments', label: 'MY INVESTMENTS' },
  ]

  const adminLinks = [
    { to: '/admin/users', label: 'USERS' },
    { to: '/admin/startups', label: 'STARTUPS' },
    { to: '/admin/analytics', label: 'ANALYTICS' },
  ]

  const links = role === 'admin' ? adminLinks : investorLinks

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm border-bottom">
      <Container fluid>
        <BSNavbar.Brand as={Link} to={role === 'admin' ? '/admin' : '/investor'} className="d-flex align-items-center">
          <div
            className="rounded-circle bg-charcoal d-flex align-items-center justify-content-center me-2"
            style={{ width: 40, height: 40, backgroundColor: 'var(--color-charcoal)' }}
          >
            <span className="text-white fw-bold" style={{ fontSize: '1rem' }}>WSP</span>
          </div>
          <span className="fw-semibold text-dark d-none d-sm-inline">Women Startup Platform</span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-navbar" />
        <BSNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {links.map((link) => (
              <Nav.Link
                key={link.to}
                as={Link}
                to={link.to}
                className="text-uppercase fw-medium px-3"
                style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)' }}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <Button
className="btn btn-primary-custom rounded-0 px-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default Navbar
