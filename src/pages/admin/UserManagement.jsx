/**
 * UserManagement - Admin page to list all users and block/unblock.
 */
import React, { useState, useEffect } from 'react'
import { getUsers, updateUserStatus } from '../../services/api'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const mockUsers = [
    { id: '1', name: 'Jane Doe', email: 'jane@example.com', role: 'founder', blocked: false, registeredAt: '2024-01-10' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'founder', blocked: false, registeredAt: '2024-01-12' },
    { id: '3', name: 'John Investor', email: 'john@example.com', role: 'investor', blocked: false, registeredAt: '2024-01-15' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers()
        setUsers(data.users || data || [])
      } catch (err) {
        setUsers(mockUsers)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const displayUsers = users.length > 0 ? users : mockUsers

  const handleToggleBlock = async (userId, currentlyBlocked) => {
    setActionLoading(userId)
    try {
      await updateUserStatus(userId, !currentlyBlocked)
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, blocked: !currentlyBlocked } : u))
      )
    } catch (err) {
      alert(err.message || 'Failed to update')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text">User Management</h1>
        <p className="text-text-muted text-sm mt-0.5">List of all registered users</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Registered</th>
                <th className="text-left px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-text">{user.name}</td>
                  <td className="px-4 py-3 text-text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-text-muted">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.blocked ? (
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-700">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-success/20 text-success">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{user.registeredAt || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={actionLoading === user.id}
                      onClick={() => handleToggleBlock(user.id, user.blocked)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth disabled:opacity-50 ${
                        user.blocked
                          ? 'bg-secondary text-white hover:bg-secondary-hover'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {actionLoading === user.id ? '...' : user.blocked ? 'Unblock' : 'Block'}
                    </button>
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

export default UserManagement
