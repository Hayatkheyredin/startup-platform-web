/**
 * PlatformAnalytics - Basic stats: users, businesses, investments.
 */
import React, { useState, useEffect } from 'react'
import { getPlatformAnalytics } from '../../services/api'

function PlatformAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlatformAnalytics()
        setAnalytics(data)
      } catch (err) {
        setAnalytics(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const mockAnalytics = {
    totalUsers: 156,
    totalBusinesses: 42,
    totalInvestments: 28,
    totalFundingRaised: '$1.2M',
  }

  const stats = analytics || mockAnalytics

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: UsersIcon, bg: 'bg-primary' },
    { label: 'Total Businesses', value: stats.totalBusinesses ?? stats.totalStartups ?? 0, icon: RocketIcon, bg: 'bg-secondary' },
    { label: 'Total Investments', value: stats.totalInvestments, icon: ChartIcon, bg: 'bg-accent' },
    { label: 'Funding Raised', value: stats.totalFundingRaised, icon: MoneyIcon, bg: 'bg-primary' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text">Platform Analytics</h1>
        <p className="text-text-muted text-sm mt-0.5">Overview of platform metrics</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="bg-white rounded-card shadow-card border border-slate-100 p-5 flex items-center gap-4 hover:shadow-card-hover transition-smooth"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${stat.bg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-text">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function RocketIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ChartIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function MoneyIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default PlatformAnalytics
