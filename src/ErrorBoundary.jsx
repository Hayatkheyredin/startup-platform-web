/**
 * ErrorBoundary - Catches React errors and displays them instead of blank page.
 */
import React from 'react'

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-surface font-sans">
          <div className="max-w-lg w-full bg-white rounded-card shadow-card border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
            <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-auto text-text-muted">
              {this.state.error?.toString()}
            </pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
