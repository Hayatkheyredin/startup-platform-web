/**
 * StartupMonitoring - Admin page to list startups, verify/reject, and add new startups.
 */
import React, { useState, useEffect } from 'react'
import { getStartupsForAdmin } from '../../services/api'
import Modal from '../../components/ui/Modal'

function StartupMonitoring() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStartup, setNewStartup] = useState({
    name: '',
    industry: 'Technology',
    stage: 'Seed',
    founderEmail: '',
  })

  const mockStartups = [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', status: 'validated', submittedAt: '2024-01-10', founderEmail: 'jane@techflow.com' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', status: 'pending', submittedAt: '2024-01-12', founderEmail: 'sarah@greeneats.com' },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', status: 'validated', submittedAt: '2024-01-08', founderEmail: 'mary@healthbridge.com' },
    { id: '4', name: 'EduLearn', industry: 'Education', status: 'rejected', submittedAt: '2024-01-14', founderEmail: 'anna@edulearn.com' },
  ]

  const [list, setList] = useState(mockStartups)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartupsForAdmin()
        const next = data.startups || data || []
        setStartups(next)
        setList(next.length > 0 ? next : mockStartups)
      } catch (err) {
        setStartups([])
        setList(mockStartups)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = statusFilter ? list.filter((s) => s.status === statusFilter) : list

  const handleVerify = (id) => {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'validated' } : s)))
  }

  const handleReject = (id) => {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s)))
  }

  const handleAddStartup = (e) => {
    e.preventDefault()
    if (!newStartup.name.trim()) return
    setList((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        ...newStartup,
        status: 'pending',
        submittedAt: new Date().toISOString().slice(0, 10),
      },
    ])
    setNewStartup({ name: '', industry: 'Technology', stage: 'Seed', founderEmail: '' })
    setShowAddModal(false)
  }

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
          <p className="text-text-muted text-sm mt-0.5">Track, verify, and add startups</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            + Add Startup
          </button>
        </div>
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
                <th className="text-left px-4 py-3 font-medium">Actions</th>
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
                  <td className="px-4 py-3">
                    {startup.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleVerify(startup.id)}
                          className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success hover:bg-success/30"
                        >
                          Verify
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(startup.id)}
                          className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        title="Add Startup"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-text hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-startup-form"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-hover"
            >
              Add
            </button>
          </>
        }
      >
        <form id="add-startup-form" onSubmit={handleAddStartup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Startup name</label>
            <input
              type="text"
              value={newStartup.name}
              onChange={(e) => setNewStartup({ ...newStartup, name: e.target.value })}
              placeholder="e.g. TechFlow Solutions"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Industry</label>
            <select
              value={newStartup.industry}
              onChange={(e) => setNewStartup({ ...newStartup, industry: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Stage</label>
            <select
              value={newStartup.stage}
              onChange={(e) => setNewStartup({ ...newStartup, stage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="Seed">Seed</option>
              <option value="Early Stage">Early Stage</option>
              <option value="Series A">Series A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Founder email</label>
            <input
              type="email"
              value={newStartup.founderEmail}
              onChange={(e) => setNewStartup({ ...newStartup, founderEmail: e.target.value })}
              placeholder="founder@startup.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default StartupMonitoring
