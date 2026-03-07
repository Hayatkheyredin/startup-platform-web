/**
 * InvestorDashboard - Data-rich overview with stats, charts, trending startups, and activity.
 */
import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import StartupCard from '../../components/StartupCard'
import { getStartups } from '../../services/api'

const STATS = [
  { label: 'Total Startups', value: '42', sub: 'Validated', icon: '🚀', color: 'from-primary to-primary/80' },
  { label: 'Active Investors', value: '128', sub: 'This month', icon: '👥', color: 'from-secondary to-secondary/80' },
  { label: 'Total Funding Raised', value: '$1.2M', sub: 'All time', icon: '💰', color: 'from-accent to-accent/80' },
  { label: 'Investments Made', value: '86', sub: 'Deals closed', icon: '📈', color: 'from-success to-success/80' },
]

const FUNDING_GROWTH_DATA = [
  { month: 'Jan', amount: 120 },
  { month: 'Feb', amount: 180 },
  { month: 'Mar', amount: 220 },
  { month: 'Apr', amount: 290 },
  { month: 'May', amount: 340 },
  { month: 'Jun', amount: 410 },
  { month: 'Jul', amount: 480 },
  { month: 'Aug', amount: 560 },
  { month: 'Sep', amount: 720 },
  { month: 'Oct', amount: 890 },
  { month: 'Nov', amount: 1020 },
  { month: 'Dec', amount: 1200 },
]

const INDUSTRY_DISTRIBUTION = [
  { name: 'Technology', value: 38, color: '#6D28D9' },
  { name: 'Healthcare', value: 24, color: '#E11D48' },
  { name: 'Sustainability', value: 18, color: '#0EA5E9' },
  { name: 'Education', value: 12, color: '#10B981' },
  { name: 'Other', value: 8, color: '#78716C' },
]

const MONTHLY_INVESTMENTS = [
  { month: 'Aug', count: 8 },
  { month: 'Sep', count: 12 },
  { month: 'Oct', count: 15 },
  { month: 'Nov', count: 18 },
  { month: 'Dec', count: 22 },
]

const RECENT_ACTIVITY = [
  { type: 'startup', text: 'GreenEats joined the platform', time: '2 hours ago', icon: '🚀' },
  { type: 'investment', text: 'HealthBridge received $25K investment', time: '5 hours ago', icon: '💰' },
  { type: 'startup', text: 'EduLearn completed validation', time: 'Yesterday', icon: '✓' },
  { type: 'investment', text: 'TechFlow Solutions raised $50K', time: 'Yesterday', icon: '📈' },
  { type: 'startup', text: 'New startup FitWell applied', time: '2 days ago', icon: '🚀' },
]

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
    { id: '1', name: 'TechFlow Solutions', industry: 'Technology', stage: 'Seed', fundingNeeded: '$50K', shortDescription: 'AI-powered workflow automation for SMEs.', fundingProgress: 72 },
    { id: '2', name: 'GreenEats', industry: 'Sustainability', stage: 'Early Stage', fundingNeeded: '$100K', shortDescription: 'Plant-based meal kits with zero waste packaging.', fundingProgress: 45 },
    { id: '3', name: 'HealthBridge', industry: 'Healthcare', stage: 'Series A', fundingNeeded: '$250K', shortDescription: 'Telehealth platform connecting patients with specialists.', fundingProgress: 88 },
  ]

  const trendingStartups = [...displayStartups].slice(0, 4)

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome strip */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-6 md:p-8 text-white shadow-card">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back</h1>
          <p className="text-white/90 text-sm md:text-base">
            Discover and support validated women-led startups
          </p>
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 right-12 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 blur-xl" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-card border border-slate-100 p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-lg mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-sm font-medium text-text-muted">{stat.label}</p>
            <p className="text-xs text-text-muted mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 p-5 hover:shadow-card-hover transition-shadow duration-200">
          <h3 className="text-sm font-semibold text-text mb-4">Funding growth (K $)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FUNDING_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
                  formatter={(value) => [`$${value}K`, 'Amount']}
                />
                <Line type="monotone" dataKey="amount" stroke="#6D28D9" strokeWidth={2} dot={{ fill: '#6D28D9' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 hover:shadow-card-hover transition-shadow duration-200">
          <h3 className="text-sm font-semibold text-text mb-4">Industry distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INDUSTRY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {INDUSTRY_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-slate-100 p-5 hover:shadow-card-hover transition-shadow duration-200">
          <h3 className="text-sm font-semibold text-text mb-4">Monthly investments</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_INVESTMENTS} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="count" fill="#6D28D9" radius={[4, 4, 0, 0]} name="Deals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-5 hover:shadow-card-hover transition-shadow duration-200">
          <h3 className="text-sm font-semibold text-text mb-4">Recent activity</h3>
          <ul className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-text font-medium truncate">{item.text}</p>
                  <p className="text-xs text-text-muted">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trending Startups */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-text">Trending Startups</h2>
            <p className="text-text-muted text-sm mt-0.5">Most viewed this week</p>
          </div>
        </div>
        <div className="overflow-x-auto pb-2 -mx-1">
          <div className="flex gap-4 min-w-max px-1">
            {trendingStartups.map((startup) => (
              <div key={startup.id} className="w-72 shrink-0">
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Validated Startups grid */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
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
    </div>
  )
}

export default InvestorDashboard
