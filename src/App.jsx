/**
 * App.jsx - Routing: Landing first, then Auth, Admin, User, Investor flows.
 */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import AdminGuard from './components/AdminGuard'
import UserGuard from './components/UserGuard'

// Landing
import LandingPage from './pages/LandingPage'

// Auth (Login | Sign Up - Company or User)
import AuthPage from './pages/AuthPage'

// User dashboard (founder: profile, status)
import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import UserStatus from './pages/user/UserStatus'
import UserTeam from './pages/user/UserTeam'
import UserChat from './pages/user/UserChat'

// Investor dashboard (no auth guard for now)
import InvestorDashboard from './pages/investor/InvestorDashboard'
import StartupList from './pages/investor/StartupList'
import StartupDetail from './pages/investor/StartupDetail'
import InvestmentManagement from './pages/investor/InvestmentManagement'
import PremiumFeatures from './pages/investor/PremiumFeatures'

// Company / Granter placeholders
import CompanyPlaceholder from './pages/CompanyPlaceholder'
import GranterPlaceholder from './pages/GranterPlaceholder'

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

      {/* Auth: Login | Sign Up (Company or User) */}
      <Route path="/auth" element={<AuthPage />} />

      {/* User: dashboard with Profile, Status */}
      <Route
        path="/user"
        element={
          <UserGuard>
            <MainLayout role="user" />
          </UserGuard>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="status" element={<UserStatus />} />
        <Route path="team" element={<UserTeam />} />
        <Route path="chat" element={<UserChat />} />
      </Route>

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
        <Route path="businesses" element={<StartupMonitoring />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
      </Route>

      {/* Investor: dashboard with sidebar */}
      <Route path="/investor" element={<MainLayout role="investor" />}>
        <Route index element={<InvestorDashboard />} />
        <Route path="businesses" element={<StartupList />} />
        <Route path="businesses/:id" element={<StartupDetail />} />
        <Route path="investments" element={<InvestmentManagement />} />
        <Route path="premium" element={<PremiumFeatures />} />
      </Route>

      <Route path="/company" element={<CompanyPlaceholder />} />
      <Route path="/granter" element={<GranterPlaceholder />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
