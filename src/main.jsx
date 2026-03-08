/**
 * Main entry point for the MELIKA (women-led business platform) web app.
 * Uses dynamic import to catch load errors and display them.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import './styles/global.css'

const root = document.getElementById('root')

function showError(msg, err) {
  if (root) {
    root.innerHTML = '<div style="padding: 2rem; font-family: sans-serif; max-width: 600px; margin: 0 auto;">' +
      '<h2 style="color: #c00;">Failed to load app</h2>' +
      '<p>' + msg + '</p>' +
      '<pre style="background: #f5f5f5; padding: 1rem; overflow: auto; font-size: 12px;">' +
      (err?.message || '') + '\n\n' + (err?.stack || '') + '</pre>' +
      '</div>'
  }
  console.error(err)
}

if (!root) {
  document.body.innerHTML = '<pre style="padding:20px;color:red">Error: #root element not found</pre>'
} else {
  import('./App')
    .then(({ default: App }) => {
      ReactDOM.createRoot(root).render(
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      )
    })
    .catch((err) => {
      showError('The app failed to load. This may be an import or module error.', err)
    })
}
