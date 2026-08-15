const VISITS_KEY = 'manuskrip_visits'

function todayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function loadVisits() {
  try {
    return JSON.parse(localStorage.getItem(VISITS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveVisits(visits) {
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
}

let recordedInSession = false

// Record a visit. Called once per page load (per browser session).
export function recordVisit() {
  if (recordedInSession) return
  recordedInSession = true
  const visits = loadVisits()
  const today = todayKey()
  visits[today] = (visits[today] || 0) + 1
  saveVisits(visits)
}

export function getVisitStats() {
  const visits = loadVisits()

  const total = Object.values(visits).reduce((a, b) => a + b, 0)
  const today = visits[todayKey()] || 0

  const last7 = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = todayKey(d)
    last7.push({ label: key.slice(5), count: visits[key] || 0 })
  }

  const max = Math.max(...last7.map((d) => d.count), 1)
  return { total, today, last7, max }
}

export function clearVisits() {
  localStorage.removeItem(VISITS_KEY)
  recordedInSession = false
}