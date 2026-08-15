import { useAuth } from '../context/AuthContext'

export default function TopNav({ navigate }) {
  const { user, logout } = useAuth()

  const go = (route, section) => {
    if (route === 'home') {
      navigate('home')
      setTimeout(() => {
        if (section) {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 0)
    } else {
      navigate(route)
    }
  }

  return (
    <nav className="bg-surface w-full top-0 sticky border-b border-outline-variant/20 shadow-sm z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <button
          onClick={() => go('home')}
          className="font-display text-display-lg-mobile md:text-display-lg text-primary"
        >
          Manuskrip
        </button>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => go('home', 'navigator')}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-300 px-3 py-2 rounded text-body-md"
          >
            Collections
          </button>
          <button
            onClick={() => go('home', 'folios')}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-300 px-3 py-2 rounded text-body-md"
          >
            Folios
          </button>
          <button
            onClick={() => go('home', 'history')}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-300 px-3 py-2 rounded text-body-md"
          >
            Scholars
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => go('dashboard')}
              className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-300 px-3 py-2 rounded text-body-md"
            >
              Dashboard
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-body-md text-primary font-medium leading-tight">{user.name}</span>
                <span className="text-caption text-on-surface-variant uppercase tracking-widest leading-tight">
                  {user.role}
                </span>
              </div>
              {user.role === 'admin' && (
                <button
                  onClick={() => go('dashboard')}
                  className="bg-primary text-on-primary px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={logout}
                className="border border-secondary text-primary px-5 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                Keluar
              </button>
            </>
          ) : (
            <button
              onClick={() => go('login')}
              className="bg-primary-container text-secondary-fixed px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}