/** ─────────────────────────────────────────────────
 *  Shared site constants — import from here,
 *  never hard-code these values in components.
 *
 *  SITE_URL is set via NEXT_PUBLIC_SITE_URL env var:
 *   • locally:  .env.local  → http://localhost:3000
 *   • Vercel:   dashboard   → https://jigar-art.vercel.app
 *   • custom domain (later): https://jigarart.in
 *  ───────────────────────────────────────────────── */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://jigar-art.vercel.app'

export const BUSINESS = {
  name:       'Jigar Art',
  tagline:    'Where Stone Becomes Sacred Art',

  // WhatsApp: include country code, no '+' or spaces
  waNumber:   '917990748466',

  phone1:     '+91 79907 48466',
  phone2:     '+91 83201 67352',
  tel1:       'tel:+917990748466',
  tel2:       'tel:+918320167352',

  email:      'jigarart16@gmail.com',
  mailTo:     'mailto:jigarart16@gmail.com',

  address:    'Dhrangadhra, Gujarat — 363310, India',
  city:       'Dhrangadhra',
  state:      'Gujarat',
  pincode:    '363310',
  country:    'India',

  mapEmbed:   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.52825395507182!2d71.45619991101036!3d23.00716814581495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395963003a5b76c1%3A0x8cba50cf2c8484ad!2sJigar%20Art!5e0!3m2!1sen!2sin!4v1782539703064!5m2!1sen!2sin',

  hours:      'Mon–Sun: 10:00 AM – 11:30 PM',

  founded:    2008,
  siteUrl:    'https://jigarart.in',

  /** WhatsApp link with pre-filled message */
  wa: (msg: string) =>
    `https://wa.me/917990748466?text=${encodeURIComponent(msg)}`,
} as const
