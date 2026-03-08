/**
 * UserGuard - Protects /user routes. Redirects to /auth if not logged in as user.
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../lib/authStorage'

function UserGuard({ children }) {
  const location = useLocation()
  const user = getCurrentUser()

  if (!user || user.role !== 'user') {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}

export default UserGuard
