/**
 * User Profile - Business name/title, description, and all required fields.
 * On Save: persist profile, call Gemini for team suggestions, show Skip/Accept modal.
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, updateCurrentUser } from '../../lib/authStorage'
import { getTeamSuggestions } from '../../services/gemini'
import { MOCK_TEAMS } from '../../data/teams'
import { delay, SAVE_DELAY_MS, SHORT_DELAY_MS } from '../../lib/delay'

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
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [profile, setProfile] = useState(defaultProfile)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [suggestedTeamIds, setSuggestedTeamIds] = useState(null)
  const [aiError, setAiError] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAiError(null)
    setSuggestedTeamIds(null)
    try {
      await delay(SAVE_DELAY_MS)
      updateCurrentUser({ profile, hasCompletedProfile: true })
      setSaved(true)
      setLoading(false)

      setAiLoading(true)
      const ids = await getTeamSuggestions(profile, MOCK_TEAMS)
      setAiLoading(false)
      if (ids && ids.length > 0) {
        setSuggestedTeamIds(ids)
      }
    } catch (err) {
      setLoading(false)
      setAiLoading(false)
      setAiError(err.message || 'Could not get AI suggestions.')
      setSaved(true)
    }
  }

  const handleSkip = () => {
    setSuggestedTeamIds(null)
    setAiError(null)
  }

  const handleAccept = async () => {
    if (suggestedTeamIds && suggestedTeamIds.length > 0) {
      updateCurrentUser({ recommendedTeamIds: suggestedTeamIds })
      setSuggestedTeamIds(null)
      await delay(SHORT_DELAY_MS)
      navigate('/user/team')
    }
  }

  const suggestedTeams = suggestedTeamIds
    ? MOCK_TEAMS.filter((t) => suggestedTeamIds.includes(t.id))
    : []

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">Profile</h1>
      <p className="text-text-muted mb-6">
        Tell us about your business. Save your profile to get AI-powered team suggestions, then join a team and chat with teammates.
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
            disabled={loading || aiLoading}
            className="px-6 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving...' : aiLoading ? 'Getting suggestions...' : 'Save profile'}
          </button>
          {saved && !aiLoading && !suggestedTeamIds && (
            <span className="text-sm text-primary font-medium">Saved.</span>
          )}
        </div>
      </form>

      {aiError && (
        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          {aiError} You can still browse teams manually.
        </div>
      )}

      {/* AI suggestion modal */}
      {suggestedTeamIds && suggestedTeams.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={handleSkip}>
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-brand-dark/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-text mb-2">Suggested teams for you</h2>
            <p className="text-sm text-text-muted mb-4">
              Based on your profile, we recommend these teams (up to 3). Accept to see them in &quot;Recommended for you&quot; on the team page, or skip to browse all teams.
            </p>
            <ul className="space-y-2 mb-6">
              {suggestedTeams.map((t) => (
                <li key={t.id} className="flex items-center gap-2 py-2 border-b border-brand-dark/10 last:border-0">
                  <span className="font-medium text-text">{t.name}</span>
                  <span className="text-xs text-text-muted">— {t.tagline}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 py-2.5 rounded-xl font-medium border border-brand-dark/30 text-text hover:bg-brand/50 transition-colors"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
