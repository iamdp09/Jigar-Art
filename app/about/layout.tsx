import type { Metadata } from 'next'

const S = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Jigar Art — 17+ years of premium stone sculpture craftsmanship in Dhrangadhra, Gujarat. Our story, our master artisans, and our passion for sacred stone art since 2008.',
  alternates: { canonical: `${S}/about` },
  openGraph: {
    url: `${S}/about`,
    title: 'About Jigar Art | Stone Sculptors Since 2008 — Dhrangadhra, Gujarat',
    description: '17+ years of handcrafted stone sculpture excellence. Meet the master artisans behind Jigar Art, Dhrangadhra.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
