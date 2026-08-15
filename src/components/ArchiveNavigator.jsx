import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useManuscripts } from '../context/ManuscriptsContext'
import { useRequests } from '../context/RequestsContext'
import { browseFolios } from '../lib/access'

export default function ArchiveNavigator({ navigate }) {
  const { folios } = useManuscripts()
  const { user } = useAuth()
  const { hasAccess } = useRequests()
  const [keyword, setKeyword] = useState('')
  const [juz, setJuz] = useState('All Juz')
  const [sura, setSura] = useState('All Suras')

  const visible = browseFolios(folios, user, hasAccess)

  const juzOptions = ['All Juz', ...new Set(visible.map((f) => f.juz))]
  const suraOptions = ['All Suras', ...new Set(visible.map((f) => f.sura).filter(Boolean))]

  const applyFilters = () => {
    const q = keyword.trim().toLowerCase()
    const filtered = visible.filter((f) => {
      const matchQ =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.folio.toLowerCase().includes(q)
      const matchJuz = juz === 'All Juz' || f.juz === juz
      const matchSura = sura === 'All Suras' || f.sura === sura
      return matchQ && matchJuz && matchSura
    })
    if (filtered.length > 0) {
      navigate('viewer', filtered[0].id)
    } else {
      navigate('home')
    }
  }

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20">
        <h2 className="font-display text-headline-sm text-primary mb-6">Archive Navigator</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-caption text-on-surface-variant uppercase tracking-widest">Search</label>
            <div className="relative border-b border-outline-variant pb-2 flex items-center">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 w-full text-body-md placeholder:font-display placeholder:text-outline-variant placeholder:italic"
                placeholder="Enter keywords..."
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-caption text-on-surface-variant uppercase tracking-widest">Juz</label>
            <select
              className="bg-transparent border-b border-outline-variant pb-2 focus:ring-0 cursor-pointer text-body-md text-on-surface-variant"
              value={juz}
              onChange={(e) => setJuz(e.target.value)}
            >
              {juzOptions.map((j) => (
                <option key={j}>{j}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-caption text-on-surface-variant uppercase tracking-widest">Sura</label>
            <select
              className="bg-transparent border-b border-outline-variant pb-2 focus:ring-0 cursor-pointer text-body-md text-on-surface-variant"
              value={sura}
              onChange={(e) => setSura(e.target.value)}
            >
              {suraOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={applyFilters}
              className="w-full bg-primary text-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}