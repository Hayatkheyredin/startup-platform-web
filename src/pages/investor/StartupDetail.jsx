/**
 * StartupDetail - Full startup view with team, idea, AI validation, investment options.
 */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, Spinner, Alert, Badge, ListGroup } from 'react-bootstrap'
import { getStartupById, addToInterests, recordInvestment } from '../../services/api'
import Modal from '../../components/ui/Modal'
import.meta.env.VITE_API_URL

function StartupDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [startup, setStartup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [investAmount, setInvestAmount] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartupById(id)
        setStartup(data)
      } catch (err) {
        setError(err.message || 'Failed to load startup')
        setStartup(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // Mock data when API fails
  const mockStartup = {
    id,
    name: 'TechFlow Solutions',
    industry: 'Technology',
    stage: 'Seed',
    fundingNeeded: '$50,000',
    description: 'AI-powered workflow automation for small and medium enterprises. Our platform reduces manual tasks by 60% and integrates with existing tools.',
    teamMembers: [
      { name: 'Jane Doe', role: 'CEO & Founder', email: 'jane@techflow.com' },
      { name: 'Sarah Smith', role: 'CTO', email: 'sarah@techflow.com' },
    ],
    aiValidationReport: {
      score: 85,
      summary: 'Strong market fit, validated problem. Team has relevant experience.',
      risks: ['Competition from established players', 'Regulatory considerations'],
      recommendations: ['Focus on niche vertical first', 'Build partnerships'],
    },
  }

  const displayStartup = startup || mockStartup

  const handleAddToInterests = async () => {
    try {
      await addToInterests(id)
      alert('Added to your interests!')
    } catch (err) {
      alert(err.message || 'Failed to add')
    }
  }

  const handleRecordInvestment = async () => {
    try {
      await recordInvestment(id, { amount: investAmount })
      setShowInvestModal(false)
      alert('Investment recorded!')
    } catch (err) {
      alert(err.message || 'Failed to record')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
      </div>
    )
  }

  return (
    <div>
      <Button variant="link" className="text-accent mb-3 p-0" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {/* Hero section - dark panel with key info */}
      <div className="section-dark rounded p-4 mb-4">
        <Row>
          <Col md={8}>
            <h1 className="h3 fw-bold text-white mb-2">{displayStartup.name}</h1>
            <div className="d-flex gap-2 mb-2">
              <Badge bg="secondary">{displayStartup.industry}</Badge>
              <Badge style={{ backgroundColor: 'var(--color-accent)' }}>{displayStartup.stage}</Badge>
            </div>
            <p className="text-white-50 mb-3">{displayStartup.description}</p>
            <p className="text-white mb-0">
              <strong>Funding needed:</strong> {displayStartup.fundingNeeded}
            </p>
          </Col>
          <Col md={4} className="d-flex flex-column gap-2 justify-content-end">
            <Button className="btn btn-primary-custom rounded-0" onClick={handleAddToInterests}>
              Add to Interests
            </Button>
            <Button variant="outline-light" className="rounded-0" onClick={() => setShowInvestModal(true)}>
              Record Investment
            </Button>
          </Col>
        </Row>
      </div>

      <Row>
        {/* Team Members */}
        <Col md={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Header style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
              Team Members
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {(displayStartup.teamMembers || []).map((member, i) => (
                  <ListGroup.Item key={i}>
                    <strong>{member.name}</strong> — {member.role}
                    <br />
                    <small className="text-muted">{member.email}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* AI Validation Report */}
        <Col md={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Header style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
              AI Validation Report
            </Card.Header>
            <Card.Body>
              {displayStartup.aiValidationReport ? (
                <>
                  <div className="mb-3">
                    <span className="badge" style={{ backgroundColor: 'var(--color-accent)', fontSize: '1rem' }}>
                      Score: {displayStartup.aiValidationReport.score}/100
                    </span>
                  </div>
                  <p className="small">{displayStartup.aiValidationReport.summary}</p>
                  <p className="small mb-1"><strong>Risks:</strong></p>
                  <ul className="small">
                    {(displayStartup.aiValidationReport.risks || []).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <p className="small mb-1"><strong>Recommendations:</strong></p>
                  <ul className="small">
                    {(displayStartup.aiValidationReport.recommendations || []).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-muted small">No validation report available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Investment Modal */}
      <Modal
        show={showInvestModal}
        onHide={() => setShowInvestModal(false)}
        title="Record Investment"
        footer={
          <>
            <Button className="btn btn-secondary-custom" onClick={() => setShowInvestModal(false)}>
              Cancel
            </Button>
            <Button className="btn btn-primary-custom" onClick={handleRecordInvestment}>
              Confirm
            </Button>
          </>
        }
      >
        <label className="form-label">Amount ($)</label>
        <input
          type="number"
          className="form-control"
          placeholder="e.g. 10000"
          value={investAmount}
          onChange={(e) => setInvestAmount(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default StartupDetail
