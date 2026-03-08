/**
 * User Status - Application status: Pending, Approved, or Rejected.
 */
import React from 'react'
import { getCurrentUser } from '../../lib/authStorage'

const statusConfig = {
  pending: {
    label: 'Pending',
    description: 'Your application is under review. We’ll update you once it’s processed.',
    icon: '⏳',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-800',
  },
  approved: {
    label: 'Approved',
    description: 'Your application has been approved. You can proceed to the next steps.',
    icon: '✓',
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
  },
  rejected: {
    label: 'Rejected',
    description: 'Unfortunately your application was not approved at this time. You can update your profile and reapply later.',
    icon: '✕',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
  },
}

function UserStatus() {
  const user = getCurrentUser()
  const status = (user?.status || 'pending').toLowerCase()
  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">Your status</h1>
      <p className="text-text-muted mb-6">
        Experts review your application. You will receive either a grant opportunity or an investment opportunity (one only). Businesses selected for investment are shared with investors.
      </p>

      <div className={`p-6 rounded-2xl border ${config.bg}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" aria-hidden>{config.icon}</span>
          <h2 className={`text-xl font-semibold ${config.text}`}>{config.label}</h2>
        </div>
        <p className="text-text-muted text-sm">{config.description}</p>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        Status is saved and visible in your sidebar. Pending = under expert review; Approved = selected for grant or investment; Rejected = not selected this round.
      </p>
    </div>
  )
}

export default UserStatus
