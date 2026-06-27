'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Load the 3D viewer only on client — no SSR
const ShivaGLBViewer = dynamic(
  () => import('@/components/3d/ShivaGLBViewer'),
  { ssr: false }
)

// Check if the GLB file exists at runtime (client-side)
async function checkModelExists(): Promise<boolean> {
  try {
    const res = await fetch('/shiva-model.glb', { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

export default function HeroSection() {
  const [visible,    setVisible]    = useState(false)
  const [isMobile,   setIsMobile]   = useState(false)
  const [hasModel,   setHasModel]   = useState<boolean | null>(null)  // null = checking
  const [particles,  setParticles]  = useState<Array<{
    id: number; left: string; top: string; size: number
    delay: number; duration: number; opacity: number
  }>>([])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Staggered entrance
    const t = setTimeout(() => setVisible(true), 80)

    // Gold dust ambient particles
    setParticles(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:     `${5 + Math.random() * 90}%`,
      top:      `${5 + Math.random() * 90}%`,
      size:     1.5 + Math.random() * 2.5,
      delay:    Math.random() * 6,
      duration: 5 + Math.random() * 5,
      opacity:  0.15 + Math.random() * 0.2,
    })))

    // Check if model file exists
    checkModelExists().then(setHasModel)

    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const canvasH = isMobile ? 340 : 620

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 70% 60% at 72% 55%, rgba(201,168,76,0.10) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 25% 30%, rgba(201,168,76,0.05) 0%, transparent 60%),
          linear-gradient(180deg, #F5EFE0 0%, #F0E8D4 50%, #EDE4CC 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* ── Sacred dot pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.18) 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        opacity: 0.35,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* ── OM watermark behind right side ── */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '50%' : '8%',
        top: '50%',
        transform: isMobile ? 'translate(50%, -50%)' : 'translateY(-50%)',
        fontSize: 'clamp(220px, 32vw, 420px)',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-gold)',
        opacity: 0.04,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}>ॐ</div>

      {/* ── Floating gold dust ── */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-gold-light), var(--color-gold))',
          opacity: p.opacity,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      ))}

      {/* ── Incense smoke wisps ── */}
      {!isMobile && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 0,
          left: `${58 + i * 4}%`,
          width: 2,
          height: 100,
          background: 'linear-gradient(to top, rgba(201,168,76,0.3), transparent)',
          borderRadius: 2,
          animation: `incense-rise ${4 + i * 1.5}s ease-out ${i * 1.2}s infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      ))}

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

        {/* ── LEFT: Text content ── */}
        <div style={{
          order: isMobile ? 2 : 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(36px)',
          transition: 'opacity 1s ease, transform 1s cubic-bezier(0.4,0,0.2,1)',
          textAlign: isMobile ? 'center' : 'left',
        }}>

          {/* Section label */}
          <div className="section-label" style={{
            marginBottom: '1.5rem',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            Premium Stone Art
          </div>

          {/* Main heading */}
          <h1 style={{
            marginBottom: '1.4rem',
            lineHeight: 1.08,
            fontWeight: 600,
          }}>
            Where Stone<br />
            <span className="text-gold-shimmer">Becomes</span>{' '}
            Sacred Art
          </h1>

          {/* Decorative divider */}
          <div className="gold-divider" style={{
            margin: isMobile ? '1.2rem auto 1.8rem' : '1.2rem 0 1.8rem',
          }} />

          {/* Description */}
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

          {/* Gujarati tagline */}
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

          {/* CTA buttons */}
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
              { num: '2000+',  label: 'Sculptures' },
              { num: '30+',   label: 'Years' },
              { num: '1500+', label: 'Clients' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginTop: 5,
                  fontFamily: 'var(--font-sans)',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: 3D Model or Fallback Image ── */}
        <div style={{
          order: isMobile ? 1 : 2,
          position: 'relative',
          height: canvasH,
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          transition: 'opacity 1.2s ease 0.2s, transform 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>

          {/* Radial gold glow behind model */}
          <div style={{
            position: 'absolute',
            inset: '5% 10%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'glow-breathe 4s ease-in-out infinite',
          }} />

          {/* Model or fallback image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            {hasModel ? (
              <ShivaGLBViewer height={canvasH} />
            ) : hasModel === false ? (
              /* Fallback: display the PNG until GLB is placed */
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Image
                  src="/shiva.png"
                  alt="Lord Shiva stone sculpture by Jigar Art"
                  width={403}
                  height={619}
                  priority
                  style={{
                    maxHeight: canvasH - 40,
                    width: 'auto', height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 48px rgba(100,80,20,0.22))',
                    animation: 'float-slow 9s ease-in-out infinite',
                  }}
                />
              </div>
            ) : null /* checking… */ }
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        opacity: visible ? 0.55 : 0,
        transition: 'opacity 1s ease 1.2s',
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
