/**
 * Investor interests and investments - stored in localStorage (no backend required).
 * Used when recording "Add to Interests" and "Record Investment" from the investor dashboard.
 */
const INTERESTS_KEY = 'melika_investor_interests'
const INVESTMENTS_KEY = 'melika_investor_investments'

function getStoredInterests() {
  try {
    const raw = localStorage.getItem(INTERESTS_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function saveInterests(list) {
  localStorage.setItem(INTERESTS_KEY, JSON.stringify(list))
}

function getStoredInvestments() {
  try {
    const raw = localStorage.getItem(INVESTMENTS_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function saveInvestments(list) {
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(list))
}

/** Add a business ID to the investor's interest list. */
export function addToInterests(businessId) {
  const list = getStoredInterests()
  const id = String(businessId || '').trim()
  if (!id) return
  if (list.includes(id)) return
  list.push(id)
  saveInterests(list)
}

/** Get list of business IDs the investor is interested in. */
export function getInterests() {
  return getStoredInterests()
}

/** Record an investment (businessId + amount). */
export function recordInvestment(businessId, investmentData = {}) {
  const list = getStoredInvestments()
  const id = String(businessId || '').trim()
  if (!id) return
  const amount = investmentData.amount != null ? String(investmentData.amount) : ''
  list.push({
    businessId: id,
    amount,
    investedAmount: amount ? `$${Number(amount).toLocaleString()}` : 'N/A',
    date: new Date().toISOString().slice(0, 10),
  })
  saveInvestments(list)
}

/** Get list of investments { businessId, amount, investedAmount, date }. */
export function getInvestments() {
  return getStoredInvestments()
}
