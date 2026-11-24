'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { Copy, Download, ExternalLink } from 'lucide-react'
import type { Language } from '@/lib/translations'
import {
  COUNTRY_PREFIXES, MAX_MESSAGE_LENGTH, buildWaLink, readPrefilledMessage, buttonSnippet, formatPhone, normalizePhone, qrMatrixToSvg,
  type ButtonStyle, type PhoneError,
} from '@/lib/tools/whatsapp-link'
import { trackEvent } from '@/lib/analytics'
import { downloadBlob, useCopy } from './use-copy'

/**
 * Generador de enlace wa.me, QR y botón HTML. Todo en el navegador: el número y el mensaje no salen de aquí
 * y la analítica solo recibe qué botón se pulsó (tool_action), nunca el contenido.
 * La librería de QR (uqr, MIT) se carga al generar el primer QR, no con la página.
 */
const copy = {
  es: {
    country: 'País (prefijo)',
    other: 'Otro (escríbelo con + delante)',
    phone: 'Número de WhatsApp',
    phoneHint: 'Con o sin espacios. Si lo escribes con + delante, se usa ese prefijo.',
    message: 'Mensaje predefinido (opcional)',
    messageHint: (n: number) => `El cliente lo verá ya escrito. ${n} de ${MAX_MESSAGE_LENGTH} caracteres.`,
    messagePlaceholder: 'Hola, quiero pedir información sobre…',
    errors: {
      empty: 'Escribe el número de WhatsApp del negocio.',
      letters: 'El número solo puede llevar cifras, espacios, guiones, paréntesis y un + al principio.',
      prefix: 'Elige el país en el desplegable o escribe el número con su prefijo y un + delante (por ejemplo, +34 600 000 000).',
      too_short: 'Al número le faltan cifras. Revisa que esté completo y que el prefijo del país sea el correcto.',
      too_long: 'Al número le sobran cifras: un número internacional tiene como máximo 15. ¿Has escrito el prefijo dos veces?',
      es_length: 'Un número español tiene 9 cifras (sin contar el 34). Revisa que no falte ni sobre ninguna.',
      es_start: 'Los números españoles empiezan por 6 o 7 (móviles) o por 8 o 9 (fijos). Si es de otro país, cambia el prefijo.',
      repeated: 'Ese número no parece real (todas las cifras iguales). Escribe el número del negocio.',
    } satisfies Record<PhoneError, string>,
    landline: 'Es un número fijo: solo funcionará si lo tienes dado de alta en WhatsApp Business.',
    resultTitle: 'Tu enlace',
    linkLabel: 'Enlace de WhatsApp',
    copyLink: 'Copiar enlace',
    copied: 'Copiado',
    copyError: 'No se ha podido copiar: selecciónalo y cópialo a mano.',
    test: 'Probar el enlace',
    newTab: '(se abre en una pestaña nueva)',
    waiting: 'Escribe un número válido para ver el enlace, el QR y el botón.',
    qrTitle: 'Código QR',
    qrAlt: (n: string) => `Código QR que abre un chat de WhatsApp con ${n}`,
    qrLoading: 'Generando el QR…',
    qrDense: 'El mensaje es largo y el QR sale muy denso: si lo vas a imprimir pequeño, acorta el mensaje.',
    png: 'Descargar PNG',
    svg: 'Descargar SVG',
    buttonTitle: 'Botón de WhatsApp para tu web',
    buttonLabel: 'Texto del botón',
    buttonDefault: 'Escríbenos por WhatsApp',
    styleLabel: 'Tipo de botón',
    inline: 'Botón normal (donde lo pegues)',
    floating: 'Botón flotante (esquina inferior derecha)',
    code: 'Código HTML',
    copyHtml: 'Copiar código',
    preview: 'Vista previa',
    previewTitle: 'Vista previa del botón de WhatsApp',
    previewText: 'Así se verá en tu web.',
    privacy: 'El número y el mensaje no salen de tu navegador.',
  },
  en: {
    country: 'Country (code)',
    other: 'Other (type it with a leading +)',
    phone: 'WhatsApp number',
    phoneHint: 'With or without spaces. If you type it with a leading +, that code is used.',
    message: 'Pre-filled message (optional)',
    messageHint: (n: number) => `The customer will see it already typed. ${n} of ${MAX_MESSAGE_LENGTH} characters.`,
    messagePlaceholder: 'Hi, I would like some information about…',
    errors: {
      empty: 'Type your business WhatsApp number.',
      letters: 'The number can only contain digits, spaces, dashes, brackets and a leading +.',
      prefix: 'Choose the country in the list or type the number with its code and a leading + (for example, +44 7700 900123).',
      too_short: 'The number is missing digits. Check that it is complete and that the country code is right.',
      too_long: 'The number has too many digits: an international number has 15 at most. Did you type the country code twice?',
      es_length: 'A Spanish number has 9 digits (not counting the 34). Check that none is missing or extra.',
      es_start: 'Spanish numbers start with 6 or 7 (mobiles) or 8 or 9 (landlines). If it is from another country, change the code.',
      repeated: 'That number does not look real (all digits the same). Type your business number.',
    } satisfies Record<PhoneError, string>,
    landline: 'This is a landline: it will only work if it is registered on WhatsApp Business.',
    resultTitle: 'Your link',
    linkLabel: 'WhatsApp link',
    copyLink: 'Copy link',
    copied: 'Copied',
    copyError: 'Could not copy: select it and copy it by hand.',
    test: 'Test the link',
    newTab: '(opens in a new tab)',
    waiting: 'Type a valid number to see the link, QR code and button.',
    qrTitle: 'QR code',
    qrAlt: (n: string) => `QR code that opens a WhatsApp chat with ${n}`,
    qrLoading: 'Generating the QR code…',
    qrDense: 'The message is long and the QR is very dense: if you will print it small, shorten the message.',
    png: 'Download PNG',
    svg: 'Download SVG',
    buttonTitle: 'WhatsApp button for your website',
    buttonLabel: 'Button text',
    buttonDefault: 'Message us on WhatsApp',
    styleLabel: 'Button type',
    inline: 'Regular button (where you paste it)',
    floating: 'Floating button (bottom right corner)',
    code: 'HTML code',
    copyHtml: 'Copy code',
    preview: 'Preview',
    previewTitle: 'WhatsApp button preview',
    previewText: 'This is how it will look on your website.',
    privacy: 'The number and message never leave your browser.',
  },
} as const

type QrMatrix = boolean[][]

export function WhatsAppLinkTool({ language }: { language: Language }) {
  const t = copy[language]
  const id = useId()
  const [prefix, setPrefix] = useState('34')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [message, setMessage] = useState(() => (typeof window === 'undefined' ? '' : readPrefilledMessage(window.location.search, window.location.hash)))
  const [customLabel, setCustomLabel] = useState<string | null>(null)
  const label = customLabel ?? t.buttonDefault
  const [style, setStyle] = useState<ButtonStyle>('inline')
  const [qr, setQr] = useState<{ link: string; data: QrMatrix } | null>(null)
  const { copied, copy: copyText } = useCopy()

  // Quita el mensaje precargado de la barra de direcciones (no debe quedarse en el historial ni al compartir la URL).
  useEffect(() => {
    if (/[#&?](mensaje|message|text)=/.test(window.location.search + window.location.hash)) window.history.replaceState(window.history.state, '', window.location.pathname)
  }, [])

  const result = useMemo(() => normalizePhone(prefix, phone), [prefix, phone])
  const link = result.ok ? buildWaLink(result.digits, message) : ''
  const snippet = link ? buttonSnippet(link, label, style, t.newTab) : ''
  const showError = !result.ok && (touched || phone.trim().length > 0) && !(result.error === 'empty' && !touched)

  useEffect(() => {
    if (!link) return
    let cancelled = false
    const timer = setTimeout(() => {
      import('uqr').then(({ encode }) => {
        if (cancelled) return
        setQr({ link, data: encode(link, { ecc: 'M', border: 0 }).data })
      }).catch(() => { /* Sin QR si no carga la librería; el enlace sigue funcionando. */ })
    }, 150)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [link])

  const qrReady = qr && qr.link === link ? qr.data : null
  const qrSvg = qrReady ? qrMatrixToSvg(qrReady, 4, 8) : ''
  const fileBase = result.ok ? `whatsapp-${result.digits}` : 'whatsapp'

  const downloadPng = () => {
    if (!qrReady) return
    const margin = 4
    const total = qrReady.length + margin * 2
    const scale = Math.max(8, Math.ceil(1024 / total))
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = total * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#000000'
    qrReady.forEach((row, y) => row.forEach((on, x) => { if (on) ctx.fillRect((x + margin) * scale, (y + margin) * scale, scale, scale) }))
    canvas.toBlob((blob) => { if (blob) downloadBlob(blob, `${fileBase}-qr.png`) }, 'image/png')
    trackEvent('tool_action', { tool: 'enlace_whatsapp', action: 'download_png' })
  }
  const downloadSvg = () => {
    if (!qrReady) return
    downloadBlob(new Blob([qrMatrixToSvg(qrReady, 4, 10)], { type: 'image/svg+xml' }), `${fileBase}-qr.svg`)
    trackEvent('tool_action', { tool: 'enlace_whatsapp', action: 'download_svg' })
  }
  const status = (key: string) => (copied === key ? t.copied : copied === `${key}:error` ? t.copyError : '')

  const previewDoc = snippet
    ? `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><style>body{margin:0;padding:24px;min-height:150px;font:15px/1.5 system-ui,sans-serif;color:#1f1f1f;background:#fafafa}</style></head><body><p>${t.previewText}</p>${snippet}</body></html>`
    : ''

  return (
    <div className="tool-panel">
      <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); setTouched(true); if (result.ok) trackEvent('tool_action', { tool: 'enlace_whatsapp', action: 'generate' }) }} noValidate>
        <div className="grid gap-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          <div>
            <label className="lead-label" htmlFor={`${id}-prefix`}>{t.country}</label>
            <select id={`${id}-prefix`} className="lead-input" value={prefix} onChange={(e) => setPrefix(e.target.value)}>
              {COUNTRY_PREFIXES.map((c) => <option key={c.code} value={c.prefix}>{c[language]} (+{c.prefix})</option>)}
              <option value="">{t.other}</option>
            </select>
          </div>
          <div>
            <label className="lead-label" htmlFor={`${id}-phone`}>{t.phone}</label>
            <input
              id={`${id}-phone`} className="lead-input" type="tel" inputMode="tel" autoComplete="off" maxLength={30}
              value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setTouched(true)}
              placeholder={prefix === '34' ? '600 000 000' : ''}
              aria-invalid={showError || undefined} aria-describedby={`${id}-phone-hint ${id}-phone-error`}
            />
            <p id={`${id}-phone-hint`} className="tool-hint">{t.phoneHint}</p>
            <p id={`${id}-phone-error`} className="tool-error" role="alert">{showError && !result.ok ? t.errors[result.error] : ''}</p>
            {result.ok && result.warning === 'landline' ? <p className="tool-hint">{t.landline}</p> : null}
          </div>
        </div>
        <div>
          <label className="lead-label" htmlFor={`${id}-message`}>{t.message}</label>
          <textarea id={`${id}-message`} className="lead-input min-h-24 resize-y" rows={3} maxLength={MAX_MESSAGE_LENGTH} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.messagePlaceholder} aria-describedby={`${id}-message-hint`} />
          <p id={`${id}-message-hint`} className="tool-hint">{t.messageHint(message.length)}</p>
        </div>
        <p className="tool-hint">{t.privacy}</p>
      </form>

      <section className="tool-result" aria-labelledby={`${id}-result`} aria-live="polite">
        <h3 id={`${id}-result`} className="tool-subtitle">{t.resultTitle}</h3>
        {!link ? <p className="tool-hint">{t.waiting}</p> : (
          <>
            <label className="lead-label" htmlFor={`${id}-link`}>{t.linkLabel}</label>
            <div className="tool-copy-row">
              <input id={`${id}-link`} className="lead-input font-mono text-sm" readOnly value={link} onFocus={(e) => e.currentTarget.select()} />
              <button type="button" className="conversion-button" onClick={() => { copyText('link', link); trackEvent('tool_action', { tool: 'enlace_whatsapp', action: 'copy_link' }) }}>
                <Copy className="w-4 h-4" aria-hidden="true" />{t.copyLink}
              </button>
            </div>
            <p className="tool-status" role="status">{status('link')}</p>
            <a className="conversion-text-link" href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" aria-hidden="true" />{t.test}<span className="sr-only"> {t.newTab}</span>
            </a>

            <div className="tool-grid mt-8">
              <div>
                <h3 className="tool-subtitle">{t.qrTitle}</h3>
                <div className="tool-qr">
                  {qrSvg
                    // eslint-disable-next-line @next/next/no-img-element -- SVG generado en el navegador (data URI)
                    ? <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`} alt={t.qrAlt(result.ok ? formatPhone(result.digits) : '')} width={240} height={240} />
                    : <p className="tool-hint">{t.qrLoading}</p>}
                </div>
                {link.length > 300 ? <p className="tool-hint">{t.qrDense}</p> : null}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button type="button" className="tool-button" onClick={downloadPng} disabled={!qrReady}><Download className="w-4 h-4" aria-hidden="true" />{t.png}</button>
                  <button type="button" className="tool-button" onClick={downloadSvg} disabled={!qrReady}><Download className="w-4 h-4" aria-hidden="true" />{t.svg}</button>
                </div>
              </div>

              <div>
                <h3 className="tool-subtitle">{t.buttonTitle}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="lead-label" htmlFor={`${id}-label`}>{t.buttonLabel}</label>
                    <input id={`${id}-label`} className="lead-input" maxLength={40} value={label} onChange={(e) => setCustomLabel(e.target.value)} />
                  </div>
                  <fieldset>
                    <legend className="lead-label">{t.styleLabel}</legend>
                    {(['inline', 'floating'] as const).map((value) => (
                      <label key={value} className="tool-radio">
                        <input type="radio" name={`${id}-style`} value={value} checked={style === value} onChange={() => setStyle(value)} />
                        {t[value]}
                      </label>
                    ))}
                  </fieldset>
                </div>
                <label className="lead-label mt-4" htmlFor={`${id}-code`}>{t.code}</label>
                <textarea id={`${id}-code`} className="lead-input font-mono text-xs min-h-28" readOnly value={snippet} onFocus={(e) => e.currentTarget.select()} />
                <button type="button" className="tool-button mt-3" onClick={() => { copyText('html', snippet); trackEvent('tool_action', { tool: 'enlace_whatsapp', action: 'copy_html' }) }}>
                  <Copy className="w-4 h-4" aria-hidden="true" />{t.copyHtml}
                </button>
                <p className="tool-status" role="status">{status('html')}</p>
                <p className="lead-label mt-4">{t.preview}</p>
                <iframe className="tool-preview" title={t.previewTitle} srcDoc={previewDoc} sandbox="allow-popups allow-popups-to-escape-sandbox" loading="lazy" />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
