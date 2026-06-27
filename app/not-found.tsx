import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, var(--color-navy) 0%, #0F2340 100%)',
      textAlign: 'center',
      padding: '2rem',
      paddingTop: 72,
    }}>
      {/* OM symbol */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '5rem',
        color: 'var(--color-gold)',
        opacity: 0.4,
        marginBottom: '1rem',
        lineHeight: 1,
      }}>ॐ</div>

      <h1 style={{
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(4rem, 12vw, 8rem)',
        fontWeight: 600,
        lineHeight: 1,
        color: 'var(--color-gold)',
        marginBottom: '0.5rem',
      }}>
        404
      </h1>

      <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
        Page Not Found
      </h2>

      <p style={{
        color: 'rgba(255,255,255,0.6)',
        maxWidth: 400,
        lineHeight: 1.8,
        marginBottom: '2.5rem',
        fontSize: '0.95rem',
      }}>
        Like a sculpture still waiting to be carved, this page hasn&apos;t taken shape yet.
        Let&apos;s take you back.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/products" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
          View Sculptures
        </Link>
      </div>
    </div>
  )
}
