'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const timeline = [
  { year: '1994', title: 'Founded',        desc: 'Jigar Art began in a small workshop with a 1 or 2 artisan and a vision to preserve traditional stone carving.' },
  { year: '2006', title: 'Expanded',       desc: 'Grew to a full team of 9-10 artisans. Started accepting custom and temple orders across Gujarat.' },
  { year: '2026', title: 'Today',          desc: '2000+ sculptures delivered. A trusted name in premium stone art with a legacy of devotion and craftsmanship.' },
]

const team = [
  { name: 'Dharmendra Pathak',   role: 'Founder', exp: '20+ years' },
  { name: 'Jigar Pathak',  role: 'Co-Founder',      exp: '15+ years' },
  { name: 'Jayesh Jani',    role: 'sculpturer',       exp: '10+ years' },
  { name: 'Devendra Sompura',    role: 'sculpturer',    exp: '10+ years' },
  { name: 'Vishal Sompura',    role: 'sculpturer',    exp: '6+ years' },
  { name: 'Harnil Sompura',    role: 'sculpturer',    exp: '2+ years' },
  { name: 'Yagnesh Sompura',    role: 'sculpturer',    exp: '2+ years' },
  { name: 'Mukesh Sompura',    role: 'sculpturer',    exp: '2+ years' },
  { name: 'Harsha Pathak',    role: 'Artist & Painter',    exp: '9+ years' },
  { name: 'Bharti Pathak',    role: 'Artist & Painter',    exp: '9+ years' }
]

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── Hero Banner ── */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-navy) 0%, #0F2340 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span className="section-label" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>Our Story</span>
          <h1 style={{ color: '#fff', marginBottom: '1.25rem' }}>
            Crafting <span className="text-gold-gradient">Divine</span> Stories in Stone
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.85 }}>
            Since 1994, Jigar Art has been the custodian of an ancient art form — transforming raw stone into expressions of faith, beauty, and enduring legacy.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        <div className="section">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(2rem, 6vw, 5rem)',
            alignItems: 'center',
          }}>
            <div>
              <span className="section-label">Our Mission</span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                Stone as a <span className="text-gold-gradient">Sacred Medium</span>
              </h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '1.25rem' }}>
                We believe stone is not just a material — it is a medium through which the divine speaks. Our mission is to honour this belief by crafting sculptures that carry spiritual energy, artistic excellence, and timeless beauty.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Every chisel stroke is a prayer. Every polished surface reflects generations of knowledge. We do not merely carve stone — we invite the divine to inhabit it.
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-gold)' }}>
                &ldquo;પ્રત્યેક મૂર્તિ એ ઈશ્વર સાથેનો સંવાદ છે.&rdquo;
              </p>
            </div>
            <div style={{
              position: 'relative',
              height: isMobile ? 300 : 460,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <Image
                src="/products/religion5.png"
                alt="Jigar Art Workshop"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                style={{ objectFit: 'contain', background: 'var(--color-cream)', padding: '2rem' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: 'var(--color-white)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Our Journey</span>
            <h2 style={{ marginTop: '0.75rem' }}>A Legacy <span className="text-gold-gradient">Built Over Time</span></h2>
            <div className="gold-divider" style={{ margin: '1rem auto 0' }} />
          </div>

          {isMobile ? (
            /* ── Mobile: left-aligned, no alternating ── */
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: 6,
                top: 0, bottom: 0,
                width: 2,
                background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
                borderRadius: 2,
              }} />

              {timeline.map(item => (
                <div key={item.year} style={{ position: 'relative', marginBottom: '2.25rem' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: -32,
                    top: 6,
                    width: 14, height: 14,
                    borderRadius: '50%',
                    background: 'var(--color-gold)',
                    boxShadow: '0 0 0 4px rgba(201,168,76,0.2)',
                    flexShrink: 0,
                  }} />

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-gold)',
                    lineHeight: 1,
                    marginBottom: '0.3rem',
                  }}>
                    {item.year}
                  </div>
                  <h4 style={{ marginBottom: '0.35rem', fontSize: '1.05rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            /* ── Desktop: alternating left/right ── */
            <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
              {/* Centre line */}
              <div style={{
                position: 'absolute',
                left: '50%', top: 0, bottom: 0,
                width: 1,
                background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
                transform: 'translateX(-50%)',
              }} />

              {timeline.map((item, i) => (
                <div key={item.year} style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start',
                  marginBottom: '2.5rem',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}>
                  <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                      {item.year}
                    </div>
                    <h4 style={{ marginBottom: '0.4rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem' }}>{item.desc}</p>
                  </div>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 6,
                    background: 'var(--color-gold)',
                    boxShadow: '0 0 0 4px rgba(201,168,76,0.2)',
                  }} />
                  <div style={{ flex: 1 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>The People</span>
            <h2 style={{ marginTop: '0.75rem' }}>Meet Our <span className="text-gold-gradient">Artisans</span></h2>
            <div className="gold-divider" style={{ margin: '1rem auto 0' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {team.map(member => (
              <div key={member.name} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#fff', fontWeight: 600,
                }}>
                  {member.name[0]}
                </div>
                <h4 style={{ marginBottom: '0.25rem' }}>{member.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-gold)', marginBottom: '0.5rem', fontWeight: 500 }}>{member.role}</p>
                <p style={{ fontSize: '0.8rem' }}>{member.exp} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--color-navy)', padding: '4rem clamp(1.25rem, 5vw, 5rem)', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to Own a Masterpiece?</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
          Browse our full collection or reach out for a custom order.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" className="btn-primary">Browse Products</Link>
          <Link href="/contact" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Contact Us</Link>
        </div>
      </section>

    </div>
  )
}
