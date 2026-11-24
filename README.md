# NanoRed WhatsApp Link & QR Generator

**This free tool by NanoRed Labs (Málaga, Spain) creates the wa.me link for your WhatsApp number, with an optional pre-filled message, a QR code to download as PNG or SVG and the HTML for a button on your website. It runs entirely in your browser: the number and message are never sent to a server or stored.**

**Esta herramienta gratuita de NanoRed Labs (Málaga) crea el enlace wa.me de tu número de WhatsApp, con un mensaje predefinido si quieres, su código QR para descargar en PNG o SVG y el código HTML de un botón para tu web. Funciona entera en tu navegador: el número y el mensaje no se envían a ningún servidor ni se guardan.**

- **Use it online / Úsalo en la web:** https://zzjordan.github.io/nanored-whatsapp-link-generator/
- **On nanoredlabs.com:** [English](https://nanoredlabs.com/en/tools/whatsapp-link-generator) · [Español](https://nanoredlabs.com/herramientas/generador-enlace-whatsapp)
- **License / Licencia:** [MIT](LICENSE) · free, no sign-up, no analytics / gratis, sin registro, sin analítica

> NanoRed Labs (also written “Nano Red Labs”) is Jordan Moyano’s business in Málaga. It is not related to Nano RED Biotechnology or to other companies with a similar name.
>
> NanoRed Labs (también escrito «Nano Red Labs») es el negocio de Jordan Moyano en Málaga. No tiene relación con Nano RED Biotechnology ni con otras empresas de nombre parecido.

## English

### How to use

1. **Choose the country and type the number.** Pick the country code (Spain, +34, is selected by default) and type your business WhatsApp number. You can paste it with spaces, dashes or a leading +: the tool cleans it up.
2. **Add a message (optional).** Write the text you want the first message to say, for example «Hi, I would like to book a table». The customer sees it already typed and only has to press send.
3. **Copy the link or download the QR.** Copy the link for your bio, your Google profile or your emails, or download the QR as PNG (for printing or social media) or SVG (for print shops and design, with no loss of quality).
4. **Add the button to your website.** Choose a regular or floating button, check the preview and copy the HTML. It works on any site that accepts HTML (WordPress, Wix, Shopify or a custom website).

### Features

- wa.me link with pre-filled message
- QR code as PNG and SVG
- HTML WhatsApp button for your website, regular or floating
- Number validation with plain-language errors
- Runs in the browser, no data sent

### Privacy

The number and message are processed in your browser and are never sent to or stored on any server. The QR code is generated locally with the [uqr](https://github.com/unjs/uqr) library (MIT).

### Good to know

- The link only works if that number has an active WhatsApp or WhatsApp Business account.
- The tool checks that the number has a valid shape, not that it exists or that it is yours: test it yourself before printing.
- If you change numbers, the old link and QR stop working: you will need to generate them again.
- The link opens a chat; it does not answer for you. For that you need an assistant connected to your WhatsApp.

### FAQ

**How do I create a WhatsApp link for my business?**
Type your number with the country code (34 for Spain) and, if you like, a message. The tool generates the wa.me link instantly, ready to copy, together with its QR code and the button for your website.

**Is it free? Do I need to sign up?**
It is free and you do not need to sign up or leave any details. The link and QR you generate are yours and do not expire while the number stays active on WhatsApp.

**Is my number or message stored?**
No. Everything is calculated in your browser with JavaScript: the number and the message are not sent to any server or stored in the website analytics.

**How do I make a WhatsApp QR code?**
Generate the link and press «Download PNG» or «Download SVG». The QR contains the wa.me link: scanning it with a phone camera opens the chat with your number and the pre-filled message.

**PNG or SVG?**
PNG is an image ready for social media, documents or home printing. SVG is a vector format: it does not lose quality when enlarged, so it is the one to send to a print shop or use in a design.

**Does it work with WhatsApp Business?**
Yes. The wa.me link is the same for WhatsApp and WhatsApp Business: it opens a chat with the number, whichever app it uses.

**Why does it say the number is not valid?**
Usually a digit is missing or extra, or the country code is missing. A Spanish mobile number has 9 digits and starts with 6 or 7. If the number is from another country, choose its code in the list or type it with a leading +.

**Can I add a WhatsApp button to my website without plugins?**
Yes. Copy the HTML the tool generates and paste it into an HTML block on your site. It loads no scripts or external resources, so it does not affect speed or cookies.

## Español

### Cómo se usa

1. **Elige el país y escribe el número.** Selecciona el prefijo (España, +34, viene marcado) y escribe el número de WhatsApp del negocio. Puedes pegarlo con espacios, guiones o con el + delante: la herramienta lo limpia.
2. **Añade un mensaje (opcional).** Escribe el texto con el que quieres que te llegue el primer mensaje, por ejemplo «Hola, quiero reservar mesa». El cliente lo verá ya escrito y solo tendrá que enviarlo.
3. **Copia el enlace o descarga el QR.** Copia el enlace para tu bio, tu ficha de Google o tus correos, o descarga el QR en PNG (para imprimir o subir a redes) o en SVG (para imprentas y diseño, sin perder calidad).
4. **Pon el botón en tu web.** Elige si quieres un botón normal o flotante, revisa la vista previa y copia el código HTML. Se pega en cualquier web que admita HTML (WordPress, Wix, Shopify o una web a medida).

### Qué incluye

- Enlace wa.me con mensaje predefinido
- Código QR en PNG y SVG
- Botón de WhatsApp en HTML para tu web, normal o flotante
- Validación del número con explicación del error
- Funciona en el navegador, sin enviar datos

### Privacidad

El número y el mensaje se procesan en tu navegador y no se envían ni se guardan en ningún servidor. El QR se genera en local con la librería [uqr](https://github.com/unjs/uqr) (MIT).

### Lo que conviene saber

- El enlace solo funciona si ese número tiene una cuenta de WhatsApp o WhatsApp Business activa.
- La herramienta comprueba que el número tenga una forma válida, no que exista ni que sea tuyo: pruébalo tú antes de imprimirlo.
- Si cambias de número, el enlace y el QR antiguos dejan de servir: tendrás que generarlos de nuevo.
- El enlace abre un chat; no responde por ti. Para eso hace falta un asistente conectado a tu WhatsApp.

### Preguntas frecuentes

**¿Cómo creo un enlace de WhatsApp para mi negocio?**
Escribe tu número con el prefijo del país (34 en España) y, si quieres, un mensaje. La herramienta genera el enlace wa.me al momento, listo para copiar, junto con su QR y el botón para tu web.

**¿Es gratis? ¿Tengo que registrarme?**
Es gratis y no hace falta registrarse ni dejar ningún dato. El enlace y el QR que generes son tuyos y no caducan mientras el número siga activo en WhatsApp.

**¿Se guarda mi número o mi mensaje?**
No. Todo se calcula en tu navegador con JavaScript: el número y el mensaje no se envían a ningún servidor ni se guardan en la analítica de la web.

**¿Cómo hago un QR de WhatsApp?**
Genera el enlace y pulsa «Descargar PNG» o «Descargar SVG». El QR contiene el enlace wa.me: al escanearlo con la cámara del móvil se abre el chat con tu número y el mensaje predefinido.

**¿PNG o SVG?**
PNG es una imagen lista para redes sociales, documentos o imprimir en casa. SVG es vectorial: no pierde calidad al ampliarlo, así que es el que conviene enviar a una imprenta o usar en un diseño.

**¿Funciona con WhatsApp Business?**
Sí. El enlace wa.me es el mismo para WhatsApp y WhatsApp Business: abre un chat con el número, sea cual sea la app que use.

**¿Por qué me dice que el número no es válido?**
Suele faltar o sobrar una cifra, o falta el prefijo del país. Un móvil español tiene 9 cifras y empieza por 6 o 7. Si el número es de otro país, elige su prefijo en el desplegable o escríbelo con el + delante.

**¿Puedo poner un botón de WhatsApp en mi web sin plugins?**
Sí. Copia el código HTML que genera la herramienta y pégalo en un bloque de HTML de tu web. No carga scripts ni recursos externos, así que no afecta a la velocidad ni a las cookies.

## Development / Desarrollo

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm test     # Vitest
pnpm lint     # tsc --noEmit
pnpm build    # dist/ (relative paths, works under any prefix)
```

React 19 + TypeScript + Vite + Tailwind CSS 4. The tool runs entirely in the browser: there is no backend, no analytics and no external request. It is the same code that runs on nanoredlabs.com, with the site-specific parts (router, analytics) replaced by small shims in `src/shims/` and `src/lib/analytics.ts`.

## License / Licencia

[MIT](LICENSE) © NanoRed Labs.

Hecho por / Made by [NanoRed Labs](https://nanoredlabs.com) (Málaga).
