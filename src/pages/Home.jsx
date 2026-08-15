import ArchiveNavigator from '../components/ArchiveNavigator'
import FeaturedFolios from '../components/FeaturedFolios'
import DecorativeDivider from '../components/DecorativeDivider'

export default function Home({ navigate }) {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 flex flex-col items-center text-center">
        <img
          alt="Manuskrip Digital Library Logo"
          className="w-48 h-48 mb-8 object-contain"
          src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
        />
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary mb-6 max-w-3xl">
          Preserving the Light of Islamic Heritage
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12">
          A meticulous digital preservation of the Al-Qur&apos;an Tgk. Chik Lampaloh. Bridging 18th-century
          artistry with rigorous academic analysis to ensure the unbroken transmission of sacred knowledge.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('viewer', 'folio-1v')}
            className="bg-primary-container text-secondary-fixed px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            Explore the Manuscript
          </button>
          <button
            onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-secondary text-primary px-8 py-3 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            Read the History
          </button>
        </div>
      </section>

      {/* Decorative Divider */}
      <DecorativeDivider />

      {/* Search & Filter Area */}
      <div id="navigator">
        <ArchiveNavigator navigate={navigate} />
      </div>

      {/* Featured Folios Gallery */}
      <div id="folios">
        <FeaturedFolios navigate={navigate} />
      </div>

      {/* History */}
      <section id="history" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="max-w-3xl mx-auto text-center">
          <DecorativeDivider className="mb-10" />
          <h2 className="font-display text-headline-md text-primary mb-6">The Al-Qur&apos;an Tgk. Chik Lampaloh</h2>
          <p className="text-body-lg text-on-surface-variant mb-6">
            An 18th-century Qur&apos;anic codex from Aceh, written in a distinctive regional Naskh hand on aged
            parchment. Its margins carry generations of scholarly annotation — Tajweed rules, variant readings, and
            the daily record of a living tradition.
          </p>
          <p className="text-body-md text-on-surface-variant mb-8">
            This archive unites high-resolution facsimiles, diplomatic transcription, and codicological metadata,
            making the manuscript available to researchers and the faithful alike.
          </p>
          <button
            onClick={() => navigate('viewer', 'folio-45r')}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Begin the Reading
          </button>
        </div>
      </section>
    </>
  )
}