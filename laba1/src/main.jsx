// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TrafficLightsProvider } from './TrafficLightsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TrafficLightsProvider>
        <App />
      </TrafficLightsProvider>
    </BrowserRouter>
  </StrictMode>,
)