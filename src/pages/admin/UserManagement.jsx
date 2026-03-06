/**
 * UserManagement - Admin page to list all users and block/unblock.
 */
import React, { useState, useEffect } from 'react'
import { Table, Button, Spinner, Alert, Badge } from 'react-bootstrap'
import { getUsers, updateUserStatus } from '../../services/api'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers()
        setUsers(data.users || data || [])
      } catch (err) {
        setError(err.message || 'Failed to load users')
        setUsers(mockUsers) // Use mock data when API unavailable
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const mockUsers = [
    { id: '1', name: 'Jane Doe', email: 'jane@example.com', role: 'founder', blocked: false, registeredAt: '2024-01-10' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'founder', blocked: false, registeredAt: '2024-01-12' },
    { id: '3', name: 'John Investor', email: 'john@example.com', role: 'investor', blocked: false, registeredAt: '2024-01-15' },
  ]

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
      <div className="mb-4">
        <h1 className="h3 fw-bold text-charcoal">User Management</h1>
        <p className="text-muted mb-0">List of all registered users</p>
      </div>

      {error && <Alert variant="warning">Using demo data. {error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: 'var(--color-accent)' }} />
        </div>
      ) : (
        <Table responsive bordered hover>
          <thead style={{ backgroundColor: 'var(--color-charcoal)', color: 'white' }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg="secondary">{user.role}</Badge>
                </td>
                <td>
                  {user.blocked ? (
                    <Badge bg="danger">Blocked</Badge>
                  ) : (
                    <Badge bg="success">Active</Badge>
                  )}
                </td>
                <td>{user.registeredAt || 'N/A'}</td>
                <td>
                  <Button
                    size="sm"
                    variant={user.blocked ? 'success' : 'danger'}
                    className="rounded-0"
                    disabled={actionLoading === user.id}
                    onClick={() => handleToggleBlock(user.id, user.blocked)}
                  >
                    {actionLoading === user.id ? '...' : user.blocked ? 'Unblock' : 'Block'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserManagement
