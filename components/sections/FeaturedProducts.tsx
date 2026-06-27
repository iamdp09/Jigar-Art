'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/data/products'
import { useEffect, useRef } from 'react'

const WA_NUMBER = '917990748466'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(30px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 3)

  return (
    <section style={{ background: 'var(--color-white)', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="section">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">Our Craftsmanship</span>
            <h2 style={{ marginTop: '0.75rem' }}>Featured <span className="text-gold-gradient">Sculptures</span></h2>
            <div className="gold-divider" style={{ margin: '1rem auto 0' }} />
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 120}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 280, background: 'var(--color-cream)', overflow: 'hidden' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'contain', padding: '1rem', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
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
                    <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>{product.nameGu}</p>
                  </div>
                  <p style={{ fontSize: '0.875rem', flex: 1 }}>{product.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in "${product.name}". Please share more details.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" className="btn-outline" id="view-all-products-btn">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
