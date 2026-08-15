import { createContext, useContext, useEffect, useState } from 'react'
import { folios as baseFolios } from '../data/folios'

const STORAGE_KEY = 'manuskrip_folios'

const ManuscriptsContext = createContext(null)

function loadAdded() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function ManuscriptsProvider({ children }) {
  const [added, setAdded] = useState(loadAdded)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(added))
  }, [added])

  const folios = [...added, ...baseFolios.map((f) => ({ ...f, access: f.access || 'public' }))]

  const addFolio = (folio) => {
    setAdded((prev) => [folio, ...prev])
  }

  const removeFolio = (id) => {
    setAdded((prev) => prev.filter((f) => f.id !== id))
  }

  const getFolio = (id) => folios.find((f) => f.id === id)

  return (
    <ManuscriptsContext.Provider value={{ folios, addFolio, removeFolio, getFolio }}>
      {children}
    </ManuscriptsContext.Provider>
  )
}

export function useManuscripts() {
  return useContext(ManuscriptsContext)
}