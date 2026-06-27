'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/data/products'
import { useEffect, useRef } from 'react'

const WA = '917990748466'
const BLUR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y1RjBFOCIvPjwvc3ZnPg=="

/* Single IntersectionObserver shared across all cards — far cheaper than one per card */
let sharedObserver: IntersectionObserver | null = null
function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          sharedObserver!.unobserve(el)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  }
  return sharedObserver
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])
  return (
    <div ref={ref} style={{
      opacity: 0,
      transform: 'translateY(24px)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  )
}

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 3)

  return (
    <section style={{
      background: 'var(--color-white)',
      padding: 'clamp(4rem, 8vw, 7rem) 0',
      contentVisibility: 'auto',
      containIntrinsicSize: '0 600px',
    } as React.CSSProperties}>
      <div className="section">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">Our Craftsmanship</span>
            <h2 style={{ marginTop: '0.75rem' }}>
              Featured <span className="text-gold-gradient">Sculptures</span>
            </h2>
            <div className="gold-divider" style={{ margin: '1rem auto 0' }} />
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 100}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 280, background: 'var(--color-cream)', overflow: 'hidden' }}>
                  <Image
                    src={product.image}
                    alt={`${product.name} — handcrafted ${product.material} by Jigar Art`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    quality={85}
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={BLUR}
                    style={{ objectFit: 'contain', padding: '1rem', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(6px)',
                    padding: '0.3rem 0.75rem', borderRadius: 20,
                    fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)', textTransform: 'uppercase',
                  }}>
                    {product.material}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
                      {product.nameGu}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.875rem', flex: 1 }}>{product.description}</p>
                  <a
                    href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi! I'm interested in "${product.name}". Please share more details.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}
                  >
                    Know More
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" className="btn-outline" id="view-all-products-btn">
            View All Sculptures →
          </Link>
        </div>
      </div>
    </section>
  )
}
