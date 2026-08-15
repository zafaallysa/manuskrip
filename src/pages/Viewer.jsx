import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useManuscripts } from '../context/ManuscriptsContext'
import { useRequests } from '../context/RequestsContext'
import { canViewFolio } from '../lib/access'

const TRANSCRIPTION = [
  {
    ayah: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    text: 'In the name of Allah, the Most Gracious, the Most Merciful.',
  },
  {
    ayah: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    text: 'Praise be to Allah, Lord of the worlds.',
  },
  {
    ayah: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    text: 'The Most Gracious, the Most Merciful.',
  },
  {
    ayah: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    text: 'Master of the Day of Judgment.',
  },
]

export default function Viewer({ folioId, navigate }) {
  const { folios } = useManuscripts()
  const { user } = useAuth()
  const { hasAccess, addRequest } = useRequests()

  const all = useMemo(() => folios, [folios])
  const visible = useMemo(
    () => all.filter((f) => canViewFolio(f, user, hasAccess(f, user))),
    [all, user, hasAccess],
  )

  const initialIndex = useMemo(() => {
    const idx = all.findIndex((f) => f.id === folioId)
    return idx >= 0 ? idx : 0
  }, [folioId, all])

  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [note, setNote] = useState('')
  const [requestMsg, setRequestMsg] = useState('')

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  const folio = all[index]
  const canView = canViewFolio(folio, user, hasAccess(folio, user))

  const visibleIndex = visible.findIndex((f) => f.id === folio?.id)
  const visibleTotal = visible.length

  const prev = () => {
    const v = visible
    const i = v.findIndex((f) => f.id === folio?.id)
    const target = i < 0 ? v.length - 1 : (i - 1 + v.length) % v.length
    setIndex(all.findIndex((f) => f.id === v[target].id))
  }
  const next = () => {
    const v = visible
    const i = v.findIndex((f) => f.id === folio?.id)
    const target = i < 0 ? 0 : (i + 1) % v.length
    setIndex(all.findIndex((f) => f.id === v[target].id))
  }

  const submitRequest = () => {
    if (!user) return
    const res = addRequest({
      folioId: folio.id,
      folioTitle: folio.title,
      username: user.username,
      name: user.name,
      note,
    })
    if (res.ok) setRequestMsg('Permintaan akses dikirim. Tunggu persetujuan admin.')
    else setRequestMsg(res.error)
  }

  if (!folio) {
    return (
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-display text-headline-md text-primary mb-4">Manuskrip tidak ditemukan</h1>
        <button
          onClick={() => navigate('home')}
          className="bg-primary text-on-primary px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Kembali ke Beranda
        </button>
      </section>
    )
  }

  // Access-controlled state: show lock screen
  if (!canView) {
    const isRequest = folio.access === 'request'
    return (
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="max-w-xl mx-auto bg-surface-container-low rounded-xl p-10 shadow-ambient border border-gold/20 text-center">
          <span className="material-symbols-outlined text-primary text-5xl mb-4">lock</span>
          <h1 className="font-display text-headline-md text-primary mb-3">{folio.title}</h1>
          <p className="text-body-md text-on-surface-variant mb-2">
            {isRequest
              ? 'Manuskrip ini bersifat terbatas. Anda perlu mengajukan permintaan akses untuk membukanya.'
              : 'Manuskrip ini hanya dapat diakses oleh administrator.'}
          </p>
          <p className="text-caption text-on-surface-variant mb-6">{folio.folio} · {folio.juz} · {folio.sura}</p>

          {isRequest && !user && (
            <p className="text-body-md text-on-surface-variant mb-4">
              Silakan <span className="text-primary font-medium">login</span> untuk mengajukan permintaan akses.
            </p>
          )}

          {isRequest && user && (
            <div className="flex flex-col gap-4 text-left">
              <textarea
                className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant resize-none"
                rows={2}
                placeholder="Alasan permintaan akses (opsional)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              {requestMsg && <p className="text-primary text-caption">{requestMsg}</p>}
              <button
                onClick={submitRequest}
                className="bg-primary text-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Ajukan Permintaan Akses
              </button>
            </div>
          )}

          {!isRequest && (
            <button
              onClick={() => navigate('home')}
              className="bg-primary text-on-primary px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Kembali ke Beranda
            </button>
          )}

          <button
            onClick={() => navigate('home')}
            className="mt-6 text-secondary hover:underline flex items-center gap-1 mx-auto"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Archive
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Header bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="font-display text-headline-md text-primary">{folio.title}</h1>
          <p className="text-caption text-on-surface-variant uppercase tracking-widest mt-1">
            {folio.folio} — {folio.juz} · {folio.sura}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="border border-secondary text-primary w-10 h-10 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center"
            aria-label="Previous folio"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <span className="text-caption text-on-surface-variant">
            {visibleIndex >= 0 ? visibleIndex + 1 : '-'} / {visibleTotal}
          </span>
          <button
            onClick={next}
            className="border border-secondary text-primary w-10 h-10 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center"
            aria-label="Next folio"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
          <button
            onClick={() => setZoom((z) => (z >= 2 ? 1 : +(z + 0.25).toFixed(2)))}
            className="border border-secondary text-primary w-10 h-10 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center"
            aria-label="Toggle zoom"
          >
            <span className="material-symbols-outlined text-[20px]">zoom_in</span>
          </button>
        </div>
      </div>

      {/* 60/40 split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Scan viewer */}
        <div className="lg:col-span-3">
          <div className="manuscript-frame rounded-lg overflow-hidden">
            <div
              className="bg-surface-container flex items-center justify-center overflow-auto transition-all duration-300"
              style={{ height: `${620 / zoom}px` }}
            >
              <img
                src={folio.image}
                alt={`Digital scan of ${folio.title}, ${folio.folio}`}
                className="max-w-full object-contain shadow-sm transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          </div>
          <p className="text-caption text-on-surface-variant mt-3 italic">
            High-resolution scan · {folio.folio} · Collection of Manuskrip Digital Archive
          </p>
        </div>

        {/* Metadata + transcription */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-lg p-6 border border-gold/20">
            <h2 className="font-display text-headline-sm text-primary mb-4">Codicological Record</h2>
            <dl className="space-y-3 text-body-md">
              {[
                ['Shelfmark', 'LAM. QUR. 001'],
                ['Folio', folio.folio],
                ['Juz', folio.juz],
                ['Sura', folio.sura],
                ['Script', 'Regional Naskh (Aceh)'],
                ['Ink', 'Carbon black, gold leaf'],
                ['Support', 'Aged parchment'],
                ['Condition', folio.tags.join(' · ')],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-outline-variant/30 pb-2">
                  <dt className="text-caption uppercase tracking-widest text-on-surface-variant">{k}</dt>
                  <dd className="text-right text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-surface-container-low rounded-lg p-6 border border-gold/20 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-headline-sm text-primary">Transcription</h2>
              <span className="text-caption text-on-surface-variant">diplomatic</span>
            </div>
            <div className="space-y-4">
              {TRANSCRIPTION.map((line) => (
                <div key={line.ayah} className="group">
                  <p className="text-right text-2xl leading-loose text-primary" dir="rtl">
                    {line.arabic}
                  </p>
                  <p className="text-body-md text-on-surface-variant mt-1">
                    <span className="text-secondary text-caption mr-1">({line.ayah})</span>
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manuscript navigator thumbnails */}
      <div className="mt-10">
        <p className="text-caption uppercase tracking-widest text-on-surface-variant mb-3">Folio Navigator</p>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {visible.map((f) => (
            <button
              key={f.id}
              onClick={() => setIndex(all.findIndex((x) => x.id === f.id))}
              className={`shrink-0 w-24 h-32 rounded overflow-hidden border-2 transition-colors ${
                f.id === folio.id ? 'border-gold' : 'border-outline-variant/40 hover:border-secondary/50'
              }`}
            >
              <img src={f.image} alt={`${f.folio} thumbnail`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('home')}
        className="mt-8 text-secondary hover:underline flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Back to Archive
      </button>
    </section>
  )
}