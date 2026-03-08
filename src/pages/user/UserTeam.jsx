/**
 * User Team - Browse teams, view details, join a team → go to Live Chat.
 * Shows "Recommended for you" when user accepted AI suggestions (Option C).
 */
import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { getCurrentUser, updateCurrentUser } from '../../lib/authStorage'
import { MOCK_TEAMS } from '../../data/teams'
import { delay, SAVE_DELAY_MS } from '../../lib/delay'

function UserTeam() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  if (!user?.hasCompletedProfile) {
    return <Navigate to="/user/profile" replace />
  }
  const recommendedTeamIds = user?.recommendedTeamIds || []
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [joining, setJoining] = useState(false)

  const recommendedTeams = MOCK_TEAMS.filter((t) => recommendedTeamIds.includes(t.id))
  const otherTeams = MOCK_TEAMS.filter((t) => !recommendedTeamIds.includes(t.id))

  const handleJoinTeam = async () => {
    if (!selectedTeam) return
    setJoining(true)
    await delay(SAVE_DELAY_MS)
    updateCurrentUser({ needTeam: false, joinedTeamId: selectedTeam.id, recommendedTeamIds: [] })
    setJoining(false)
    navigate('/user/chat')
  }

  if (selectedTeam) {
    return (
      <div className="max-w-2xl">
        <button
          type="button"
          onClick={() => setSelectedTeam(null)}
          className="text-sm font-medium text-primary hover:underline mb-4"
        >
          ← Back to teams
        </button>
        <div className="rounded-2xl border border-brand-dark/30 bg-white shadow-card overflow-hidden">
          <div className="p-6 border-b border-brand-dark/20 bg-brand/30">
            <h1 className="text-2xl font-bold text-text">{selectedTeam.name}</h1>
            <p className="text-primary font-medium text-sm mt-0.5">{selectedTeam.tagline}</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">What this team does</h2>
              <p className="text-text">{selectedTeam.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-text-muted">People:</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                {selectedTeam.memberCount} members
              </span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">Skill set</h2>
              <div className="flex flex-wrap gap-2">
                {selectedTeam.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-brand border border-brand-dark/30 text-sm text-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">Members</h2>
              <ul className="space-y-2">
                {selectedTeam.members.map((m) => (
                  <li key={m.name} className="flex justify-between items-center py-2 border-b border-brand-dark/10 last:border-0">
                    <span className="font-medium text-text">{m.name}</span>
                    <span className="text-sm text-text-muted">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={handleJoinTeam}
              disabled={joining}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60"
            >
              {joining ? 'Joining...' : 'Join team'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderTeamCard = (team) => (
    <button
      key={team.id}
      type="button"
      onClick={() => setSelectedTeam(team)}
      className="text-left p-5 rounded-2xl border border-brand-dark/30 bg-white shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all"
    >
      <h2 className="font-semibold text-text text-lg">{team.name}</h2>
      <p className="text-sm text-primary mt-0.5">{team.tagline}</p>
      <p className="text-sm text-text-muted mt-2 line-clamp-2">{team.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2.5 py-1 rounded-lg bg-brand text-text text-xs font-medium">
          {team.memberCount} members
        </span>
        {team.skills.slice(0, 3).map((s) => (
          <span key={s} className="px-2.5 py-1 rounded-lg bg-brand-dark/20 text-text-muted text-xs">
            {s}
          </span>
        ))}
      </div>
    </button>
  )

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">Find a team</h1>
      <p className="text-text-muted mb-6">
        Choose a team to view details, then join to start chatting and collaborating.
      </p>

      {recommendedTeams.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text mb-3">Recommended for you</h2>
          <p className="text-sm text-text-muted mb-4">
            These teams match your profile. Pick one to see details and join.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTeams.map(renderTeamCard)}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold text-text mb-3">
        {recommendedTeams.length > 0 ? 'All teams' : 'Teams'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(recommendedTeams.length > 0 ? otherTeams : MOCK_TEAMS).map(renderTeamCard)}
      </div>
    </div>
  )
}

export default UserTeam
