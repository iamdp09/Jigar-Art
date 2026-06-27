'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.6s ease ${delay}ms` }}>{children}</div>
}

export default function AboutTeaser() {
  return (
    <section style={{ background: 'var(--color-cream)', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'center',
        }} className="about-grid">
          {/* Image side */}
          <ScrollReveal>
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                height: 480,
                position: 'relative',
                boxShadow: 'var(--shadow-lg)',
              }}>
                <Image src="/products/religion5.png" alt="Jigar Art Stone Sculpture" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'contain', background: 'var(--color-cream)', padding: '1.5rem' }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: -20, right: -20,
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
                color: '#fff', padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-gold)',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, lineHeight: 1 }}>30+</div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Years of Mastery</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal delay={150}>
            <span className="section-label">Our Story</span>
            <h2 style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
              A Legacy Carved in <span className="text-gold-gradient">Stone</span>
            </h2>
            <div className="gold-divider" />
            <p style={{ marginBottom: '1.25rem' }}>
              Jigar Art was born from a deep passion for preserving the ancient art of stone carving. For over 30 years, our experienced artisans have transformed raw stone into divine expressions of faith, beauty, and heritage.
            </p>
            <p style={{ marginBottom: '2rem' }}>
              Every sculpture that leaves our workshop carries with it the devotion of the artisan who crafted it — a living connection between the hands that carved and the hearts that receive.
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { icon: '✦', title: 'Premium Materials', desc: 'Only the finest marble, granite & sandstone' },
                { icon: '✦', title: 'Handcrafted', desc: 'Every detail shaped by skilled artisan hands' },
                { icon: '✦', title: 'Custom Orders', desc: 'Bespoke sculptures tailored to your vision' },
              ].map(v => (
                <div key={v.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', marginTop: 2 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: 2 }}>{v.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary" id="about-learn-more-btn">
              Learn Our Story →
            </Link>
          </ScrollReveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
