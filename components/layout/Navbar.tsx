'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(250,250,247,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 3rem)', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
      <Image
  src="/logo2.png" // or "/logo.svg"
  alt="Jigar Art Logo"
  width={30}
  height={30}
 className="object-contain drop-shadow-[0_0_35px_rgba(255,215,0,1)]"
  style={{
    objectFit: 'contain',
  }}
/>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.02em' }}>
            Jigar Art
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: pathname === link.href ? 'var(--color-gold)' : 'var(--color-text)',
              transition: 'color 0.2s',
              position: 'relative',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === link.href ? 'var(--color-gold)' : 'var(--color-text)')}
            >
              {link.label}
              {pathname === link.href && (
                <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'var(--color-gold)', borderRadius: 2 }} />
              )}
            </Link>
          ))}
          <a
            href={`https://wa.me/917990748466?text=Hello%2C%20I'm%20interested%20in%20your%20sculptures`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem' }}
          >
            WhatsApp Us
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--color-text)' }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(250,250,247,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--color-border)',
          padding: '1.5rem clamp(1.25rem, 4vw, 3rem) 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: pathname === link.href ? 'var(--color-gold)' : 'var(--color-text)',
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--color-border)',
            }}>
              {link.label}
            </Link>
          ))}
          <a href={`https://wa.me/917990748466`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            WhatsApp Us
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
