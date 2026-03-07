/**
 * InvestmentManagement - Track startups investor is interested in or has invested in.
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StartupCard from '../../components/StartupCard'
import { getInvestorInvestments } from '../../services/api'

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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === 'interested' ? 'bg-white text-text shadow-card' : 'text-text-muted hover:text-text'
              }`}
            >
              Interested ({interested.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('invested')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === 'invested' ? 'bg-white text-text shadow-card' : 'text-text-muted hover:text-text'
              }`}
            >
              Invested ({invested.length})
            </button>
          </div>

          {activeTab === 'interested' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interested.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
              {interested.length === 0 && (
                <p className="text-text-muted col-span-full">No startups in your interest list yet.</p>
              )}
            </div>
          )}

          {activeTab === 'invested' && (
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
                      <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50/50">
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
              {invested.length === 0 && (
                <p className="text-text-muted mt-4">No investments recorded yet.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default InvestmentManagement
