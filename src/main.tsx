import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Page } from './Page'
import { WhatsAppLinkTool } from './components/whatsapp-link-tool'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page Tool={WhatsAppLinkTool} />
  </StrictMode>,
)
