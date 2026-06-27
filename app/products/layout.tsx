import type { Metadata } from 'next'

const S = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Stone Sculpture Collection',
  description:
    "Browse Jigar Art's full collection of handcrafted stone sculptures — religious idols (Shiva, Ganesh, Nandi), temple art, animal figures, and bespoke decorative pieces. All carved from premium sandstone, marble & limestone in Dhrangadhra, Gujarat.",
  keywords: [
    'stone sculptures online', 'buy stone idol', 'Shiva murti online',
    'Ganesh stone idol', 'sandstone sculpture price', 'marble idol Gujarat',
    'temple sculpture maker', 'religious idol Dhrangadhra', 'stone decoration',
    'custom stone sculpture order India',
  ],
  alternates: { canonical: `${S}/products` },
  openGraph: {
    url: `${S}/products`,
    title: 'Stone Sculpture Collection | Jigar Art',
    description:
      'Handcrafted religious idols, temple sculptures & decorative stone art from Dhrangadhra, Gujarat. Sandstone, marble & limestone. Custom orders welcome.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
