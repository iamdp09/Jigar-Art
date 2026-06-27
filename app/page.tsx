import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import AboutTeaser from '@/components/sections/AboutTeaser'
import WhyUs from '@/components/sections/WhyUs'

const S = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Jigar Art — Premium Stone Sculptures | Dhrangadhra, Gujarat',
  description:
    'Jigar Art — master stone sculptors in Dhrangadhra, Gujarat. Handcrafted sandstone, marble & limestone Shiva, Ganesh, Nandi idols & temple sculptures. 500+ pieces delivered across India. Custom orders welcome.',
  alternates: { canonical: S },
  openGraph: {
    url: S,
    title: 'Jigar Art — Premium Stone Sculptures | Dhrangadhra, Gujarat',
    description:
      'Handcrafted stone sculptures from Dhrangadhra, Gujarat. Sandstone, marble & limestone religious idols & custom temple art. 17+ years of artisanal mastery.',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutTeaser />
      <WhyUs />
    </>
  )
}
