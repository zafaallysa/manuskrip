import { createContext, useContext, useEffect, useState } from 'react'

const REQUESTS_KEY = 'manuskrip_requests'

const RequestsContext = createContext(null)

function loadRequests() {
  try {
    return JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]')
  } catch {
    return []
  }
}

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(loadRequests)

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests))
  }, [requests])

  const addRequest = ({ folioId, folioTitle, username, name, note }) => {
    // Prevent duplicate pending requests
    const exists = requests.some(
      (r) => r.folioId === folioId && r.username === username && r.status === 'pending',
    )
    if (exists) return { ok: false, error: 'Permintaan akses sudah dikirim.' }

    const request = {
      id: `req-${Date.now()}`,
      folioId,
      folioTitle,
      username,
      name,
      note,
      status: 'pending',
      date: new Date().toISOString(),
    }
    setRequests((prev) => [request, ...prev])
    return { ok: true }
  }

  const setStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const hasAccess = (folio, user) => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (folio.access === 'public') return true
    if (folio.access === 'request') {
      return requests.some(
        (r) => r.folioId === folio.id && r.username === user.username && r.status === 'approved',
      )
    }
    return false
  }

  const pendingCount = requests.filter((r) => r.status === 'pending').length

  return (
    <RequestsContext.Provider value={{ requests, addRequest, setStatus, hasAccess, pendingCount }}>
      {children}
    </RequestsContext.Provider>
  )
}

export function useRequests() {
  return useContext(RequestsContext)
}