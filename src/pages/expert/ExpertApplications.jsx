/**
 * Expert Applications - Review user applications; approve for grant, approve for investment, or reject.
 * Same data as investor list (approved_for_investment → shown to investors).
 */
import React, { useState, useMemo } from 'react'
import { getApplications, updateApplicationStatus } from '../../lib/applicationsData'

const STATUS_LABELS = {
  pending: 'Pending',
  approved_for_grant: 'Approved (Grant)',
  approved_for_investment: 'Approved (Investment)',
  rejected: 'Rejected',
}

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800',
  approved_for_grant: 'bg-green-100 text-green-800',
  approved_for_investment: 'bg-primary/20 text-primary',
  rejected: 'bg-red-100 text-red-700',
}

function ExpertApplications() {
  const [applications, setApplications] = useState(() => getApplications())
  const [filter, setFilter] = useState('') // '' | pending | approved_for_grant | approved_for_investment | rejected
  const [updating, setUpdating] = useState(null)

  const refresh = () => setApplications(getApplications())
  const filtered = useMemo(() => {
    const list = getApplications()
    if (!filter) return list
    return list.filter((a) => a.status === filter)
  }, [filter, applications])

  const handleStatus = (email, status) => {
    setUpdating(email)
    updateApplicationStatus(email, status)
    refresh()
    setUpdating(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">Applications</h1>
          <p className="text-text-muted text-sm mt-0.5">Review and judge user applications. Approve for grant, approve for investment, or reject. Same data is used for investors.</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved_for_grant">Approved (Grant)</option>
          <option value="approved_for_investment">Approved (Investment)</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-brand-dark/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Applicant</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Business name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">National ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Industry</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Stage</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => {
                const p = app.profile || {}
                const status = app.status || 'pending'
                const isUpdating = updating === app.email
                const hasNationalId = !!(p.nationalId && String(p.nationalId).trim())
                return (
                  <tr key={app.email} className="border-t border-slate-100 hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-text">{app.fullName}</p>
                      <p className="text-xs text-text-muted">{app.email}</p>
                    </td>
                    <td className="px-4 py-3 text-text">{p.businessName || p.startupName || '—'}</td>
                    <td className="px-4 py-3 text-text-muted">{hasNationalId ? 'Provided' : '—'}</td>
                    <td className="px-4 py-3 text-text-muted">{p.industry || '—'}</td>
                    <td className="px-4 py-3 text-text-muted">{p.stage || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${STATUS_STYLES[status] || 'bg-slate-100 text-text-muted'}`}>
                        {STATUS_LABELS[status] || status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {status === 'pending' && (
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => handleStatus(app.email, 'approved_for_grant')}
                            disabled={isUpdating}
                            className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50"
                          >
                            Grant
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatus(app.email, 'approved_for_investment')}
                            disabled={isUpdating}
                            className="px-2 py-1 rounded-lg text-xs font-medium bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-50"
                          >
                            Investment
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatus(app.email, 'rejected')}
                            disabled={isUpdating}
                            className="px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-text-muted text-sm">No applications match the filter.</div>
        )}
      </div>
    </div>
  )
}

export default ExpertApplications
