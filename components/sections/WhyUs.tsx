'use client'
import { useEffect, useRef } from 'react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.06 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: 0, transform: 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const pillars = [
  { icon: '#1', title: 'Master Craftsmanship', titleGu: 'કારીગરી', description: 'Every sculpture is hand-carved by artisans trained through generations of traditional stone carving passed down in our family.' },
  { icon: '#2', title: 'Premium Stone',        titleGu: 'ઉત્કૃષ્ટ પત્થર', description: 'We source only the finest quality marble, granite, and Dhrangadhra sandstone directly from acclaimed quarries across India.' },
  { icon: '#3', title: 'Precise Detail',       titleGu: 'ચોક્કસ વિગત', description: 'Our artisans achieve intricate detail work that brings divine figures to life — from fine jewellery to facial expressions.' },
  { icon: '#4', title: 'Custom Design',        titleGu: 'કસ્ટમ ડિઝાઇન', description: 'Have a vision? We craft custom sculptures to your exact specifications, size, and stone preference. No design is too complex.' },
  { icon: '#5', title: 'Safe Delivery',        titleGu: 'સુરક્ષિત ડિલિવરી', description: 'Every sculpture is carefully packed and delivered with full care anywhere across India.' },
  { icon: '#6', title: 'Sacred Intent',        titleGu: 'પવિત્ર ઉદ્દેશ', description: 'We approach every carving as a sacred act — each piece is crafted with devotion, care, and reverence for the divine.' },
]

export default function WhyUs() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, var(--color-navy) 0%, #0F2340 100%)',
      padding: 'clamp(4rem, 8vw, 7rem) 0',
      contentVisibility: 'auto',
      containIntrinsicSize: '0 600px',
    } as React.CSSProperties}>
      <div className="section">
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-gold)',
            }}>
              Why Choose Us
            </span>
            <h2 style={{ marginTop: '0.75rem', color: '#fff' }}>
              The Jigar Art <span className="text-gold-gradient">Promise</span>
            </h2>
            <div className="gold-divider" style={{ margin: '1rem auto 0' }} />
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 70}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                  cursor: 'default',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(201,168,76,0.08)'
                  el.style.borderColor = 'rgba(201,168,76,0.3)'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.04)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#f4e6d1' }}>{p.icon}</div>
                <h4 style={{ color: '#fff', marginBottom: '0.25rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontStyle: 'italic', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                  {p.titleGu}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.75 }}>
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
