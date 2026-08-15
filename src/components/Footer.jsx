export default function Footer({ navigate }) {
  const links = [
    { label: 'Institutional Access', onClick: () => {} },
    { label: 'Privacy Policy', onClick: () => {} },
    { label: 'Archival Standards', onClick: () => {} },
    { label: 'Contact Curator', onClick: () => {} },
  ]

  return (
    <footer className="bg-surface-container-highest w-full mt-auto border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-8 gap-4 max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <button onClick={() => navigate('home')} className="font-display text-headline-sm text-primary">
            Manuskrip Digital Archive
          </button>
          <p className="text-caption text-on-surface-variant">
            © {new Date().getFullYear()} Manuskrip Digital Archive. Preserving Islamic Heritage through Academic
            Rigor.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                l.onClick()
              }}
              className="text-caption text-on-surface-variant hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}