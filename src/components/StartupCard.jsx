/**
 * StartupCard - Card for business summaries with polished styling.
 * Uses uploaded category images (craftswomen, snacks, food, health) for investor business list.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Category images (uploaded) – used for business list on investor dashboard
const CATEGORY_IMAGES = {
  craftswomen: '/images/craftswomen.png',
  snacks: '/images/snacks.png',
  food: '/images/food.png',
  health: '/images/health.png',
}

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

/** Derive category (craftswomen | snacks | food | health) from business so we show the right uploaded image. */
function getCategoryForBusiness(industry, name, shortDescription) {
  const n = (name || '').toLowerCase()
  const d = (shortDescription || '').toLowerCase()
  const combined = `${n} ${d}`

  if (industry === 'Healthcare') {
    if (/\b(snack|teff|crunchy)\b/.test(combined)) return 'snacks'
    return 'health'
  }
  if (industry === 'Other' || /\b(craft|textile|handwoven|fabric|fashion|weav)\b/.test(combined)) return 'craftswomen'
  if (industry === 'Sustainability' && /\b(tukul|housing|material|craft|textile)\b/.test(combined)) return 'craftswomen'
  if (/\b(meal|food|hidar|restaurant|catering|recipe)\b/.test(combined)) return 'food'

  return null
}

function getImageUrl(imageUrl, id, industry, name, shortDescription) {
  if (imageUrl) return imageUrl
  const category = getCategoryForBusiness(industry, name, shortDescription)
  if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category]
  return INDUSTRY_IMAGES[industry] || getPlaceholderImage(id)
}

function StartupCard({ startup, showInvestButton = true, linkPrefix = '/investor' }) {
  const {
    id,
    name = 'Business Name',
    industry = 'Technology',
    stage = 'Early Stage',
    fundingNeeded = 'N/A',
    shortDescription = 'Brief description of the business and value proposition.',
    imageUrl,
    status,
    fundingProgress,
  } = startup

  // Demo: derive progress from id if not provided (0-100)
  const progressPercent = fundingProgress != null
    ? Math.min(100, Math.max(0, Number(fundingProgress)))
    : (() => { const n = parseInt(String(id).replace(/\D/g, '1'), 10); return Math.min(95, Math.max(12, (n * 17 + 35) % 85)); })()

  const [imgError, setImgError] = useState(false)
  const placeholderUrl = getImageUrl(null, id, industry, name, shortDescription)
  const resolvedImageUrl = imageUrl || (imgError ? null : placeholderUrl)

  return (
    <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col h-full border border-brand-dark/30 hover:border-primary/30 hover:-translate-y-0.5">
      <div className="h-1 bg-primary" />

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
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted uppercase tracking-wide">Funding needed</span>
            <span className="font-semibold text-primary">{fundingNeeded}</span>
          </div>
          <div className="h-2 rounded-full bg-brand overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-1">{progressPercent}% raised</p>
        </div>
        {showInvestButton && (
          <Link
            to={`${linkPrefix}/businesses/${id}`}
            className="mt-auto block w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-all duration-200 shadow-card hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartupCard
