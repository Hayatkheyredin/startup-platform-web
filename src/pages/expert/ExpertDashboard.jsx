/**
 * Expert dashboard home - welcome, stats, and list of businesses allowed for investors.
 * Uses same data as investor dashboard: getBusinessesForInvestment() from applicationsData.js.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { getApplications, getBusinessesForInvestment } from '../../lib/applicationsData'

function ExpertDashboard() {
  const applications = getApplications()
  const pending = applications.filter((a) => a.status === 'pending').length
  const approvedInvestment = applications.filter((a) => a.status === 'approved_for_investment').length
  const approvedGrant = applications.filter((a) => a.status === 'approved_for_grant').length
  const businessesForInvestors = getBusinessesForInvestment()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text">Expert dashboard</h1>
        <p className="text-text-muted mt-1">
          Review user applications. Approve for grant or for investment (one only). Businesses approved for investment are visible to investors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-brand-dark/30 p-5">
          <p className="text-sm font-medium text-text-muted">Pending</p>
          <p className="text-2xl font-bold text-text mt-1">{pending}</p>
          <p className="text-xs text-text-muted mt-1">Awaiting your review</p>
        </div>
        <div className="bg-white rounded-xl border border-brand-dark/30 p-5">
          <p className="text-sm font-medium text-text-muted">Approved for investment</p>
          <p className="text-2xl font-bold text-primary mt-1">{approvedInvestment}</p>
          <p className="text-xs text-text-muted mt-1">Visible to investors</p>
        </div>
        <div className="bg-white rounded-xl border border-brand-dark/30 p-5">
          <p className="text-sm font-medium text-text-muted">Approved for grant</p>
          <p className="text-2xl font-bold text-text mt-1">{approvedGrant}</p>
        </div>
      </div>

      <Link
        to="/expert/applications"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
      >
        Review applications
      </Link>

      <div className="bg-white rounded-xl border border-brand-dark/30 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <h2 className="font-semibold text-text">Allowed for investors</h2>
          <p className="text-sm text-text-muted mt-0.5">Same list investors see on their dashboard and business list.</p>
        </div>
        {businessesForInvestors.length === 0 ? (
          <div className="px-4 py-8 text-center text-text-muted text-sm">No businesses approved for investment yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-text">Business</th>
                  <th className="text-left px-4 py-3 font-medium text-text">Industry</th>
                  <th className="text-left px-4 py-3 font-medium text-text">Stage</th>
                  <th className="text-left px-4 py-3 font-medium text-text">Founder</th>
                </tr>
              </thead>
              <tbody>
                {businessesForInvestors.map((b) => (
                  <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-text">{b.name}</td>
                    <td className="px-4 py-3 text-text-muted">{b.industry}</td>
                    <td className="px-4 py-3 text-text-muted">{b.stage}</td>
                    <td className="px-4 py-3 text-text-muted">{b.founderName || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpertDashboard
