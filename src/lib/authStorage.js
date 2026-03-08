/**
 * Client-side auth & user storage (MVP). Replace with real API later.
 */
const USERS_KEY = 'melika_users'
const CURRENT_KEY = 'melika_current_user'

export function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUser(user) {
  if (!user || !user.email) return null
  const users = getStoredUsers()
  const email = (user.email || '').toString().trim().toLowerCase()
  const existing = users.find((u) => (u.email || '').toLowerCase() === email)
  const toSave = {
    ...user,
    email: email,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const next = existing
    ? users.map((u) => ((u.email || '').toLowerCase() === email ? toSave : u))
    : [...users, toSave]
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(next))
  } catch (e) {
    console.error('authStorage.saveUser', e)
    throw new Error('Could not save account. Try again.')
  }
  return toSave
}

export function findUserByEmail(email) {
  return getStoredUsers().find((u) => u.email.toLowerCase() === (email || '').toLowerCase())
}

export function setCurrentUser(user) {
  if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user))
  else localStorage.removeItem(CURRENT_KEY)
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function updateCurrentUser(updates) {
  const current = getCurrentUser()
  if (!current) return null
  const next = { ...current, ...updates, updatedAt: new Date().toISOString() }
  setCurrentUser(next)
  saveUser(next)
  return next
}

export function logout() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userRole')
  setCurrentUser(null)
}
