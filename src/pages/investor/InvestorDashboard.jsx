/**
 * InvestorDashboard - Home/overview page for investors.
 */
import React, { useState, useEffect } from 'react'
import StartupCard from '../../components/StartupCard'
import { getStartups } from '../../services/api'

function InvestorDashboard() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStartups()
        setStartups(data.startups || data || [])
      } catch (err) {
        setStartups([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const displayStartups = startups.length > 0 ? startups : [
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', stage: 'Seed', fundingNeeded: '$50K', shortDescription: 'AI-powered workflow automation for SMEs.' },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', stage: 'Early Stage', fundingNeeded: '$100K', shortDescription: 'Plant-based meal kits with zero waste packaging.' },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', stage: 'Series A', fundingNeeded: '$250K', shortDescription: 'Telehealth platform connecting patients with specialists.' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Welcome strip */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-6 md:p-8 text-white shadow-card">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back</h1>
          <p className="text-white/90 text-sm md:text-base">
            Discover and support validated women-led startups
          </p>
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 right-12 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 blur-xl" />
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text">Validated Startups</h2>
          <p className="text-text-muted text-sm mt-0.5">Overview of startups ready for investment</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-text-muted">Loading startups...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  )
}

export default InvestorDashboard
