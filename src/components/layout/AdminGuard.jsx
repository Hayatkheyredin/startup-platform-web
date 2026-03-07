/**
 * AdminGuard - Protects admin routes. Redirects to /admin/login if not logged in as admin.
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

function AdminGuard() {
  const token = localStorage.getItem('authToken')
  const role = localStorage.getItem('userRole')
  const location = useLocation()
  const isAdmin = token && role === 'admin'

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <MainLayout role="admin" />
}

export default AdminGuard
