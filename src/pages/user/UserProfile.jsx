/**
 * User Profile - Business name/title, description, and all required fields.
 */
import React, { useState, useEffect } from 'react'
import { getCurrentUser, updateCurrentUser } from '../../lib/authStorage'

const defaultProfile = {
  businessName: '',
  description: '',
  industry: '',
  stage: '',
  website: '',
  location: '',
  pitch: '',
}

function UserProfile() {
  const user = getCurrentUser()
  const [profile, setProfile] = useState(defaultProfile)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.profile && typeof user.profile === 'object') {
      const p = { ...defaultProfile, ...user.profile }
      if (p.startupName && !p.businessName) p.businessName = p.startupName
      setProfile(p)
    }
  }, [])

  const handleChange = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      updateCurrentUser({ profile })
      setSaved(true)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">Profile</h1>
      <p className="text-text-muted mb-6">
        Tell us about your business. Experts will review your application; you will then be considered for either a grant or an investment opportunity (one only).
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-text mb-1.5">
            Business name or title
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="e.g. GreenEats"
            value={profile.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe your business, problem you solve, and target audience."
            value={profile.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-text mb-1.5">
            Industry
          </label>
          <select
            id="industry"
            value={profile.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="stage" className="block text-sm font-medium text-text mb-1.5">
            Stage
          </label>
          <select
            id="stage"
            value={profile.stage}
            onChange={(e) => handleChange('stage', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select stage</option>
            <option value="Idea">Idea</option>
            <option value="MVP">MVP</option>
            <option value="Early traction">Early traction</option>
            <option value="Growth">Growth</option>
          </select>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-text mb-1.5">
            Website (optional)
          </label>
          <input
            id="website"
            type="url"
            placeholder="https://..."
            value={profile.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text mb-1.5">
            Location (optional)
          </label>
          <input
            id="location"
            type="text"
            placeholder="City, Country"
            value={profile.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="pitch" className="block text-sm font-medium text-text mb-1.5">
            Short pitch (optional)
          </label>
          <textarea
            id="pitch"
            rows={2}
            placeholder="One sentence that describes your business."
            value={profile.pitch}
            onChange={(e) => handleChange('pitch', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save profile'}
          </button>
          {saved && (
            <span className="text-sm text-primary font-medium">Saved.</span>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserProfile
