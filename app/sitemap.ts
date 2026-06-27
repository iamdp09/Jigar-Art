import type { MetadataRoute } from 'next'

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jigar-art.vercel.app').replace(/\/$/, '')
const now   = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
