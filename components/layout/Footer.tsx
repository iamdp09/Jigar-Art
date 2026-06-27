'use client'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ChevronRight,
  Gem,
} from 'lucide-react'

const quickLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/contact',  label: 'Contact' },
]


const contactItems = [
  { Icon: MapPin, text: 'Dhrangadhra, Gujarat — 363310, India', href: undefined },
  { Icon: Phone,  text: '+91 79907 48466',  href: 'tel:+917990748466' },
  { Icon: Phone,  text: '+91 83201 67352',  href: 'tel:+918320167352' },
  { Icon: Mail,   text: 'jigarart16@gmail.com', href: 'mailto:jigarart16@gmail.com' },
]

const hours = [
  { day: 'Mon – Sun', time: '10:00 AM – 11:30 PM' },
]

const WA = '917990748466'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-navy)', color: '#fff', paddingTop: '4rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 5rem)' }}>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem', fontWeight: 600, letterSpacing: '0.02em',
              }}>
                Jigar Art
              </span>
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.58)',
              fontSize: '0.875rem', lineHeight: 1.85, maxWidth: 270,
            }}>
              Crafting exquisite stone sculptures with generations of artisanal mastery.
              Every piece tells a story carved in stone.
            </p>
            </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem', fontWeight: 500,
              marginBottom: '1.25rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.04em',
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.62)',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--color-gold)'
                      e.currentTarget.style.paddingLeft = '4px'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.62)'
                      e.currentTarget.style.paddingLeft = '0'
                    }}
                  >
                    <ChevronRight size={13} style={{ color: 'var(--color-gold)', opacity: 0.7, flexShrink: 0 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem', fontWeight: 500,
              marginBottom: '1.25rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.04em',
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {contactItems.map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon
                    size={15}
                    style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0, opacity: 0.85 }}
                    strokeWidth={1.8}
                  />
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: 'rgba(255,255,255,0.62)',
                        fontSize: '0.875rem', lineHeight: 1.6,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold-light)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {text}
                    </span>
                  )}
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginTop: '0.25rem', padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #25D366, #1da851)',
                  color: '#fff',
                  borderRadius: 24, fontSize: '0.8rem', fontWeight: 500,
                  letterSpacing: '0.05em', width: 'fit-content',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.45)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)'
                }}
              >
                <MessageCircle size={15} strokeWidth={2} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem', fontWeight: 500,
              marginBottom: '1.25rem',
              color: 'var(--color-gold)',
              letterSpacing: '0.04em',
            }}>
              Working Hours
            </h4>

            {/* Clock icon row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clock size={14} style={{ color: 'var(--color-gold)', opacity: 0.75 }} strokeWidth={1.8} />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Open Now
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '0.85rem', gap: '1rem',
                    paddingBottom: '0.65rem',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.48)' }}>{day}</span>
                  <span style={{ color: 'rgba(255,255,255,0.82)', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.09)',
          padding: '1.25rem 0',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Jigar Art. All rights reserved.
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
          }}>
            Crafted with{' '}
            <span style={{ color: '#e05c5c', fontSize: '0.9rem' }}>♥</span>
            {' '}in India
          </p>
        </div>

      </div>
    </footer>
  )
}
