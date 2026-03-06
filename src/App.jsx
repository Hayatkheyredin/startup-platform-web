/**
 * App.jsx - Root component with routing configuration.
 * Handles navigation between Login, Investor Dashboard, and Admin Dashboard.
 */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layout components
import MainLayout from './components/layout/MainLayout'

// Pages
import LoginPage from './pages/LoginPage'

// Investor Dashboard pages
import InvestorDashboard from './pages/investor/InvestorDashboard'
import StartupList from './pages/investor/StartupList'
import StartupDetail from './pages/investor/StartupDetail'
import InvestmentManagement from './pages/investor/InvestmentManagement'

// Admin Dashboard pages
import UserManagement from './pages/admin/UserManagement'
import StartupMonitoring from './pages/admin/StartupMonitoring'
import PlatformAnalytics from './pages/admin/PlatformAnalytics'

function App() {
  return (
    <Routes>
      {/* Login - no layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Investor Dashboard routes - wrapped in MainLayout */}
      <Route path="/investor" element={<MainLayout role="investor" />}>
        <Route index element={<InvestorDashboard />} />
        <Route path="startups" element={<StartupList />} />
        <Route path="startups/:id" element={<StartupDetail />} />
        <Route path="investments" element={<InvestmentManagement />} />
      </Route>

      {/* Admin Dashboard routes - wrapped in MainLayout */}
      <Route path="/admin" element={<MainLayout role="admin" />}>
        <Route index element={<Navigate to="/admin/users" replace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="startups" element={<StartupMonitoring />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
      </Route>

      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
