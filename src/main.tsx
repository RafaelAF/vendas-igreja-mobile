import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ModaisProvider } from './contexts/modaisContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModaisProvider>
      <App />
    </ModaisProvider>
  </React.StrictMode>,
)
