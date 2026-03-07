/**
 * MainLayout - Wrapper for Investor and Admin dashboards.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function MainLayout({ role = 'investor' }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand">
      <Navbar role={role} />
      <div className="flex flex-1">
        <Sidebar role={role} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto bg-brand">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
