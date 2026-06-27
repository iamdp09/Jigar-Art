'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

// Load the 3D viewer only on client — no SSR, completely deferred
const ShivaGLBViewer = dynamic(
  () => import('@/components/3d/ShivaGLBViewer'),
  { ssr: false }
)

// Cream blur placeholder — shown instantly while images load
const BLUR_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y1RjBFOCIvPjwvc3ZnPg=="

export default function HeroSection() {
  const [visible,   setVisible]   = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  // Start with 3D viewer immediately — no pre-check fetch
  // If GLB fails to load the viewer shows its own error state gracefully
  const [show3D,    setShow3D]    = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    // Show text content immediately
    setVisible(true)

    // Defer 3D init until after first paint — don't block LCP
    const t3d = setTimeout(() => setShow3D(true), 400)

    return () => {
      clearTimeout(t3d)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const canvasH = isMobile ? 320 : 600

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F5EFE0 0%, #F0E8D4 55%, #EDE4CC 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
        // Use will-change sparingly — only on the section itself
        contain: 'layout style',
      }}
    >
      {/* ── Sacred dot pattern — pure CSS, no JS, GPU-composited ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        opacity: 0.3,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* ── OM watermark — pure CSS, no animation needed ── */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '50%' : '8%',
        top: '50%',
        transform: isMobile ? 'translate(50%, -50%)' : 'translateY(-50%)',
        fontSize: 'clamp(200px, 30vw, 400px)',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-gold)',
        opacity: 0.035,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}>ॐ</div>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: 1340, margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 5rem)',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.15fr',
        alignItems: 'center',
        gap: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 5rem)',
        paddingBottom: isMobile ? '3rem' : 'clamp(2rem, 5vw, 5rem)',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* ── LEFT: Text content — renders immediately, no delay ── */}
        <div style={{
          order: isMobile ? 2 : 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          textAlign: isMobile ? 'center' : 'left',
          willChange: 'opacity, transform',
        }}>

          <div className="section-label" style={{
            marginBottom: '1.5rem',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            Premium Stone Art
          </div>

          <h1 style={{ marginBottom: '1.4rem', lineHeight: 1.08, fontWeight: 600 }}>
            Where Stone<br />
            <span className="text-gold-shimmer">Becomes</span>{' '}
            Sacred Art
          </h1>

          <div className="gold-divider" style={{
            margin: isMobile ? '1.2rem auto 1.8rem' : '1.2rem 0 1.8rem',
          }} />

          <p style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.12rem)',
            maxWidth: 480,
            marginBottom: '1.8rem',
            lineHeight: 1.9,
            margin: isMobile ? '0 auto 1.8rem' : '0 0 1.8rem',
          }}>
            Jigar Art brings centuries of stone carving tradition to life.
            Each sculpture is handcrafted by experienced artisans, capturing
            divine details with unparalleled precision.
          </p>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            fontStyle: 'italic',
            color: 'var(--color-gold-dark)',
            marginBottom: '2.2rem',
            opacity: 0.9,
            letterSpacing: '0.02em',
          }}>
            &ldquo;જય ગુરૂદેવ&rdquo;
          </p>

          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            marginBottom: '3rem',
          }}>
            <Link href="/products" className="btn-primary" id="hero-explore-btn">
              Explore Collection
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/contact" className="btn-outline" id="hero-contact-btn">
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            paddingTop: '1.8rem',
            borderTop: '1px solid var(--color-border-gold)',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            {[
              { num: '500+',  label: 'Sculptures' },
              { num: '17+',   label: 'Years' },
              { num: '400+',  label: 'Clients' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 600, color: 'var(--color-gold)', lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--color-text-muted)',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  marginTop: 5, fontFamily: 'var(--font-sans)',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Viewer — deferred 400ms so text renders first ── */}
        <div style={{
          order: isMobile ? 1 : 2,
          position: 'relative',
          height: canvasH,
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
          transition: 'opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.15s',
          willChange: 'opacity, transform',
        }}>

          {/* Subtle static glow — no animation, no blur, GPU-cheap */}
          <div style={{
            position: 'absolute', inset: '10% 15%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Viewer or placeholder skeleton */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            {show3D ? (
              <ShivaGLBViewer height={canvasH} />
            ) : (
              /* Cream skeleton shown for first 400ms — feels instant */
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  color: 'var(--color-gold)',
                  opacity: 0.12,
                  lineHeight: 1,
                }}>ॐ</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        opacity: visible ? 0.5 : 0,
        transition: 'opacity 0.8s ease 0.8s',
        zIndex: 3,
      }}>
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-sans)',
        }}>Scroll</span>
        <div style={{
          width: 1.5, height: 36,
          background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          animation: 'float 2.2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
