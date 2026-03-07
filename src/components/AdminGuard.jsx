/**
 * AdminGuard - Protects admin routes. Redirects to /admin/login if not logged in as admin.
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function AdminGuard({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('authToken')
  const role = localStorage.getItem('userRole')

  if (!token || role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}

export default AdminGuard
