import type { Metadata } from 'next'

const S = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Jigar Art in Dhrangadhra, Gujarat. Visit our workshop, call +91 79907 48466, or WhatsApp us. We accept custom sculpture orders and provide consultations for temple and home décor stone art.',
  alternates: { canonical: `${S}/contact` },
  openGraph: {
    url: `${S}/contact`,
    title: 'Contact Jigar Art | Stone Sculptures — Dhrangadhra, Gujarat',
    description:
      'Visit our workshop in Dhrangadhra, Gujarat or WhatsApp us for custom stone sculpture orders and inquiries.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
