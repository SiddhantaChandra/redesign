import type { MetadataRoute } from 'next'
import designsData from '@/generated/designs.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const designs = designsData.designs.map((design) => ({
    url: `https://stitchredesign.com/design/${design.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://stitchredesign.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...designs,
  ]
}
