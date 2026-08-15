import { useState } from 'react'
import { useAuth, USERS } from '../context/AuthContext'
import DecorativeDivider from '../components/DecorativeDivider'

export default function Login({ navigate }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = login(username, password)
    if (res.ok) {
      navigate('home')
    } else {
      setError(res.error)
    }
  }

  const quick = (key) => {
    setUsername(USERS[key].username)
    setPassword(USERS[key].password)
    setError('')
  }

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 flex flex-col items-center">
      <div className="w-full max-w-md bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20">
        <div className="text-center mb-8">
          <h1 className="font-display text-headline-md text-primary mb-2">Masuk ke Arsip</h1>
          <p className="text-body-md text-on-surface-variant">Akses arsip digital manuskrip Al-Qur&apos;an.</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-caption text-on-surface-variant uppercase tracking-widest">Username</label>
            <div className="relative border-b border-outline-variant pb-2 flex items-center">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">person</span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 w-full text-body-md placeholder:text-outline-variant"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-caption text-on-surface-variant uppercase tracking-widest">Password</label>
            <div className="relative border-b border-outline-variant pb-2 flex items-center">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">lock</span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 w-full text-body-md placeholder:text-outline-variant"
                placeholder="Masukkan password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className="text-error text-caption">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Masuk
          </button>
        </form>

        <DecorativeDivider className="my-6" />

        <div className="flex flex-col gap-2">
          <p className="text-caption text-on-surface-variant text-center mb-1">Demo Akun</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => quick('admin')}
              className="border border-secondary text-primary py-2.5 rounded-lg hover:bg-surface-container transition-colors"
            >
              <span className="text-label-md">Admin</span>
              <span className="block text-caption text-on-surface-variant">admin / admin123</span>
            </button>
            <button
              onClick={() => quick('user')}
              className="border border-outline-variant text-primary py-2.5 rounded-lg hover:bg-surface-container transition-colors"
            >
              <span className="text-label-md">User</span>
              <span className="block text-caption text-on-surface-variant">user / user123</span>
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('home')} className="mt-8 text-secondary hover:underline flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Kembali ke Beranda
      </button>
    </section>
  )
}