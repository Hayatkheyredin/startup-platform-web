/**
 * StartupCard - Reusable card component for displaying startup summaries.
 * Inspired by inspo design: clean card with image, title, key info, orange CTA.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

function StartupCard({ startup, showInvestButton = true, linkPrefix = '/investor' }) {
  const {
    id,
    name = 'Startup Name',
    industry = 'Technology',
    stage = 'Early Stage',
    fundingNeeded = 'N/A',
    shortDescription = 'Brief description of the startup idea and value proposition.',
    imageUrl,
    status,
  } = startup

  return (
    <Card className="card-custom h-100 overflow-hidden">
      {/* Image or placeholder */}
      <div
        className="bg-light"
        style={{
          height: 180,
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {status && (
          <span
            className="badge position-absolute top-0 end-0 m-2"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {status}
          </span>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 text-charcoal mb-2">{name}</Card.Title>
        <div className="d-flex flex-wrap gap-1 mb-2">
          <span className="badge bg-secondary">{industry}</span>
          <span className="badge bg-light text-dark">{stage}</span>
        </div>
        <Card.Text className="small text-muted flex-grow-1" style={{ fontSize: '0.85rem' }}>
          {shortDescription}
        </Card.Text>
        <div className="mt-2 mb-2">
          <small className="text-muted">Funding needed:</small>
          <span className="fw-semibold ms-1">{fundingNeeded}</span>
        </div>
        {showInvestButton && (
          <Button
            as={Link}
            to={`${linkPrefix}/startups/${id}`}
className="btn btn-primary-custom rounded-0 mt-auto"
          >
            View Details
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default StartupCard
