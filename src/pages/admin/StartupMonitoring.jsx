/**
 * StartupMonitoring - Admin page to list startups and track status.
 */
import React, { useState, useEffect } from 'react'
import { getStartupsForAdmin } from '../../services/api'

function StartupMonitoring() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartupsForAdmin()
        setStartups(data.startups || data || [])
      } catch (err) {
        setStartups([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const mockStartups = [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', status: 'validated', submittedAt: '2024-01-10' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', status: 'pending', submittedAt: '2024-01-12' },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', status: 'validated', submittedAt: '2024-01-08' },
    { id: '4', name: 'EduLearn', industry: 'Education', status: 'rejected', submittedAt: '2024-01-14' },
  ]

  const displayStartups = startups.length > 0 ? startups : mockStartups
  const filtered = statusFilter
    ? displayStartups.filter((s) => s.status === statusFilter)
    : displayStartups

  const getStatusBadge = (status) => {
    const styles = {
      validated: 'bg-success/20 text-success',
      pending: 'bg-amber-100 text-amber-800',
      rejected: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${styles[status] || 'bg-slate-100 text-text-muted'}`}>
        {status}
      </span>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">Startup Monitoring</h1>
          <p className="text-text-muted text-sm mt-0.5">Track startup status</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">All Status</option>
          <option value="validated">Validated</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Industry</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Submitted</th>
                <th className="text-left px-4 py-3 font-medium">Founder</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((startup) => (
                <tr key={startup.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-text">{startup.name}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.industry}</td>
                  <td className="px-4 py-3">{getStatusBadge(startup.status)}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.submittedAt || 'N/A'}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.founderEmail || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StartupMonitoring
