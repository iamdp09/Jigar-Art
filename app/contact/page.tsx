'use client'
import { useState, type FormEvent } from 'react'

const WA_NUMBER = '917990748466'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hello Jigar Art!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-navy) 0%, #0F2340 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
        textAlign: 'center',
      }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Get In Touch</span>
        <h1 style={{ color: '#fff', marginBottom: '1rem' }}>
          Let's Create <span className="text-gold-gradient">Something Beautiful</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto' }}>
          Have a question, want a custom order, or just want to see our workshop? We'd love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        <div className="section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'start' }} className="contact-grid">

            {/* Left — Info */}
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Visit Our <span className="text-gold-gradient">Workshop</span></h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '2rem' }}>
                Our workshop is open to visitors. Come see our artisans at work, explore our showroom, or discuss your custom sculpture in person.
              </p>

              {/* Contact cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  { icon: '📍', label: 'Address', value: 'Dhrangadhara, Gujarat — 363310, India' },
                  { icon: '📞', label: 'Phone', value: '+91 79907 48466 |+91 83201 67352' },
                  { icon: '✉️', label: 'Email', value: 'jigarart16@gmail.com' },
                  { icon: '⏰', label: 'Hours', value: 'Mon–Sun: 10:00AM–11:30PM' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    padding: '1.25rem', background: 'var(--color-white)',
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}>
                    <span style={{ fontSize: '1.4rem', marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello! I'd like to know more about your sculptures.")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)',
                  background: '#25D366', color: '#fff',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.062 1.481 5.772L0 24l6.388-1.456C8.044 23.46 9.985 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.89 0-3.651-.507-5.167-1.39l-.371-.22-3.793.866.906-3.694-.24-.381C2.572 15.398 2.182 13.748 2.182 12 2.182 6.576 6.576 2.182 12 2.182S21.818 6.576 21.818 12 17.424 21.818 12 21.818z"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Chat on WhatsApp</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Usually replies within minutes</div>
                </div>
              </a>
            </div>

            {/* Right — Form */}
            <div>
              <div className="card" style={{ padding: '2.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Send Us a Message</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '2rem' }}>Fill the form below — it opens directly in WhatsApp.</p>

                {submitted && (
                  <div style={{
                    padding: '1rem', borderRadius: 'var(--radius-sm)',
                    background: 'rgba(37,211,102,0.1)', border: '1px solid #25D366',
                    color: '#1a7a3a', fontSize: '0.875rem', marginBottom: '1.5rem',
                  }}>
                    ✅ Opening WhatsApp... Thank you for reaching out!
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { id: 'contact-name', key: 'name', label: 'Your Name', placeholder: 'Enter your full name', type: 'text' },
                    { id: 'contact-phone', key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={form[field.key as 'name' | 'phone']}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        style={{
                          width: '100%', padding: '0.85rem 1rem',
                          border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                          background: 'var(--color-cream)', color: 'var(--color-text)',
                          fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                          outline: 'none', transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us about your requirement..."
                      required
                      rows={5}
                      style={{
                        width: '100%', padding: '0.85rem 1rem',
                        border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-cream)', color: 'var(--color-text)',
                        fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                        outline: 'none', transition: 'border-color 0.2s', resize: 'vertical',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                  </div>
                  <button type="submit" className="btn-primary" id="contact-submit-btn" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.062 1.481 5.772L0 24l6.388-1.456C8.044 23.46 9.985 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.89 0-3.651-.507-5.167-1.39l-.371-.22-3.793.866.906-3.694-.24-.381C2.572 15.398 2.182 13.748 2.182 12 2.182 6.576 6.576 2.182 12 2.182S21.818 6.576 21.818 12 17.424 21.818 12 21.818z"/>
                    </svg>
                    Send via WhatsApp
                  </button>
                </form>
              </div>

              {/* Map embed */}
              <div style={{ marginTop: '1.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', height: 260 }}>
                <iframe
                 title="Jigar Art Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.52825395507182!2d71.45619991101036!3d23.00716814581495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395963003a5b76c1%3A0x8cba50cf2c8484ad!2sJigar%20Art!5e0!3m2!1sen!2sin!4v1782539703064!5m2!1sen!2sin"
              width="100%"
              height="260"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
