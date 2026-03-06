/**
 * StartupList - List all validated startups with filters.
 * Filterable by industry, funding needed, stage.
 */
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table, Spinner, Alert } from 'react-bootstrap'
import StartupCard from '../../components/StartupCard'
import { getStartups } from '../../services/api'

function StartupList() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'
  const [filters, setFilters] = useState({
    industry: '',
    fundingNeeded: '',
    stage: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartups(filters)
        setStartups(data.startups || data || [])
      } catch (err) {
        setError(err.message || 'Failed to load startups')
        setStartups([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filters.industry, filters.fundingNeeded, filters.stage])

  const mockStartups = [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', stage: 'Seed', fundingNeeded: '$50K', shortDescription: 'AI-powered workflow automation.' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', stage: 'Early Stage', fundingNeeded: '$100K', shortDescription: 'Plant-based meal kits.' },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', stage: 'Series A', fundingNeeded: '$250K', shortDescription: 'Telehealth platform.' },
    { id: '4', name: 'EduLearn', industry: 'Education', stage: 'Seed', fundingNeeded: '$75K', shortDescription: 'Personalized learning app.' },
  ]

  const displayStartups = startups.length > 0 ? startups : mockStartups
  const filteredStartups = displayStartups.filter((s) => {
    if (filters.industry && s.industry !== filters.industry) return false
    if (filters.stage && s.stage !== filters.stage) return false
    return true
  })

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h3 fw-bold text-charcoal">Startup List</h1>
          <p className="text-muted mb-0">All validated startups</p>
        </div>
        <div className="d-flex gap-2">
          <Form.Select
            size="sm"
            style={{ width: 140 }}
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="cards">Cards</option>
            <option value="table">Table</option>
          </Form.Select>
        </div>
      </div>

      {/* Filters */}
      <div className="section-dark rounded p-3 mb-4">
        <Row className="g-2">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-white small mb-1">Industry</Form.Label>
              <Form.Select
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                className="bg-dark text-white border-secondary"
              >
                <option value="">All</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Education">Education</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-white small mb-1">Stage</Form.Label>
              <Form.Select
                value={filters.stage}
                onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                className="bg-dark text-white border-secondary"
              >
                <option value="">All</option>
                <option value="Seed">Seed</option>
                <option value="Early Stage">Early Stage</option>
                <option value="Series A">Series A</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-white small mb-1">Funding Needed</Form.Label>
              <Form.Select
                value={filters.fundingNeeded}
                onChange={(e) => setFilters({ ...filters, fundingNeeded: e.target.value })}
                className="bg-dark text-white border-secondary"
              >
                <option value="">All</option>
                <option value="50K">Up to $50K</option>
                <option value="100K">Up to $100K</option>
                <option value="250K">Up to $250K</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
        </div>
      ) : viewMode === 'cards' ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredStartups.map((startup) => (
            <Col key={startup.id}>
              <StartupCard startup={startup} />
            </Col>
          ))}
        </Row>
      ) : (
        <Table responsive bordered hover>
          <thead style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Stage</th>
              <th>Funding Needed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStartups.map((startup) => (
              <tr key={startup.id}>
                <td>{startup.name}</td>
                <td>{startup.industry}</td>
                <td>{startup.stage}</td>
                <td>{startup.fundingNeeded}</td>
                <td>
                  <a
                    href={`/investor/startups/${startup.id}`}
                    className="btn btn-sm btn-primary-custom rounded-0"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default StartupList
