/**
 * App.jsx - Routing: Landing first, then Admin / Investor flows.
 */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import AdminGuard from './components/AdminGuard'

// Landing & placeholders
import LandingPage from './pages/LandingPage'
import InvestorPlaceholder from './pages/investor/InvestorPlaceholder'

// Admin
import AdminLoginPage from './pages/admin/AdminLoginPage'
import UserManagement from './pages/admin/UserManagement'
import StartupMonitoring from './pages/admin/StartupMonitoring'
import PlatformAnalytics from './pages/admin/PlatformAnalytics'

function App() {
  return (
    <Routes>
      {/* Landing - first screen */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin: login then protected dashboard */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <MainLayout role="admin" />
          </AdminGuard>
        }
      >
        <Route index element={<Navigate to="/admin/users" replace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="startups" element={<StartupMonitoring />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
      </Route>

      {/* Investor: placeholder until you approve and we build the flow */}
      <Route path="/investor" element={<InvestorPlaceholder />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
