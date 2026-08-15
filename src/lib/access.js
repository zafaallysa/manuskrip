export const ACCESS_OPTIONS = ['public', 'request', 'restricted']

export const ACCESS_LABELS = {
  public: 'Public',
  request: 'Request',
  restricted: 'Restricted',
}

export const ACCESS_DESCRIPTIONS = {
  public: 'Dapat dilihat semua pengunjung.',
  request: 'Harus meminta akses, disetujui admin.',
  restricted: 'Hanya untuk admin.',
}

export function accessBadgeColor(access) {
  switch (access) {
    case 'public':
      return 'text-secondary border-secondary/30'
    case 'request':
      return 'text-tertiary border-tertiary/30'
    case 'restricted':
      return 'text-error border-error/30'
    default:
      return 'text-on-surface-variant border-outline-variant/40'
  }
}

// Whether the current user may fully view a folio
export function canViewFolio(folio, user, hasRequestAccess) {
  if (!folio) return false
  if (user?.role === 'admin') return true
  if (folio.access === 'public') return true
  if (folio.access === 'request') return !!hasRequestAccess
  return false
}

// Whether a folio should appear in browse lists at all
export function browseFolios(folios, user, hasRequestAccess) {
  return folios.filter((f) => {
    if (user?.role === 'admin') return true
    if (f.access === 'public') return true
    if (f.access === 'request') return true
    return false
  })
}

// Which folios should appear in browse lists for the current user (viewable ones only)
export function visibleFolios(folios, user, hasRequestAccess) {
  return folios.filter((f) => canViewFolio(f, user, hasRequestAccess(f)))
}