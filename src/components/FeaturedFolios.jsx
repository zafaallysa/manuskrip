import { useAuth } from '../context/AuthContext'
import { useManuscripts } from '../context/ManuscriptsContext'
import { useRequests } from '../context/RequestsContext'
import { browseFolios } from '../lib/access'
import FolioCard from './FolioCard'

export default function FeaturedFolios({ navigate }) {
  const { folios } = useManuscripts()
  const { user } = useAuth()
  const { hasAccess } = useRequests()

  const visible = browseFolios(folios, user, hasAccess).slice(0, 3)
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-headline-md text-primary mb-2">Featured Folios</h2>
          <p className="text-body-md text-on-surface-variant">High-resolution scans of significant pages.</p>
        </div>
        <button
          onClick={() => document.getElementById('navigator')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-body-md text-secondary hover:underline flex items-center gap-1"
        >
          View Complete Archive
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((folio) => (
          <FolioCard key={folio.id} folio={folio} navigate={navigate} />
        ))}
      </div>
    </section>
  )
}