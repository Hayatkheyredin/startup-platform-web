/**
 * Simulated latency for demo (no backend). Use to mimic network/API delay.
 * @param {number} ms - Minimum delay in milliseconds
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Typical "save" latency (e.g. profile, join) */
export const SAVE_DELAY_MS = 900
/** Typical "auth" latency (login, signup) */
export const AUTH_DELAY_MS = 1200
/** AI/API call minimum visible latency */
export const AI_MIN_DELAY_MS = 1500
/** Short transition (e.g. after Accept) */
export const SHORT_DELAY_MS = 400
