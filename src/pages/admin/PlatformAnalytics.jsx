/**
 * PlatformAnalytics - Basic stats: users, startups, investments.
 * Inspired by inspo design: grid of stat cards with orange accent.
 */
import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import { getPlatformAnalytics } from '../../services/api'

function PlatformAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlatformAnalytics()
        setAnalytics(data)
      } catch (err) {
        setError(err.message || 'Failed to load analytics')
        setAnalytics(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const mockAnalytics = {
    totalUsers: 156,
    totalStartups: 42,
    totalInvestments: 28,
    totalFundingRaised: '$1.2M',
  }

  const stats = analytics || mockAnalytics

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'var(--color-accent)' },
    { label: 'Total Startups', value: stats.totalStartups, icon: '🚀', color: 'var(--color-charcoal)' },
    { label: 'Total Investments', value: stats.totalInvestments, icon: '💰', color: 'var(--color-accent)' },
    { label: 'Funding Raised', value: stats.totalFundingRaised, icon: '📈', color: 'var(--color-charcoal)' },
  ]

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-charcoal">Platform Analytics</h1>
        <p className="text-muted mb-0">Overview of platform metrics</p>
      </div>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
        </div>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          {statCards.map((stat, i) => (
            <Col key={i}>
              <Card className="card-custom h-100 border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: 56, height: 56, backgroundColor: stat.color, color: 'white' }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  </div>
                  <div>
                    <Card.Title className="h4 mb-0">{stat.value}</Card.Title>
                    <Card.Text className="text-muted small mb-0">{stat.label}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default PlatformAnalytics
