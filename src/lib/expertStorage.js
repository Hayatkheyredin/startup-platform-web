/**
 * Expert accounts - assigned by platform (anonymous). Email + password to access dashboard.
 */
const EXPERTS_KEY = 'melika_experts'
const CURRENT_EXPERT_KEY = 'melika_current_expert'

const DEFAULT_EXPERTS = [
  { email: 'expert@melika.com', password: 'Expert123!', name: 'Expert 1' },
]

function getStoredExperts() {
  try {
    const raw = localStorage.getItem(EXPERTS_KEY)
    const list = raw ? JSON.parse(raw) : []
    if (list.length === 0) {
      localStorage.setItem(EXPERTS_KEY, JSON.stringify(DEFAULT_EXPERTS))
      return DEFAULT_EXPERTS
    }
    return list
  } catch {
    return DEFAULT_EXPERTS
  }
}

export function findExpertByEmail(email) {
  const e = (email || '').toString().trim().toLowerCase()
  const defaultMatch = DEFAULT_EXPERTS.find((x) => (x.email || '').toLowerCase() === e)
  if (defaultMatch) return defaultMatch
  return getStoredExperts().find((x) => (x.email || '').toLowerCase() === e)
}

export function setCurrentExpert(expert) {
  if (expert) localStorage.setItem(CURRENT_EXPERT_KEY, JSON.stringify(expert))
  else localStorage.removeItem(CURRENT_EXPERT_KEY)
}

export function getCurrentExpert() {
  try {
    const raw = localStorage.getItem(CURRENT_EXPERT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function logoutExpert() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userRole')
  setCurrentExpert(null)
}
