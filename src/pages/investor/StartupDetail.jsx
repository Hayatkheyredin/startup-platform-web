/**
 * StartupDetail - Full business view (same data as expert-approved list).
 */
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addToInterests, recordInvestment } from '../../lib/investorStorage'
import { getBusinessesForInvestment } from '../../lib/applicationsData'
import Modal from '../../components/ui/Modal'

function StartupDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [investAmount, setInvestAmount] = useState('')

  const businesses = useMemo(() => getBusinessesForInvestment(), [])
  const fromList = businesses.find((b) => b.id === id)
  const displayStartup = fromList
    ? {
        id: fromList.id,
        name: fromList.name,
        industry: fromList.industry,
        stage: fromList.stage,
        fundingNeeded: fromList.fundingNeeded || '$50K',
        description: fromList.shortDescription || '',
        teamMembers: fromList.founderName ? [{ name: fromList.founderName, role: 'Founder', email: fromList.founderEmail }] : [],
        aiValidationReport: { score: 80, summary: 'Approved by experts for investment.', risks: [], recommendations: [] },
      }
    : {
        id,
        name: 'Business',
        industry: 'Other',
        stage: 'Seed',
        fundingNeeded: '$50K',
        description: 'No description.',
        teamMembers: [],
        aiValidationReport: null,
      }

  const handleAddToInterests = () => {
    try {
      addToInterests(id)
      alert('Added to your interests!')
    } catch (err) {
      alert(err.message || 'Failed to add')
    }
  }

  const handleRecordInvestment = () => {
    try {
      recordInvestment(id, { amount: investAmount })
      setShowInvestModal(false)
      setInvestAmount('')
      alert('Investment recorded!')
    } catch (err) {
      alert(err.message || 'Failed to record')
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-primary font-medium hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="bg-primary rounded-card p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold mb-2">{displayStartup.name}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/20">
                {displayStartup.industry}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent text-white">
                {displayStartup.stage}
              </span>
            </div>
            <p className="text-white/90 text-sm mb-2">{displayStartup.description}</p>
            <p className="text-sm">
              <span className="font-medium">Funding needed:</span> {displayStartup.fundingNeeded}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAddToInterests}
              className="px-4 py-2 rounded-btn font-medium bg-accent text-white hover:bg-accent-hover transition-smooth"
            >
              Add to Interests
            </button>
            <button
              type="button"
              onClick={() => setShowInvestModal(true)}
              className="px-4 py-2 rounded-btn font-medium bg-white/20 border border-white/40 text-white hover:bg-white/30 transition-smooth"
            >
              Record Investment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-card shadow-card border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-semibold text-text">Team Members</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {(displayStartup.teamMembers || []).map((member, i) => (
              <li key={i} className="px-4 py-3">
                <p className="font-medium text-text">{member.name}</p>
                <p className="text-sm text-text-muted">{member.role}</p>
                <p className="text-xs text-text-muted">{member.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-card shadow-card border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-semibold text-text">AI Validation Report</h2>
          </div>
          <div className="p-4">
            {displayStartup.aiValidationReport ? (
              <>
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-accent/20 text-accent">
                    Score: {displayStartup.aiValidationReport.score}/100
                  </span>
                </div>
                <p className="text-sm text-text-muted mb-3">{displayStartup.aiValidationReport.summary}</p>
                <p className="text-sm font-medium text-text mb-1">Risks</p>
                <ul className="text-sm text-text-muted list-disc list-inside mb-3">
                  {(displayStartup.aiValidationReport.risks || []).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-text mb-1">Recommendations</p>
                <ul className="text-sm text-text-muted list-disc list-inside">
                  {(displayStartup.aiValidationReport.recommendations || []).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-text-muted">No validation report available.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showInvestModal}
        onHide={() => setShowInvestModal(false)}
        title="Record Investment"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowInvestModal(false)}
              className="px-4 py-2 rounded-btn text-sm font-medium bg-slate-100 text-text hover:bg-slate-200 transition-smooth"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRecordInvestment}
              className="px-4 py-2 rounded-btn text-sm font-medium bg-primary text-white hover:bg-primary-hover transition-smooth"
            >
              Confirm
            </button>
          </>
        }
      >
        <label className="block text-sm font-medium text-text mb-1.5">Amount ($)</label>
        <input
          type="number"
          placeholder="e.g. 10000"
          value={investAmount}
          onChange={(e) => setInvestAmount(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </Modal>
    </div>
  )
}

export default StartupDetail
