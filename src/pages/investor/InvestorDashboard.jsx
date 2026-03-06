/**
 * InvestorDashboard - Home/overview page for investors.
 * Displays startup cards in a grid layout. API call to fetch startups.
 */
import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner, Alert } from 'react-bootstrap'
import StartupCard from '../../components/StartupCard'
import { getStartups } from '../../services/api'

function InvestorDashboard() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartups()
        setStartups(data.startups || data || [])
      } catch (err) {
        setError(err.message || 'Failed to load startups')
        setStartups([]) // Use mock data when API fails
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Mock data for demo when API is not available
  const displayStartups = startups.length > 0 ? startups : [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', stage: 'Seed', fundingNeeded: '$50K', shortDescription: 'AI-powered workflow automation for SMEs.' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', stage: 'Early Stage', fundingNeeded: '$100K', shortDescription: 'Plant-based meal kits with zero waste packaging.' },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', stage: 'Series A', fundingNeeded: '$250K', shortDescription: 'Telehealth platform connecting patients with specialists.' },
  ]

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-charcoal">Dashboard</h1>
        <p className="text-muted mb-0">Overview of validated startups</p>
      </div>

      {error && <Alert variant="warning" className="mb-3">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
          <p className="mt-2 text-muted">Loading startups...</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {displayStartups.map((startup) => (
            <Col key={startup.id}>
              <StartupCard startup={startup} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default InvestorDashboard
