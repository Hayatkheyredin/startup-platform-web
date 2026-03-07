/**
 * InvestmentManagement - Track startups investor is interested in or has invested in.
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StartupCard from '../../components/StartupCard'
import EmptyState from '../../components/ui/EmptyState'
import { getInvestorInvestments } from '../../services/api'

function HeartIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function WalletIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-12-2h.01" />
    </svg>
  )
}

function InvestmentManagement() {
  const [data, setData] = useState({ interested: [], invested: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('interested')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvestorInvestments()
        setData(res)
      } catch (err) {
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text">Investment Management</h1>
        <p className="text-text-muted text-sm mt-0.5">Track your interests and investments</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('interested')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'interested' ? 'bg-white text-text shadow-card' : 'text-text-muted hover:text-text hover:bg-white/50'
              }`}
            >
              Interested ({interested.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('invested')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'invested' ? 'bg-white text-text shadow-card' : 'text-text-muted hover:text-text hover:bg-white/50'
              }`}
            >
              Invested ({invested.length})
            </button>
          </div>

          {activeTab === 'interested' && (
            interested.length === 0 ? (
              <EmptyState
                icon={HeartIcon}
                title="No startups in your list yet"
                description="Save startups you're interested in to track them here and get updates."
                action={
                  <Link
                    to="/investor/startups"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Browse Startups →
                  </Link>
                }
              />
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interested.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
            )
          )}

          {activeTab === 'invested' && (
            invested.length === 0 ? (
              <EmptyState
                icon={WalletIcon}
                title="No investments yet"
                description="When you invest in startups, they'll appear here with amount and date."
                action={
                  <Link
                    to="/investor/startups"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Explore Startups →
                  </Link>
                }
              />
            ) : (
            <>
              <div className="bg-white rounded-card shadow-card border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Startup</th>
                      <th className="text-left px-4 py-3 font-medium">Industry</th>
                      <th className="text-left px-4 py-3 font-medium">Amount</th>
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-left px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invested.map((s) => (
                      <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-text">{s.name}</td>
                        <td className="px-4 py-3 text-text-muted">{s.industry}</td>
                        <td className="px-4 py-3 text-text-muted">{s.investedAmount || 'N/A'}</td>
                        <td className="px-4 py-3 text-text-muted">{s.date || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/investor/startups/${s.id}`}
                            className="text-primary font-medium hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
            )
          )}
        </>
      )}
    </div>
  )
}

export default InvestmentManagement
