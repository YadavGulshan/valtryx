import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HeliaProvider } from './provider/helia_provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <HeliaProvider>
      <App />
    </HeliaProvider>
  </React.StrictMode>,
)
