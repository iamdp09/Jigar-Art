import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

/* ────────────────────────────────────────────────────────────
   GLOBAL METADATA
   Covers: brand, local SEO (Dhrangadhra / Gujarat), materials
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Jigar Art — Premium Stone Sculptures | Dhrangadhra, Gujarat',
    template: '%s | Jigar Art',
  },

  description:
    'Jigar Art crafts exquisite handmade stone sculptures in Dhrangadhra, Gujarat. Specialising in sandstone, marble, and limestone religious idols, temple sculptures, Shiva murti, Ganesh murti, and custom stone art. 500+ sculptures delivered across India.',

  keywords: [
    // Brand
    'Jigar Art', 'Jigar Art Dhrangadhra', 'Jigar Art Gujarat',
    // Products
    'stone sculpture', 'stone sculptures India', 'handmade stone sculpture',
    'religious stone idol', 'temple sculpture', 'stone murti',
    'Shiva sculpture', 'Ganesh murti', 'Ganpati stone idol',
    'Nandi sculpture', 'Hindu idol stone', 'custom stone sculpture',
    // Materials
    'sandstone sculpture', 'marble sculpture', 'limestone sculpture',
    'Dhrangadhra sandstone', 'Kutch stone', 'Gujarat stone art',
    'white marble idol', 'black stone idol', 'granite sculpture',
    // Location
    'stone sculptor Dhrangadhra', 'stone sculptor Gujarat',
    'sculpture maker Gujarat', 'stone art Saurashtra',
    'religious idol maker Gujarat', 'temple idol Dhrangadhra',
    // Intent
    'buy stone sculpture India', 'stone sculpture online India',
    'custom stone idol order', 'temple decoration stone',
  ],

  authors: [{ name: 'Jigar Art', url: SITE_URL }],
  creator: 'Jigar Art',
  publisher: 'Jigar Art',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Jigar Art',
    title: 'Jigar Art — Premium Stone Sculptures | Dhrangadhra, Gujarat',
    description:
      'Handcrafted stone sculptures by master artisans in Dhrangadhra, Gujarat. Sandstone, marble & limestone Shiva, Ganesh, Nandi idols. 500+ sculptures delivered across India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jigar Art — Premium Stone Sculptures from Dhrangadhra, Gujarat',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Jigar Art — Premium Stone Sculptures | Dhrangadhra, Gujarat',
    description:
      'Handcrafted stone sculptures from Dhrangadhra, Gujarat. Sandstone, marble & limestone religious idols & custom temple art.',
    images: ['/og-image.jpg'],
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Add your Google Search Console verification token here after registering
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  },

  category: 'art, sculpture, religious',
}

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
}

/* ────────────────────────────────────────────────────────────
   LOCAL BUSINESS SCHEMA (JSON-LD)
   Covers: LocalBusiness + ArtGallery, geo coordinates, opening hours
   ──────────────────────────────────────────────────────────── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ArtGallery', 'Store'],
  name: 'Jigar Art',
  alternateName: 'Jigar Art Dhrangadhra',
  description:
    'Premium handmade stone sculptures — religious idols, temple sculptures, and custom stone art crafted by master artisans in Dhrangadhra, Gujarat, India.',
  url:   SITE_URL,
  telephone: '+917990748466',
  email: 'jigarart16@gmail.com',
  logo:  `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, UPI',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dhrangadhra',
    addressLocality: 'Dhrangadhra',
    addressRegion: 'Gujarat',
    postalCode: '363310',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0072,
    longitude: 71.4562,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:30',
    },
  ],
  hasMap: 'https://maps.google.com/?q=Jigar+Art+Dhrangadhra+Gujarat',
  sameAs: [],
  foundingDate: '2008',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
  areaServed: ['India', 'Gujarat', 'Saurashtra', 'Dhrangadhra', 'Ahmedabad', 'Rajkot'],
  knowsAbout: [
    'stone sculpture', 'sandstone carving', 'marble sculpture',
    'religious idol making', 'temple sculpture', 'stone art',
    'Shiva murti', 'Ganesh murti', 'custom stone art',
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Religious Stone Idols' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Temple Sculptures' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Decorative Stone Art' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Stone Sculpture' } },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Preload the 3D model so it starts downloading immediately */}
        <link rel="preload" href="/shiva-model.glb" as="fetch" crossOrigin="anonymous" />

        {/* Favicon basics */}
        <link rel="icon" href="/logo.png" sizes="any" />

        {/* Local Business JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
