/**
 * App.jsx - Routing: Landing first, then Admin / Investor flows.
 */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import AdminGuard from './components/AdminGuard'

// Landing
import LandingPage from './pages/LandingPage'

// Investor dashboard (no auth guard for now)
import InvestorDashboard from './pages/investor/InvestorDashboard'
import StartupList from './pages/investor/StartupList'
import StartupDetail from './pages/investor/StartupDetail'
import InvestmentManagement from './pages/investor/InvestmentManagement'
import PremiumFeatures from './pages/investor/PremiumFeatures'

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

      {/* Investor: dashboard with sidebar */}
      <Route path="/investor" element={<MainLayout role="investor" />}>
        <Route index element={<InvestorDashboard />} />
        <Route path="startups" element={<StartupList />} />
        <Route path="startups/:id" element={<StartupDetail />} />
        <Route path="investments" element={<InvestmentManagement />} />
        <Route path="premium" element={<PremiumFeatures />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
