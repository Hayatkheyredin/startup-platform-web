/**
 * StartupList - List businesses selected for investment.
 * Same data source as InvestorDashboard: getBusinessesForInvestment() from applicationsData.js.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StartupCard from '../../components/StartupCard'
import { getBusinessesForInvestment } from '../../lib/applicationsData'

function StartupList() {
  const [viewMode, setViewMode] = useState('cards')
  const [filters, setFilters] = useState({
    industry: '',
    fundingNeeded: '',
    stage: '',
  })

  const displayStartups = getBusinessesForInvestment()
  const filteredStartups = displayStartups.filter((s) => {
    if (filters.industry && s.industry !== filters.industry) return false
    if (filters.stage && s.stage !== filters.stage) return false
    return true
  })
  const loading = false

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">Business List</h1>
          <p className="text-text-muted text-sm mt-0.5">Businesses selected for investment—browse and invest</p>
        </div>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="w-full sm:w-36 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="cards">Cards</option>
          <option value="table">Table</option>
        </select>
      </div>

      <div className="bg-white rounded-card shadow-card border border-brand-dark/30 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Stage</label>
            <select
              value={filters.stage}
              onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All</option>
              <option value="Seed">Seed</option>
              <option value="Early Stage">Early Stage</option>
              <option value="Series A">Series A</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Funding Needed</label>
            <select
              value={filters.fundingNeeded}
              onChange={(e) => setFilters({ ...filters, fundingNeeded: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All</option>
              <option value="50K">Up to $50K</option>
              <option value="100K">Up to $100K</option>
              <option value="250K">Up to $250K</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card border border-brand-dark/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Industry</th>
                <th className="text-left px-4 py-3 font-medium">Stage</th>
                <th className="text-left px-4 py-3 font-medium">Funding Needed</th>
                <th className="text-left px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStartups.map((startup) => (
                <tr key={startup.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-text">{startup.name}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.industry}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.stage}</td>
                  <td className="px-4 py-3 text-text-muted">{startup.fundingNeeded}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/investor/businesses/${startup.id}`}
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
      )}
    </div>
  )
}

export default StartupList
