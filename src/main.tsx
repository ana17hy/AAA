import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App.tsx'
import { TokenProvider } from './contexts/TokenContext.tsx'
import { MockDataProvider } from './contexts/MockDataContext.tsx'
import { StudentProvider } from './contexts/StudentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <StudentProvider>
          <MockDataProvider>
            <App />
          </MockDataProvider>
        </StudentProvider>
      </TokenProvider>
    </BrowserRouter>
  </StrictMode>,)