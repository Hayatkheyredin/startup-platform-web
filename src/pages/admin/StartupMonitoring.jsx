/**
 * StartupMonitoring - Admin page to list startups and track status.
 */
import React, { useState, useEffect } from 'react'
import { Table, Spinner, Alert, Badge, Form } from 'react-bootstrap'
import { getStartupsForAdmin } from '../../services/api'

function StartupMonitoring() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartupsForAdmin()
        setStartups(data.startups || data || [])
      } catch (err) {
        setError(err.message || 'Failed to load startups')
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
    const variants = { validated: 'success', pending: 'warning', rejected: 'danger' }
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h3 fw-bold text-charcoal">Startup Monitoring</h1>
          <p className="text-muted mb-0">Track startup status</p>
        </div>
        <Form.Select
          size="sm"
          style={{ width: 160 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="validated">Validated</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </Form.Select>
      </div>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
        </div>
      ) : (
        <Table responsive bordered hover>
          <thead style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Founder</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((startup) => (
              <tr key={startup.id}>
                <td>{startup.name}</td>
                <td>{startup.industry}</td>
                <td>{getStatusBadge(startup.status)}</td>
                <td>{startup.submittedAt || 'N/A'}</td>
                <td>{startup.founderEmail || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default StartupMonitoring
