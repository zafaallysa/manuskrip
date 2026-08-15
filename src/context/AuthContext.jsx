import { createContext, useContext, useState } from 'react'

const SESSION_KEY = 'manuskrip_session'

export const USERS = {
  admin: { username: 'admin', password: 'admin123', name: 'Administrator', role: 'admin' },
  user: { username: 'user', password: 'user123', name: 'Researcher', role: 'user' },
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)

  const login = (username, password) => {
    const account = USERS[username.toLowerCase()]
    if (account && account.password === password) {
      const session = { username: account.username, name: account.name, role: account.role }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setUser(session)
      return { ok: true, user: session }
    }
    return { ok: false, error: 'Username atau password salah.' }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}