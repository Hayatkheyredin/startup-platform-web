/**
 * Applications = user registrations (role 'user') with profile. Same data for experts and investors.
 * Mock entries use real Ethiopian girl names.
 */
import { getStoredUsers, saveUser } from './authStorage'

// Mock applications with Ethiopian girl names (for demo when few real users)
const MOCK_APPLICATIONS = [
  { email: 'amele@example.com', fullName: 'Amele Worku', role: 'user', status: 'pending', profile: { businessName: 'Green Tukul', description: 'Eco-friendly traditional housing materials.', industry: 'Sustainability', stage: 'Idea' }, needTeam: false, studentOrWorker: 'worker', fieldOrWork: 'Construction', createdAt: '2024-01-15T10:00:00.000Z' },
  { email: 'bethlehem@example.com', fullName: 'Bethlehem Tesfaye', role: 'user', status: 'pending', profile: { businessName: 'Selam Tech', description: 'Mobile apps for local SMEs.', industry: 'Technology', stage: 'MVP' }, needTeam: true, studentOrWorker: 'worker', fieldOrWork: 'Software', createdAt: '2024-01-14T09:00:00.000Z' },
  { email: 'eden@example.com', fullName: 'Eden Bekele', role: 'user', status: 'pending', profile: { businessName: 'Hidar Foods', description: 'Nutritious ready-to-eat meals for schools.', industry: 'Healthcare', stage: 'Early traction' }, needTeam: false, studentOrWorker: 'student', fieldOrWork: 'Nutrition', createdAt: '2024-01-13T14:00:00.000Z' },
  { email: 'hana@example.com', fullName: 'Hana Mohammed', role: 'user', status: 'approved_for_investment', profile: { businessName: 'Kebena Crafts', description: 'Handwoven textiles and accessories.', industry: 'Other', stage: 'Seed' }, needTeam: false, studentOrWorker: 'worker', fieldOrWork: 'Handicrafts', createdAt: '2024-01-12T11:00:00.000Z' },
  { email: 'kalkidan@example.com', fullName: 'Kalkidan Desta', role: 'user', status: 'approved_for_grant', profile: { businessName: 'Tsehay Solar', description: 'Solar lanterns for off-grid households.', industry: 'Sustainability', stage: 'Idea' }, needTeam: true, studentOrWorker: 'worker', fieldOrWork: 'Energy', createdAt: '2024-01-11T08:00:00.000Z' },
  { email: 'lidia@example.com', fullName: 'Lidia Tadesse', role: 'user', status: 'rejected', profile: { businessName: 'Abay Consulting', description: 'Business advisory for women entrepreneurs.', industry: 'Finance', stage: 'MVP' }, needTeam: false, studentOrWorker: 'worker', fieldOrWork: 'Consulting', createdAt: '2024-01-10T16:00:00.000Z' },
  { email: 'makeda@example.com', fullName: 'Makeda Hailu', role: 'user', status: 'pending', profile: { businessName: 'Yebuna Learning', description: 'Online courses in local languages.', industry: 'Education', stage: 'Seed' }, needTeam: false, studentOrWorker: 'student', fieldOrWork: 'Education', createdAt: '2024-01-09T12:00:00.000Z' },
  { email: 'nardos@example.com', fullName: 'Nardos Abebe', role: 'user', status: 'approved_for_investment', profile: { businessName: 'Rahel Health', description: 'Maternal health telemedicine.', industry: 'Healthcare', stage: 'Early traction' }, needTeam: false, studentOrWorker: 'worker', fieldOrWork: 'Healthcare', createdAt: '2024-01-08T07:00:00.000Z' },
  { email: 'rahel@example.com', fullName: 'Rahel Getachew', role: 'user', status: 'pending', profile: { businessName: 'Buna Express', description: 'Delivery of fresh coffee to offices.', industry: 'Technology', stage: 'MVP' }, needTeam: true, studentOrWorker: 'worker', fieldOrWork: 'Logistics', createdAt: '2024-01-07T13:00:00.000Z' },
  { email: 'selam@example.com', fullName: 'Selam Negash', role: 'user', status: 'pending', profile: { businessName: 'Tiru Fashion', description: 'Modern designs using traditional fabrics.', industry: 'Other', stage: 'Idea' }, needTeam: false, studentOrWorker: 'student', fieldOrWork: 'Fashion', createdAt: '2024-01-06T10:30:00.000Z' },
  { email: 'tsion@example.com', fullName: 'Tsion Alemu', role: 'user', status: 'approved_for_investment', profile: { businessName: 'Teff Plus', description: 'Teff-based snacks for nutrition.', industry: 'Healthcare', stage: 'Seed' }, needTeam: false, studentOrWorker: 'worker', fieldOrWork: 'Food', createdAt: '2024-01-05T09:00:00.000Z' },
  { email: 'yordanos@example.com', fullName: 'Yordanos Kebede', role: 'user', status: 'pending', profile: { businessName: 'Zemen Insurance', description: 'Micro-insurance for farmers.', industry: 'Finance', stage: 'MVP' }, needTeam: true, studentOrWorker: 'worker', fieldOrWork: 'Insurance', createdAt: '2024-01-04T15:00:00.000Z' },
]

function normalizeStatus(s) {
  if (!s) return 'pending'
  const v = String(s).toLowerCase()
  if (['approved_for_grant', 'approved_for_investment', 'rejected', 'pending'].includes(v)) return v
  if (v === 'approved') return 'approved_for_investment'
  return 'pending'
}

/**
 * All applications (real users with role 'user' + mock). Used by expert dashboard.
 */
export function getApplications() {
  const stored = getStoredUsers().filter((u) => u.role === 'user')
  const byEmail = new Map(stored.map((u) => [u.email.toLowerCase(), { ...u, status: normalizeStatus(u.status) }]))
  MOCK_APPLICATIONS.forEach((m) => {
    const e = m.email.toLowerCase()
    if (!byEmail.has(e)) byEmail.set(e, { ...m, status: normalizeStatus(m.status) })
  })
  return Array.from(byEmail.values()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
}

/**
 * Businesses selected for investment — single source for both expert and investor views.
 * Used by: InvestorDashboard, StartupList (investor), ExpertDashboard "Allowed for investors", StartupDetail.
 */
export function getBusinessesForInvestment() {
  const applications = getApplications().filter((a) => a.status === 'approved_for_investment')
  return applications.map((a) => {
    const p = a.profile || {}
    return {
      id: (a.email || a.id || '').replace(/[^a-z0-9]/gi, '_'),
      email: a.email,
      name: p.businessName || p.startupName || a.fullName || 'Business',
      industry: p.industry || 'Other',
      stage: p.stage || 'Seed',
      fundingNeeded: '$50K',
      shortDescription: p.description || p.pitch || 'No description.',
      founderEmail: a.email,
      founderName: a.fullName,
    }
  })
}

/**
 * Update application status (expert action). Persists to stored users when real user.
 */
export function updateApplicationStatus(email, status) {
  const applications = getApplications()
  const app = applications.find((a) => (a.email || '').toLowerCase() === (email || '').toLowerCase())
  if (!app) return false
  const normalized = normalizeStatus(status)
  const isMock = MOCK_APPLICATIONS.some((m) => (m.email || '').toLowerCase() === (email || '').toLowerCase() && !getStoredUsers().some((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase()))
  if (!isMock) {
    saveUser({ ...app, status: normalized })
    return true
  }
  // Mock: store in localStorage under melika_users so it persists and appears for investors
  const stored = getStoredUsers()
  const existing = stored.find((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase())
  if (existing) {
    saveUser({ ...existing, status: normalized })
  } else {
    saveUser({ ...app, status: normalized, password: 'mock' })
  }
  return true
}
