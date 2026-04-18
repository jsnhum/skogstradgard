import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Startsida from './Startsida.jsx'
import App from './App.jsx'
import VaxtLista from './VaxtLista.jsx'
import Om from './Om.jsx'
import ArtsSida from './ArtsSida.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Startsida />} />
        <Route path="/karta" element={<App />} />
        <Route path="/lista" element={<VaxtLista />} />
        <Route path="/om" element={<Om />} />
        <Route path="/arter/:id" element={<ArtsSida />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
