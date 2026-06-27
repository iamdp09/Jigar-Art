'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error for monitoring (replace with Sentry/similar in production)
    console.error('[JigarArt] Unhandled error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #1a1a2e 0%, #0F2340 100%)',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          color: '#fff',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🪨</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
            An unexpected error occurred. Please try refreshing the page or contact us directly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.8rem 2rem',
                background: '#C9A84C',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '0.8rem 2rem',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
