import { ACCESS_LABELS, accessBadgeColor } from '../lib/access'

export default function FolioCard({ folio, navigate }) {
  return (
    <div
      onClick={() => navigate('viewer', folio.id)}
      className="bg-background rounded-lg overflow-hidden border border-gold/20 shadow-ambient group cursor-pointer transition-transform hover:-translate-y-1"
    >
      <div className="h-2 bg-primary-container w-full" />
      <div className="relative h-64 bg-surface-container p-4 flex items-center justify-center overflow-hidden">
        <img
          className="max-h-full object-contain shadow-sm"
          src={folio.image}
          alt={`Scan of ${folio.title}, ${folio.folio}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-display text-headline-sm text-primary">{folio.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] uppercase tracking-wider border px-2 py-1 rounded ${accessBadgeColor(
                folio.access,
              )}`}
            >
              {ACCESS_LABELS[folio.access] || 'Public'}
            </span>
            <span className="text-caption px-2 py-1 bg-surface-container-high rounded text-on-surface-variant whitespace-nowrap">
              {folio.folio}
            </span>
          </div>
        </div>
        <p className="text-body-md text-on-surface-variant mb-4 line-clamp-2">{folio.description}</p>
        <div className="flex gap-2 flex-wrap">
          {folio.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider text-secondary border border-secondary/30 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}