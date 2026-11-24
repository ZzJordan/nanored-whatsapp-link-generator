import { describe, expect, it } from 'vitest'
import { buildWaLink, buttonSnippet, normalizePhone, qrMatrixToSvg, readPrefilledMessage } from '@/lib/tools/whatsapp-link'

// Números ficticios (34600000000 no existe).
describe('whatsapp-link', () => {
  it('normaliza un número español con separadores y prefijos', () => {
    for (const raw of ['600 000 000', '600-000-000', '+34 600 000 000', '0034600000000', '34600000000']) {
      const r = normalizePhone('34', raw)
      expect(r.ok && r.digits).toBe('34600000000')
    }
  })
  it('rechaza números vacíos, con letras o demasiado cortos', () => {
    expect(normalizePhone('34', '')).toEqual({ ok: false, error: 'empty' })
    expect(normalizePhone('34', '600abc000').ok).toBe(false)
    expect(normalizePhone('34', '600 00').ok).toBe(false)
  })
  it('construye el enlace wa.me con el mensaje codificado', () => {
    expect(buildWaLink('34600000000')).toBe('https://wa.me/34600000000')
    expect(buildWaLink('34600000000', 'Hola, ¿qué tal?')).toBe('https://wa.me/34600000000?text=' + encodeURIComponent('Hola, ¿qué tal?'))
  })
  it('el botón HTML escapa el texto y no lleva scripts', () => {
    const html = buttonSnippet('https://wa.me/34600000000', '<b>Hola</b>', 'inline', '')
    expect(html).not.toContain('<b>')
    expect(html).not.toMatch(/<script/i)
  })
  it('el SVG del QR es válido y de un solo trazado', () => {
    const svg = qrMatrixToSvg([[true, false], [false, true]])
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg.match(/<path/g)).toHaveLength(1)
  })
  it('lee el mensaje precargado del fragmento o de la consulta', () => {
    expect(readPrefilledMessage('', '#mensaje=Hola%20mundo')).toBe('Hola mundo')
    expect(readPrefilledMessage('?text=Hi', '')).toBe('Hi')
    expect(readPrefilledMessage('', '')).toBe('')
  })
})
