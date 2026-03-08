/**
 * API Service - Centralized API calls for MELIKA (women-led business platform: grant or investment).
 * Contains placeholder URLs - replace with actual backend endpoints when ready.
 */

// Base URL for API - update when backend is deployed (use VITE_API_URL in .env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.womenstartup.com/v1'

/**
 * Helper for fetch requests with error handling
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message || 'Request failed')
    return data
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

// ============ AUTH API ============

/**
 * Login - authenticate user (investor or admin)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{token, user, role}>}
 */
export async function login(email, password) {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

/**
 * Forgot Password - request password reset
 * @param {string} email - User email
 */
export async function forgotPassword(email) {
  return fetchApi('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

// ============ STARTUP API ============

/**
 * Get all validated businesses selected for investment (for Investor Dashboard)
 * @param {Object} filters - { industry, fundingNeeded, stage }
 */
export async function getStartups(filters = {}) {
  const params = new URLSearchParams(filters).toString()
  return fetchApi(`/startups?${params}`)
}

/**
 * Get single business by ID (for Business Detail page)
 * @param {string} id - Business ID
 */
export async function getStartupById(id) {
  return fetchApi(`/startups/${id}`)
}

/**
 * Get businesses for admin monitoring (all statuses)
 */
export async function getStartupsForAdmin() {
  return fetchApi('/admin/startups')
}

// ============ INVESTMENT API ============

/**
 * Get investor's tracked/invested businesses
 */
export async function getInvestorInvestments() {
  return fetchApi('/investor/investments')
}

/**
 * Add business to investor's interest list
 * @param {string} startupId - Business ID (API may still use startupId)
 */
export async function addToInterests(startupId) {
  return fetchApi('/investor/interests', {
    method: 'POST',
    body: JSON.stringify({ startupId }),
  })
}

/**
 * Record investment
 * @param {string} startupId - Business ID (API may still use startupId)
 * @param {Object} investmentData - Amount, terms, etc.
 */
export async function recordInvestment(startupId, investmentData) {
  return fetchApi(`/investor/investments/${startupId}`, {
    method: 'POST',
    body: JSON.stringify(investmentData),
  })
}

// ============ ADMIN API ============

/**
 * Get all registered users
 */
export async function getUsers() {
  return fetchApi('/admin/users')
}

/**
 * Block/unblock user
 * @param {string} userId - User ID
 * @param {boolean} blocked - Block status
 */
export async function updateUserStatus(userId, blocked) {
  return fetchApi(`/admin/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ blocked }),
  })
}

/**
 * Get platform analytics
 */
export async function getPlatformAnalytics() {
  return fetchApi('/admin/analytics')
}
