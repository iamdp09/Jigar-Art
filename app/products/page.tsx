'use client'
import Image from 'next/image'
import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/data/products'

const WA_NUMBER = '917990748466'

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div style={{ paddingTop: 78 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-navy) 0%, #0F2340 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
        textAlign: 'center',
      }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Our Collection</span>
        <h1 style={{ color: '#fff', marginBottom: '1rem' }}>
          Premium <span className="text-gold-gradient">Stone Sculptures</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 550, margin: '0 auto' }}>
          Each piece is a unique work of art — handcrafted with devotion, precision, and the finest stone.
        </p>
      </section>

      {/* Category Filter */}
      <section style={{ background: 'var(--color-white)', padding: '2rem clamp(1.25rem, 5vw, 5rem)', borderBottom: '1px solid var(--color-border)', marginBottom: '-100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: 24,
                border: '1.5px solid',
                borderColor: activeCategory === cat ? 'var(--color-gold)' : 'var(--color-border)',
                background: activeCategory === cat ? 'var(--color-gold)' : 'transparent',
                color: activeCategory === cat ? '#fff' : 'var(--color-text)',
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="section">
          <p style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Showing {filtered.length} sculpture{filtered.length !== 1 ? 's' : ''}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '2rem' }}>
            {filtered.map(product => (
              <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: 260, background: 'var(--color-cream)', overflow: 'hidden' }}>
                  <Image
                    src={product.image}
                    alt={`${product.name} — handcrafted ${product.material} sculpture by Jigar Art, Dhrangadhra`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    priority={product.id <= 3}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y1RjBFOCIvPjwvc3ZnPg=="
                    style={{ objectFit: 'contain', padding: '1rem', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Badges */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                      padding: '0.25rem 0.65rem', borderRadius: 12,
                      fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em',
                      color: 'var(--color-text-muted)', textTransform: 'uppercase',
                    }}>{product.category}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                      padding: '0.25rem 0.65rem', borderRadius: 12,
                      fontSize: '0.65rem', fontWeight: 500, color: 'var(--color-text-muted)',
                    }}>{product.material}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.2rem' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{product.nameGu}</p>
                  </div>
                  <p style={{ fontSize: '0.85rem', flex: 1, lineHeight: 1.7 }}>{product.description}</p>

                  {/* Price + CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem', borderTop: '1px solid var(--color-border)', marginTop: '0.5rem',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Starting from</div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in "${product.name}" Can you share more details?`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: '0.55rem 1.1rem', fontSize: '0.72rem' }}
                      >
                        Know More
                      </a>
                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`I'd like to order "${product.name}" Please guide me on how to proceed.`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.7rem' }}
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom order CTA */}
          <div style={{
            marginTop: '4rem', padding: '3rem', textAlign: 'center',
            background: 'linear-gradient(135deg, var(--color-navy), #0F2340)',
            borderRadius: 'var(--radius-lg)', color: '#fff',
          }}>
            <h3 style={{ color: '#fff', marginBottom: '0.75rem' }}>Looking for Something Custom?</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>
              We craft bespoke sculptures to your exact specifications. Tell us your vision and we'll bring it to life.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'd like to discuss a custom sculpture order.")}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              Request Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
