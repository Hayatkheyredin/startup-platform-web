/**
 * ExpertGuard - Protects /expert routes. Redirects to /expert/login if not logged in as expert.
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function ExpertGuard({ children }) {
  const location = useLocation()
  const role = localStorage.getItem('userRole')
  const token = localStorage.getItem('authToken')

  if (role !== 'expert' || !token || !token.startsWith('melika-expert-')) {
    return <Navigate to="/expert/login" state={{ from: location }} replace />
  }

  return children
}

export default ExpertGuard
