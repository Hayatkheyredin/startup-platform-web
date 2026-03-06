/**
 * InvestmentManagement - Track startups investor is interested in or has invested in.
 */
import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Spinner, Alert, Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StartupCard from '../../components/StartupCard'
import { getInvestorInvestments } from '../../services/api'

function InvestmentManagement() {
  const [data, setData] = useState({ interested: [], invested: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvestorInvestments()
        setData(res)
      } catch (err) {
        setError(err.message || 'Failed to load')
        setData({ interested: [], invested: [] })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const mockInterested = [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', stage: 'Seed', fundingNeeded: '$50K', shortDescription: 'AI workflow automation.' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', stage: 'Early Stage', fundingNeeded: '$100K', shortDescription: 'Plant-based meal kits.' },
  ]
  const mockInvested = [
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', stage: 'Series A', fundingNeeded: '$250K', shortDescription: 'Telehealth platform.', investedAmount: '$25,000', date: '2024-01-15' },
  ]

  const interested = (data.interested || []).length > 0 ? data.interested : mockInterested
  const invested = (data.invested || []).length > 0 ? data.invested : mockInvested

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-charcoal">Investment Management</h1>
        <p className="text-muted mb-0">Track your interests and investments</p>
      </div>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
        </div>
      ) : (
        <Tabs defaultActiveKey="interested" className="mb-3">
          <Tab eventKey="interested" title={`Interested (${interested.length})`}>
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
              {interested.map((startup) => (
                <Col key={startup.id}>
                  <StartupCard startup={startup} />
                </Col>
              ))}
              {interested.length === 0 && (
                <Col>
                  <p className="text-muted">No startups in your interest list yet.</p>
                </Col>
              )}
            </Row>
          </Tab>
          <Tab eventKey="invested" title={`Invested (${invested.length})`}>
            <Table responsive bordered hover className="mt-2">
              <thead style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
                <tr>
                  <th>Startup</th>
                  <th>Industry</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invested.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.industry}</td>
                    <td>{s.investedAmount || 'N/A'}</td>
                    <td>{s.date || 'N/A'}</td>
                    <td>
                      <Link to={`/investor/startups/${s.id}`} className="btn btn-sm btn-primary-custom rounded-0">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {invested.length === 0 && <p className="text-muted mt-2">No investments recorded yet.</p>}
          </Tab>
        </Tabs>
      )}
    </div>
  )
}

export default InvestmentManagement
