// Textos de la página (ES/EN). Generados a partir de los de nanoredlabs.com.
export interface PageContent {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; answer: string; toolTitle: string; howToTitle: string
  howToSteps: [string, string][]
  sections: { title: string; paragraphs?: string[]; list?: string[] }[]
  limitsTitle: string; limits: string[]; faqTitle: string; faqs: [string, string][]
}

export const content: Record<'es' | 'en', PageContent> = {
  "es": {
    "metaTitle": "Generador de enlace de WhatsApp y QR gratis | NanoRed Labs",
    "metaDescription": "Crea gratis tu enlace wa.me con mensaje predefinido, su código QR en PNG y SVG y el botón de WhatsApp para tu web. Todo en tu navegador, sin registrarte.",
    "eyebrow": "Herramienta gratuita · Sin registro",
    "h1": "Generador de enlace de WhatsApp y QR gratis",
    "answer": "Esta herramienta gratuita de NanoRed Labs (Málaga) crea el enlace wa.me de tu número de WhatsApp, con un mensaje predefinido si quieres, su código QR para descargar en PNG o SVG y el código HTML de un botón para tu web. Funciona entera en tu navegador: el número y el mensaje no se envían a ningún servidor ni se guardan.",
    "toolTitle": "Crea tu enlace de WhatsApp",
    "howToTitle": "Cómo se usa",
    "howToSteps": [
      [
        "Elige el país y escribe el número",
        "Selecciona el prefijo (España, +34, viene marcado) y escribe el número de WhatsApp del negocio. Puedes pegarlo con espacios, guiones o con el + delante: la herramienta lo limpia."
      ],
      [
        "Añade un mensaje (opcional)",
        "Escribe el texto con el que quieres que te llegue el primer mensaje, por ejemplo «Hola, quiero reservar mesa». El cliente lo verá ya escrito y solo tendrá que enviarlo."
      ],
      [
        "Copia el enlace o descarga el QR",
        "Copia el enlace para tu bio, tu ficha de Google o tus correos, o descarga el QR en PNG (para imprimir o subir a redes) o en SVG (para imprentas y diseño, sin perder calidad)."
      ],
      [
        "Pon el botón en tu web",
        "Elige si quieres un botón normal o flotante, revisa la vista previa y copia el código HTML. Se pega en cualquier web que admita HTML (WordPress, Wix, Shopify o una web a medida)."
      ]
    ],
    "sections": [
      {
        "title": "Qué es un enlace wa.me",
        "paragraphs": [
          "Un enlace wa.me es la dirección oficial de WhatsApp para abrir un chat con un número sin tenerlo guardado en la agenda. Tiene la forma https://wa.me/34612345678: el número va en formato internacional, solo con cifras, sin el + ni espacios.",
          "Si le añades ?text= seguido de un mensaje codificado, el chat se abre con ese texto ya escrito. Así el cliente no tiene que pensar qué decir y tú sabes desde el primer mensaje de dónde viene o qué quiere.",
          "Funciona en el móvil (abre la app de WhatsApp o WhatsApp Business) y en el ordenador (abre WhatsApp Web o la app de escritorio)."
        ]
      },
      {
        "title": "Dónde ponerlo para que te escriban",
        "list": [
          "Tarjeta de visita y folletos: el QR en una esquina, con una frase del tipo «Escríbenos por WhatsApp».",
          "Ficha de Google (Perfil de Empresa): el enlace en el campo de web o de reservas, o en una publicación.",
          "Instagram, TikTok y Facebook: el enlace en la bio o en el botón de contacto del perfil.",
          "Mesa del local, mostrador y escaparate: un QR impreso para pedir, reservar o pedir la cuenta sin esperar.",
          "Firma de correo y facturas: una línea con el enlace para dudas rápidas.",
          "Tu web: el botón flotante de WhatsApp, visible en todas las páginas."
        ]
      },
      {
        "title": "Consejos para el mensaje predefinido",
        "list": [
          "Corto y en primera persona del cliente: «Hola, quiero pedir cita para…».",
          "Un mensaje distinto por canal (tarjeta, Instagram, mesa) te dice de dónde llega cada conversación.",
          "Sin datos personales en el enlace: el texto viaja dentro de la dirección y lo puede ver cualquiera que la tenga.",
          "Cuanto más largo es el mensaje, más denso es el QR: si lo vas a imprimir pequeño, acórtalo."
        ]
      }
    ],
    "limitsTitle": "Lo que conviene saber",
    "limits": [
      "El enlace solo funciona si ese número tiene una cuenta de WhatsApp o WhatsApp Business activa.",
      "La herramienta comprueba que el número tenga una forma válida, no que exista ni que sea tuyo: pruébalo tú antes de imprimirlo.",
      "Si cambias de número, el enlace y el QR antiguos dejan de servir: tendrás que generarlos de nuevo.",
      "El enlace abre un chat; no responde por ti. Para eso hace falta un asistente conectado a tu WhatsApp."
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqs": [
      [
        "¿Cómo creo un enlace de WhatsApp para mi negocio?",
        "Escribe tu número con el prefijo del país (34 en España) y, si quieres, un mensaje. La herramienta genera el enlace wa.me al momento, listo para copiar, junto con su QR y el botón para tu web."
      ],
      [
        "¿Es gratis? ¿Tengo que registrarme?",
        "Es gratis y no hace falta registrarse ni dejar ningún dato. El enlace y el QR que generes son tuyos y no caducan mientras el número siga activo en WhatsApp."
      ],
      [
        "¿Se guarda mi número o mi mensaje?",
        "No. Todo se calcula en tu navegador con JavaScript: el número y el mensaje no se envían a ningún servidor ni se guardan en la analítica de la web."
      ],
      [
        "¿Cómo hago un QR de WhatsApp?",
        "Genera el enlace y pulsa «Descargar PNG» o «Descargar SVG». El QR contiene el enlace wa.me: al escanearlo con la cámara del móvil se abre el chat con tu número y el mensaje predefinido."
      ],
      [
        "¿PNG o SVG?",
        "PNG es una imagen lista para redes sociales, documentos o imprimir en casa. SVG es vectorial: no pierde calidad al ampliarlo, así que es el que conviene enviar a una imprenta o usar en un diseño."
      ],
      [
        "¿Funciona con WhatsApp Business?",
        "Sí. El enlace wa.me es el mismo para WhatsApp y WhatsApp Business: abre un chat con el número, sea cual sea la app que use."
      ],
      [
        "¿Por qué me dice que el número no es válido?",
        "Suele faltar o sobrar una cifra, o falta el prefijo del país. Un móvil español tiene 9 cifras y empieza por 6 o 7. Si el número es de otro país, elige su prefijo en el desplegable o escríbelo con el + delante."
      ],
      [
        "¿Puedo poner un botón de WhatsApp en mi web sin plugins?",
        "Sí. Copia el código HTML que genera la herramienta y pégalo en un bloque de HTML de tu web. No carga scripts ni recursos externos, así que no afecta a la velocidad ni a las cookies."
      ]
    ]
  },
  "en": {
    "metaTitle": "Free WhatsApp link and QR code generator | NanoRed Labs",
    "metaDescription": "Create your wa.me link with a pre-filled message, its QR code as PNG and SVG and a WhatsApp button for your website. Free, no sign-up, all in your browser.",
    "eyebrow": "Free tool · No sign-up",
    "h1": "Free WhatsApp link and QR code generator",
    "answer": "This free tool by NanoRed Labs (Málaga, Spain) creates the wa.me link for your WhatsApp number, with an optional pre-filled message, a QR code to download as PNG or SVG and the HTML for a button on your website. It runs entirely in your browser: the number and message are never sent to a server or stored.",
    "toolTitle": "Create your WhatsApp link",
    "howToTitle": "How to use it",
    "howToSteps": [
      [
        "Choose the country and type the number",
        "Pick the country code (Spain, +34, is selected by default) and type your business WhatsApp number. You can paste it with spaces, dashes or a leading +: the tool cleans it up."
      ],
      [
        "Add a message (optional)",
        "Write the text you want the first message to say, for example «Hi, I would like to book a table». The customer sees it already typed and only has to press send."
      ],
      [
        "Copy the link or download the QR",
        "Copy the link for your bio, your Google profile or your emails, or download the QR as PNG (for printing or social media) or SVG (for print shops and design, with no loss of quality)."
      ],
      [
        "Add the button to your website",
        "Choose a regular or floating button, check the preview and copy the HTML. It works on any site that accepts HTML (WordPress, Wix, Shopify or a custom website)."
      ]
    ],
    "sections": [
      {
        "title": "What is a wa.me link?",
        "paragraphs": [
          "A wa.me link is WhatsApp’s official address for opening a chat with a number without saving it as a contact. It looks like https://wa.me/34612345678: the number goes in international format, digits only, without the + or spaces.",
          "If you add ?text= followed by an encoded message, the chat opens with that text already typed. The customer does not have to think about what to say, and you know from the first message where they came from or what they want.",
          "It works on mobile (opening the WhatsApp or WhatsApp Business app) and on desktop (opening WhatsApp Web or the desktop app)."
        ]
      },
      {
        "title": "Where to put it so people message you",
        "list": [
          "Business cards and flyers: the QR in a corner with a line such as «Message us on WhatsApp».",
          "Google Business Profile: the link in the website or booking field, or in a post.",
          "Instagram, TikTok and Facebook: the link in your bio or in the profile contact button.",
          "Tables, counter and shop window: a printed QR to order, book or ask for the bill without waiting.",
          "Email signature and invoices: a line with the link for quick questions.",
          "Your website: a floating WhatsApp button, visible on every page."
        ]
      },
      {
        "title": "Tips for the pre-filled message",
        "list": [
          "Short and in the customer’s voice: «Hi, I would like an appointment for…».",
          "A different message per channel (card, Instagram, table) tells you where each conversation comes from.",
          "No personal data in the link: the text travels inside the address and anyone who has it can read it.",
          "The longer the message, the denser the QR: if you will print it small, keep it short."
        ]
      }
    ],
    "limitsTitle": "Good to know",
    "limits": [
      "The link only works if that number has an active WhatsApp or WhatsApp Business account.",
      "The tool checks that the number has a valid shape, not that it exists or that it is yours: test it yourself before printing.",
      "If you change numbers, the old link and QR stop working: you will need to generate them again.",
      "The link opens a chat; it does not answer for you. For that you need an assistant connected to your WhatsApp."
    ],
    "faqTitle": "Frequently asked questions",
    "faqs": [
      [
        "How do I create a WhatsApp link for my business?",
        "Type your number with the country code (34 for Spain) and, if you like, a message. The tool generates the wa.me link instantly, ready to copy, together with its QR code and the button for your website."
      ],
      [
        "Is it free? Do I need to sign up?",
        "It is free and you do not need to sign up or leave any details. The link and QR you generate are yours and do not expire while the number stays active on WhatsApp."
      ],
      [
        "Is my number or message stored?",
        "No. Everything is calculated in your browser with JavaScript: the number and the message are not sent to any server or stored in the website analytics."
      ],
      [
        "How do I make a WhatsApp QR code?",
        "Generate the link and press «Download PNG» or «Download SVG». The QR contains the wa.me link: scanning it with a phone camera opens the chat with your number and the pre-filled message."
      ],
      [
        "PNG or SVG?",
        "PNG is an image ready for social media, documents or home printing. SVG is a vector format: it does not lose quality when enlarged, so it is the one to send to a print shop or use in a design."
      ],
      [
        "Does it work with WhatsApp Business?",
        "Yes. The wa.me link is the same for WhatsApp and WhatsApp Business: it opens a chat with the number, whichever app it uses."
      ],
      [
        "Why does it say the number is not valid?",
        "Usually a digit is missing or extra, or the country code is missing. A Spanish mobile number has 9 digits and starts with 6 or 7. If the number is from another country, choose its code in the list or type it with a leading +."
      ],
      [
        "Can I add a WhatsApp button to my website without plugins?",
        "Yes. Copy the HTML the tool generates and paste it into an HTML block on your site. It loads no scripts or external resources, so it does not affect speed or cookies."
      ]
    ]
  }
}

export const meta = {
  "site": "https://nanoredlabs.com",
  "repo": "https://github.com/ZzJordan/nanored-whatsapp-link-generator",
  "urls": {
    "es": "https://nanoredlabs.com/herramientas/generador-enlace-whatsapp",
    "en": "https://nanoredlabs.com/en/tools/whatsapp-link-generator"
  },
  "disclaimer": {
    "es": "NanoRed Labs (también escrito «Nano Red Labs») es el negocio de Jordan Moyano en Málaga. No tiene relación con Nano RED Biotechnology ni con otras empresas de nombre parecido.",
    "en": "NanoRed Labs (also written “Nano Red Labs”) is Jordan Moyano’s business in Málaga. It is not related to Nano RED Biotechnology or to other companies with a similar name."
  }
}
