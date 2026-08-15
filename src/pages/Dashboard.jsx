import { useMemo, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useManuscripts } from '../context/ManuscriptsContext'
import { useRequests } from '../context/RequestsContext'
import { getVisitStats } from '../lib/visits'
import { ACCESS_OPTIONS, ACCESS_LABELS, ACCESS_DESCRIPTIONS, accessBadgeColor } from '../lib/access'
import DecorativeDivider from '../components/DecorativeDivider'

function resizeImage(file, maxDim = 1400) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Dashboard({ navigate }) {
  const { user } = useAuth()
  const { folios, addFolio, removeFolio } = useManuscripts()
  const { requests, setStatus, pendingCount } = useRequests()
  const stats = useMemo(() => getVisitStats(), [])
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    title: '',
    folio: '',
    juz: '',
    sura: '',
    description: '',
    tags: '',
    access: 'public',
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [message, setMessage] = useState('')

  if (!user || user.role !== 'admin') {
    return (
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-display text-headline-md text-primary mb-4">Akses Ditolak</h1>
        <p className="text-body-md text-on-surface-variant mb-8">Halaman ini hanya untuk administrator.</p>
        <button
          onClick={() => navigate('home')}
          className="bg-primary text-on-primary px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Kembali ke Beranda
        </button>
      </section>
    )
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMessage('')
    try {
      const dataUrl = await resizeImage(file)
      setImage(dataUrl)
      setPreview(URL.createObjectURL(file))
    } catch {
      setMessage('Gagal membaca berkas gambar.')
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!image) {
      setMessage('Pilih berkas gambar manuskrip terlebih dahulu.')
      return
    }
    if (!form.title.trim()) {
      setMessage('Judul tidak boleh kosong.')
      return
    }
    const id = `added-${Date.now()}`
    const juz = form.juz.trim() || 'Juz 1'
    addFolio({
      id,
      folio: form.folio.trim() || 'Folio Baru',
      title: form.title.trim(),
      description: form.description.trim() || 'Belum ada deskripsi.',
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      juz,
      sura: form.sura.trim() || 'Al-Qur\u2019an',
      access: form.access,
      image,
    })
    setForm({ title: '', folio: '', juz: '', sura: '', description: '', tags: '', access: 'public' })
    setImage(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
    setMessage('Manuskrip berhasil ditambahkan ke arsip.')
  }

  const addedFolios = folios.filter((f) => f.id.startsWith('added-'))

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-headline-md text-primary mb-1">Dashboard Administrator</h1>
          <p className="text-body-md text-on-surface-variant">Statistik kunjungan dan pengelolaan arsip.</p>
        </div>
        <button
          onClick={() => navigate('home')}
          className="text-secondary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Kembali
        </button>
      </div>

      {/* Visit stats */}
      <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20 mb-8">
        <h2 className="font-display text-headline-sm text-primary mb-6">Kunjungan Website</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-background rounded-lg p-6 border border-gold/20">
            <p className="text-caption text-on-surface-variant uppercase tracking-widest mb-2">Total Kunjungan</p>
            <p className="font-display text-display-lg-mobile text-primary">{stats.total.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-gold/20">
            <p className="text-caption text-on-surface-variant uppercase tracking-widest mb-2">Kunjungan Hari Ini</p>
            <p className="font-display text-display-lg-mobile text-primary">{stats.today.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-gold/20">
            <p className="text-caption text-on-surface-variant uppercase tracking-widest mb-2">Total Manuskrip</p>
            <p className="font-display text-display-lg-mobile text-primary">{folios.length}</p>
          </div>
        </div>

        <p className="text-caption text-on-surface-variant uppercase tracking-widest mb-3">7 Hari Terakhir</p>
        <div className="flex items-end gap-3 h-40">
          {stats.last7.map((d) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-caption text-on-surface-variant">{d.count}</span>
              <div
                className="w-full bg-primary-container rounded-t"
                style={{ height: `${Math.max(4, (d.count / stats.max) * 100)}%` }}
              />
              <span className="text-caption text-on-surface-variant">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20">
          <h2 className="font-display text-headline-sm text-primary mb-6">Tambah Manuskrip</h2>
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-caption text-on-surface-variant uppercase tracking-widest">Berkas Gambar</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                className="text-body-md text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary file:cursor-pointer file:hover:opacity-90"
              />
            </div>
            {preview && (
              <img src={preview} alt="Pratinjau manuskrip" className="max-h-48 object-contain rounded border border-gold/20" />
            )}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-caption text-on-surface-variant uppercase tracking-widest">Judul</label>
                <input
                  className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant"
                  placeholder="Contoh: Surah An-Nur"
                  value={form.title}
                  onChange={set('title')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-caption text-on-surface-variant uppercase tracking-widest">Folio</label>
                <input
                  className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant"
                  placeholder="Contoh: Folio 88v"
                  value={form.folio}
                  onChange={set('folio')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-caption text-on-surface-variant uppercase tracking-widest">Juz</label>
                <input
                  className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant"
                  placeholder="Contoh: Juz 24"
                  value={form.juz}
                  onChange={set('juz')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-caption text-on-surface-variant uppercase tracking-widest">Sura</label>
                <input
                  className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant"
                  placeholder="Contoh: An-Nur"
                  value={form.sura}
                  onChange={set('sura')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-caption text-on-surface-variant uppercase tracking-widest">Deskripsi</label>
              <textarea
                className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant resize-none"
                rows={2}
                placeholder="Deskripsi singkat manuskrip..."
                value={form.description}
                onChange={set('description')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-caption text-on-surface-variant uppercase tracking-widest">Tag (pisah koma)</label>
              <input
                className="bg-transparent border-b border-outline-variant pb-2 w-full text-body-md focus:ring-0 placeholder:text-outline-variant"
                placeholder="Illuminated, Restored"
                value={form.tags}
                onChange={set('tags')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-caption text-on-surface-variant uppercase tracking-widest">Akses</label>
              <div className="grid grid-cols-3 gap-3">
                {ACCESS_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`cursor-pointer border rounded-lg px-3 py-2.5 transition-colors ${
                      form.access === opt
                        ? 'border-secondary bg-background'
                        : 'border-outline-variant/40 hover:bg-background'
                    }`}
                  >
                    <input
                      type="radio"
                      name="access"
                      value={opt}
                      checked={form.access === opt}
                      onChange={set('access')}
                      className="sr-only"
                    />
                    <span className="block text-label-md text-primary">{ACCESS_LABELS[opt]}</span>
                    <span className="block text-caption text-on-surface-variant">{ACCESS_DESCRIPTIONS[opt]}</span>
                  </label>
                ))}
              </div>
            </div>
            {message && <p className="text-primary text-caption">{message}</p>}
            <button
              type="submit"
              className="bg-primary text-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Simpan ke Arsip
            </button>
          </form>
        </div>

        {/* Uploaded manuscripts */}
        <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20">
          <h2 className="font-display text-headline-sm text-primary mb-6">Manuskrip Ditambahkan Admin</h2>
          {addedFolios.length === 0 ? (
            <p className="text-body-md text-on-surface-variant">Belum ada manuskrip yang ditambahkan.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {addedFolios.map((f) => (
                <li key={f.id} className="flex items-center gap-4 bg-background rounded-lg border border-gold/20 p-3">
                  <img src={f.image} alt={f.title} className="w-16 h-20 object-cover rounded border border-outline-variant/40" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md text-primary font-medium truncate">{f.title}</p>
                    <p className="text-caption text-on-surface-variant">
                      {f.folio} · {f.juz} · {f.sura}
                    </p>
                    <span
                      className={`inline-block text-[10px] uppercase tracking-wider border px-2 py-0.5 rounded mt-1 ${accessBadgeColor(
                        f.access,
                      )}`}
                    >
                      {ACCESS_LABELS[f.access] || 'Public'}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFolio(f.id)}
                    className="text-error hover:opacity-70 transition-opacity"
                    aria-label={`Hapus ${f.title}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Access requests */}
      <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient border border-gold/20 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-headline-sm text-primary">Permintaan Akses</h2>
          {pendingCount > 0 && (
            <span className="text-caption text-tertiary bg-tertiary-fixed px-3 py-1 rounded-full">
              {pendingCount} menunggu
            </span>
          )}
        </div>
        {requests.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">Belum ada permintaan akses.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {requests.map((r) => {
              const folio = folios.find((f) => f.id === r.folioId)
              return (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center gap-4 bg-background rounded-lg border border-gold/20 p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md text-primary font-medium truncate">
                      {r.folioTitle || folio?.title || 'Manuskrip'}
                    </p>
                    <p className="text-caption text-on-surface-variant">
                      {r.name} (@{r.username}) — {new Date(r.date).toLocaleString('id-ID')}
                    </p>
                    {r.note && <p className="text-body-md text-on-surface-variant mt-1 italic">“{r.note}”</p>}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider border px-2 py-1 rounded ${
                      r.status === 'approved'
                        ? 'text-secondary border-secondary/30'
                        : r.status === 'rejected'
                          ? 'text-error border-error/30'
                          : 'text-tertiary border-tertiary/30'
                    }`}
                  >
                    {r.status}
                  </span>
                  {r.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStatus(r.id, 'approved')}
                        className="bg-primary-container text-secondary-fixed px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => setStatus(r.id, 'rejected')}
                        className="border border-error text-error px-4 py-2 rounded-lg hover:bg-error-container/30 transition-colors"
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <DecorativeDivider />
    </section>
  )
}