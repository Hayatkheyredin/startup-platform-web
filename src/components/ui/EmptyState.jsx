/**
 * EmptyState - Elegant empty state for lists/tables with little or no data.
 */
import React from 'react'

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4">
        {Icon ? <Icon className="w-8 h-8" /> : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-text-muted text-center max-w-sm mb-6">{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
