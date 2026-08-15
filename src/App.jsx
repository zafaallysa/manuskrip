import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ManuscriptsProvider } from './context/ManuscriptsContext'
import { RequestsProvider } from './context/RequestsContext'
import { recordVisit } from './lib/visits'
import TopNav from './components/TopNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Viewer from './pages/Viewer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function parseHash() {
  const h = window.location.hash.replace(/^#\/?/, '')
  const [route, param] = h.split('/')
  return { route: route || 'home', param: param || '' }
}

function Shell() {
  const { user } = useAuth()
  const [location, setLocation] = useState(parseHash)

  useEffect(() => {
    const onHashChange = () => setLocation(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    recordVisit()
  }, [])

  const navigate = (route, param = '') => {
    window.location.hash = `/${route}${param ? `/${param}` : ''}`
  }

  const protectedRoute = location.route === 'dashboard' && (!user || user.role !== 'admin')

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <TopNav navigate={navigate} />
      <main className="flex-grow">
        {location.route === 'login' ? (
          <Login navigate={navigate} />
        ) : protectedRoute || location.route === 'dashboard' ? (
          <Dashboard navigate={navigate} />
        ) : location.route === 'viewer' ? (
          <Viewer folioId={location.param} navigate={navigate} />
        ) : (
          <Home navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ManuscriptsProvider>
        <RequestsProvider>
          <Shell />
        </RequestsProvider>
      </ManuscriptsProvider>
    </AuthProvider>
  )
}