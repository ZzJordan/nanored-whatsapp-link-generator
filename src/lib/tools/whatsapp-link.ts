/**
 * Generador de enlaces wa.me (herramienta gratuita /herramientas/generador-enlace-whatsapp).
 * Código puro, sin DOM ni red: todo ocurre en el navegador del visitante y se prueba con node --test.
 *
 * wa.me exige el número en formato internacional, solo dígitos, sin «+», sin ceros iniciales
 * y sin el 0 de marcación nacional (p. ej. el (0) de Reino Unido).
 */

export interface CountryPrefix {
  code: string
  /** Prefijo sin «+». */
  prefix: string
  es: string
  en: string
}

/** Prefijos más habituales para un negocio en España y su clientela. «Otro» deja escribirlo. */
export const COUNTRY_PREFIXES: readonly CountryPrefix[] = [
  { code: 'ES', prefix: '34', es: 'España', en: 'Spain' },
  { code: 'FR', prefix: '33', es: 'Francia', en: 'France' },
  { code: 'GB', prefix: '44', es: 'Reino Unido', en: 'United Kingdom' },
  { code: 'IE', prefix: '353', es: 'Irlanda', en: 'Ireland' },
  { code: 'DE', prefix: '49', es: 'Alemania', en: 'Germany' },
  { code: 'NL', prefix: '31', es: 'Países Bajos', en: 'Netherlands' },
  { code: 'BE', prefix: '32', es: 'Bélgica', en: 'Belgium' },
  { code: 'IT', prefix: '39', es: 'Italia', en: 'Italy' },
  { code: 'PT', prefix: '351', es: 'Portugal', en: 'Portugal' },
  { code: 'CH', prefix: '41', es: 'Suiza', en: 'Switzerland' },
  { code: 'SE', prefix: '46', es: 'Suecia', en: 'Sweden' },
  { code: 'NO', prefix: '47', es: 'Noruega', en: 'Norway' },
  { code: 'DK', prefix: '45', es: 'Dinamarca', en: 'Denmark' },
  { code: 'MA', prefix: '212', es: 'Marruecos', en: 'Morocco' },
  { code: 'US', prefix: '1', es: 'EE. UU. y Canadá', en: 'USA and Canada' },
  { code: 'MX', prefix: '52', es: 'México', en: 'Mexico' },
  { code: 'AR', prefix: '54', es: 'Argentina', en: 'Argentina' },
  { code: 'CO', prefix: '57', es: 'Colombia', en: 'Colombia' },
  { code: 'VE', prefix: '58', es: 'Venezuela', en: 'Venezuela' },
  { code: 'PE', prefix: '51', es: 'Perú', en: 'Peru' },
  { code: 'CL', prefix: '56', es: 'Chile', en: 'Chile' },
  { code: 'EC', prefix: '593', es: 'Ecuador', en: 'Ecuador' },
]

/** Longitud máxima del mensaje: por encima, el QR se vuelve tan denso que cuesta leerlo impreso. */
export const MAX_MESSAGE_LENGTH = 600

export type PhoneError =
  | 'empty'
  | 'letters'
  | 'prefix'
  | 'too_short'
  | 'too_long'
  | 'es_length'
  | 'es_start'
  | 'repeated'

export type PhoneResult = { ok: true; digits: string; warning?: 'landline' } | { ok: false; error: PhoneError }

const ALLOWED = /^[\d\s().\-‐–—/]*$/

/**
 * Normaliza el número. `prefix` es el prefijo elegido en el desplegable (sin «+»); si el número
 * escrito ya empieza por «+» o «00», manda el número escrito y el desplegable se ignora.
 */
export function normalizePhone(prefix: string, raw: string): PhoneResult {
  let value = raw.trim()
  if (!value) return { ok: false, error: 'empty' }
  let international = false
  if (value.startsWith('+')) {
    international = true
    value = value.slice(1)
  }
  if (!ALLOWED.test(value)) return { ok: false, error: 'letters' }
  let digits = value.replace(/\D/g, '')
  if (!international && digits.startsWith('00')) {
    international = true
    digits = digits.slice(2)
  }
  if (!digits) return { ok: false, error: 'empty' }

  let full: string
  if (international) {
    full = digits
  } else {
    const p = prefix.replace(/\D/g, '')
    if (!p) return { ok: false, error: 'prefix' }
    // El 0 de marcación nacional (Reino Unido, Francia, Italia no, etc.) no va en wa.me, salvo en Italia.
    const national = p === '39' ? digits : digits.replace(/^0+/, '')
    // Si alguien escribe el prefijo dos veces (34 + 34612345678), no se duplica.
    full = national.startsWith(p) && national.length - p.length >= 8 && p !== '1' ? national : p + national
  }
  full = full.replace(/^0+/, '')

  if (full.startsWith('34')) {
    const national = full.slice(2)
    if (national.length < 9) return { ok: false, error: 'es_length' }
    if (national.length > 9) return { ok: false, error: 'es_length' }
    if (!/^[6789]/.test(national)) return { ok: false, error: 'es_start' }
    if (/^(\d)\1{8}$/.test(national)) return { ok: false, error: 'repeated' }
    return /^[89]/.test(national) ? { ok: true, digits: full, warning: 'landline' } : { ok: true, digits: full }
  }
  if (full.length < 8) return { ok: false, error: 'too_short' }
  if (full.length > 15) return { ok: false, error: 'too_long' }
  if (/^(\d)\1+$/.test(full.slice(2))) return { ok: false, error: 'repeated' }
  return { ok: true, digits: full }
}

/** Enlace wa.me con el mensaje codificado (opcional). */
export function buildWaLink(digits: string, message = ''): string {
  const text = message.trim()
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

/** Número en formato legible: +34 612 345 678. */
export function formatPhone(digits: string): string {
  if (digits.startsWith('34') && digits.length === 11) {
    const n = digits.slice(2)
    return `+34 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`
  }
  return `+${digits}`
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export type ButtonStyle = 'inline' | 'floating'

const WA_ICON_PATH =
  'M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.6 6.6 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z'

/**
 * Fragmento HTML de un botón de WhatsApp, autocontenido (estilos en línea, sin scripts ni recursos externos).
 * Colores: texto casi negro sobre el verde de WhatsApp (contraste > 9:1).
 */
export function buttonSnippet(link: string, label: string, style: ButtonStyle, ariaSuffix: string): string {
  const text = escapeHtml(label.trim() || 'WhatsApp')
  const href = escapeHtml(link)
  const aria = escapeHtml(`${label.trim() || 'WhatsApp'} ${ariaSuffix}`.trim())
  const icon = `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 32 32" fill="currentColor"><path d="${WA_ICON_PATH}"/></svg>`
  const base = 'display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#0b141a;font:600 16px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.2)'
  if (style === 'floating') {
    return `<a href="${href}" target="_blank" rel="noopener" aria-label="${aria}" style="${base};position:fixed;right:20px;bottom:20px;z-index:9999;padding:14px 18px">${icon}<span>${text}</span></a>`
  }
  return `<a href="${href}" target="_blank" rel="noopener" aria-label="${aria}" style="${base};padding:12px 20px">${icon}<span>${text}</span></a>`
}

/** Matriz de módulos (true = negro) a un SVG de un solo trazado, con margen de 4 módulos. */
export function qrMatrixToSvg(data: readonly (readonly boolean[])[], margin = 4, scale = 10): string {
  const size = data.length
  const total = size + margin * 2
  let path = ''
  for (let y = 0; y < size; y++) {
    let x = 0
    while (x < size) {
      if (!data[y][x]) { x++; continue }
      const start = x
      while (x < size && data[y][x]) x++
      path += `M${start + margin} ${y + margin}h${x - start}v1h-${x - start}z`
    }
  }
  const px = total * scale
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${px}" height="${px}" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#ffffff"/><path d="${path}" fill="#000000"/></svg>`
}

/**
 * Mensaje precargado desde otra herramienta (plantillas): `#mensaje=` / `#message=` (el fragmento no viaja al
 * servidor) o, por compatibilidad, `?mensaje=` / `?message=` / `?text=`. Se lee una vez y se limpia de la URL.
 */
export function readPrefilledMessage(search: string, hash: string): string {
  for (const source of [hash.replace(/^#/, ''), search.replace(/^\?/, '')]) {
    const params = new URLSearchParams(source)
    for (const key of ['mensaje', 'message', 'text']) {
      const value = params.get(key)
      if (value) return value.slice(0, MAX_MESSAGE_LENGTH)
    }
  }
  return ''
}
