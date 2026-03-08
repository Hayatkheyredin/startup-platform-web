/**
 * User Dashboard - Welcome home. Shows overview and next steps.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../lib/authStorage'

function UserDashboard() {
  const user = getCurrentUser()
  const name = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const needTeam = user?.needTeam
  const hasProfile = user?.profile && (user.profile.businessName || user.profile.startupName || user.profile.description)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text">
          Welcome, {name}
        </h1>
        <p className="text-text-muted mt-1">
          Manage your business profile and track your application status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/user/profile"
          className="p-6 rounded-2xl bg-white border border-brand-dark/30 shadow-card hover:shadow-card-hover transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-text">Profile</h2>
            <p className="text-sm text-text-muted mt-0.5">
              {hasProfile ? 'Update your business name, description, and details.' : 'Fill in your business name, description, and everything we need.'}
            </p>
          </div>
        </Link>

        <Link
          to="/user/status"
          className="p-6 rounded-2xl bg-white border border-brand-dark/30 shadow-card hover:shadow-card-hover transition-all flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-text">Status</h2>
            <p className="text-sm text-text-muted mt-0.5">
              See where your application stands: Pending, Approved, or Rejected.
            </p>
          </div>
        </Link>
      </div>

      {needTeam && (
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-text">You requested a team</h3>
          <p className="text-sm text-text-muted mt-1">
            We’ll match you with others based on your business interests and experience. Once you’re in a team, you can use Live Chat to talk with your teammates. This feature is coming soon.
          </p>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
