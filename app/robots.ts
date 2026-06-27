import type { MetadataRoute } from 'next'

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap:  `${base}/sitemap.xml`,
    host:     base,
  }
}
