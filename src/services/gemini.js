/**
 * Gemini API - Team suggestions from user profile.
 * Uses VITE_GEMINI_API_KEY. Get key: https://aistudio.google.com/apikey
 */
import { delay, AI_MIN_DELAY_MS } from '../lib/delay'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
// Use a current model: gemini-1.5-flash was retired; 2.5-flash is supported
const GEMINI_MODEL = 'gemini-2.5-flash'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

/**
 * Parse Gemini response into an array of keyword strings (for matching against teams).
 * Accepts JSON array or comma-separated list.
 */
function parseKeywordsFromResponse(text) {
  if (!text || typeof text !== 'string') return []
  let str = text.trim()
  const codeBlock = str.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlock) str = codeBlock[1].trim()
  // Try JSON array first
  const start = str.indexOf('[')
  if (start !== -1) {
    let depth = 0
    let end = -1
    let inString = null
    for (let i = start; i < str.length; i++) {
      const c = str[i]
      if (inString) {
        if (c === '\\' && i + 1 < str.length) { i++; continue }
        if (c === inString) inString = null
        continue
      }
      if (c === '"' || c === "'") inString = c
      else if (c === '[') depth++
      else if (c === ']') { depth--; if (depth === 0) { end = i; break } }
    }
    if (end !== -1) {
      try {
        const parsed = JSON.parse(str.slice(start, end + 1))
        if (Array.isArray(parsed)) {
          return parsed.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.trim().toLowerCase()).slice(0, 10)
        }
      } catch { /* fall through */ }
    }
  }
  // Fallback: comma-separated
  return str.split(/[,;|\n]/).map((s) => s.replace(/^["'\s]+|["'\s]+$/g, '').trim().toLowerCase()).filter(Boolean).slice(0, 10)
}

/**
 * Score a team by how many keywords appear in name, tagline, description, skills.
 */
function scoreTeam(team, keywords) {
  if (!keywords.length) return 0
  const text = [
    team.name,
    team.tagline,
    team.description || '',
    ...(team.skills || []),
  ].join(' ').toLowerCase()
  return keywords.filter((kw) => text.includes(kw)).length
}

/**
 * Return top 1–3 team IDs from teams that best match the given keywords.
 */
function matchTeamsByKeywords(teams, keywords) {
  if (!keywords.length) return [teams[0]?.id, teams[1]?.id].filter(Boolean).slice(0, 3)
  const scored = teams.map((t) => ({ id: t.id, score: scoreTeam(t, keywords) }))
  scored.sort((a, b) => b.score - a.score)
  const top = scored.filter((s) => s.score > 0).slice(0, 3)
  if (top.length > 0) return top.map((s) => s.id)
  return [teams[0]?.id, teams[1]?.id].filter(Boolean).slice(0, 3)
}

/**
 * Ask Gemini to return 1–3 team IDs that best match the user profile.
 * Includes minimum simulated latency so loading state is visible.
 */
export async function getTeamSuggestions(profile, teams) {
  const minDelayPromise = delay(AI_MIN_DELAY_MS)

  let result
  if (!GEMINI_API_KEY) {
    await minDelayPromise
    console.warn('VITE_GEMINI_API_KEY not set; returning default suggestions.')
    result = [teams[0]?.id, teams[1]?.id].filter(Boolean).slice(0, 3)
    return result
  }

  const prompt = `You are a team-matching assistant for a women-led startup platform. Based on the user profile below, suggest 4-8 short keywords that describe the kind of team that would fit them (e.g. pitch, storytelling, marketing, food, beauty, catering, finance, operations, retail). Reply with ONLY a JSON array of keyword strings, no other text. Example: ["pitch","storytelling","marketing"]

User profile:
${JSON.stringify(profile, null, 0)}

Reply with only the JSON array of keywords.`

  const apiPromise = fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || `Gemini API error: ${res.status}`)
      }
      return res.json()
    })
    .then((data) => {
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (!text) throw new Error('No response from Gemini')
      const keywords = parseKeywordsFromResponse(text)
      return matchTeamsByKeywords(teams, keywords)
    })

  result = await Promise.all([apiPromise, minDelayPromise]).then(([ids]) => ids)
  return result
}
