/**
 * StartupCard - Card for startup summaries with placeholder images and polished styling.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Placeholder images: industry-specific Unsplash, or Picsum seeded by id for variety
function getPlaceholderImage(id) {
  const seed = (id || '1').toString().replace(/\D/g, '') || '1'
  return `https://picsum.photos/seed/${seed}/400/240`
}

const INDUSTRY_IMAGES = {
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop&q=80',
  Sustainability: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=240&fit=crop&q=80',
  Healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=240&fit=crop&q=80',
  Education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop&q=80',
}

function getImageUrl(imageUrl, id, industry) {
  if (imageUrl) return imageUrl
  return INDUSTRY_IMAGES[industry] || getPlaceholderImage(id)
}

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

  const [imgError, setImgError] = useState(false)
  const placeholderUrl = getImageUrl(null, id, industry)
  const resolvedImageUrl = imageUrl || (imgError ? null : placeholderUrl)

  return (
    <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col h-full border border-slate-100 hover:border-primary/20 hover:-translate-y-0.5">
      <div className="h-1 bg-gradient-to-r from-primary to-secondary" />

      <div className="relative h-48 overflow-hidden">
        {resolvedImageUrl ? (
          <img
            src={resolvedImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary">
            <span className="text-5xl font-bold text-white/90 drop-shadow-sm">
              {(name || 'S').charAt(0).toUpperCase()}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        {status && (
          <span className="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-accent text-white shadow-lg">
            {status}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-text text-lg mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
            {industry}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-text-muted">
            {stage}
          </span>
        </div>
        <p className="text-sm text-text-muted flex-1 line-clamp-2 mb-4">{shortDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-text-muted uppercase tracking-wide">Funding needed</span>
          <span className="font-semibold text-primary">{fundingNeeded}</span>
        </div>
        {showInvestButton && (
          <Link
            to={`${linkPrefix}/startups/${id}`}
            className="mt-auto block w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-all duration-200 shadow-card hover:shadow-glow"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartupCard
