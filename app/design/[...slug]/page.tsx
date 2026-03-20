import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import designsData from '@/generated/designs.json'
import type { Design } from '@/types/design'
import DesignPageClient from '../DesignPageClient'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/

function extractDescription(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
      return trimmed.slice(0, 160) + (trimmed.length > 160 ? '...' : '')
    }
  }
  return 'Design specification for AI tools.'
}

function generateTechArticleSchema(design: Design, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: design.slug,
    description,
    url: `https://stitchredesign.com/design/${design.slug}`,
    datePublished: designsData.generatedAt,
    dateModified: designsData.generatedAt,
    author: design.author
      ? {
          '@type': 'Person',
          name: design.author,
        }
      : {
          '@type': 'Organization',
          name: 'Redesign',
          url: 'https://stitchredesign.com',
        },
    publisher: {
      '@type': 'Organization',
      name: 'Redesign',
      url: 'https://stitchredesign.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://stitchredesign.com/design/${design.slug}`,
    },
  }
}

function resolveDesign(slugParts: string[]): Design | undefined {
  if (slugParts.length < 1 || slugParts.length > 2) {
    return undefined
  }

  if (!slugParts.every((part) => SLUG_PATTERN.test(part))) {
    return undefined
  }

  const fullSlug = slugParts.join('/')
  return designsData.designs.find((design) => design.slug === fullSlug)
}

export async function generateStaticParams() {
  return designsData.designs.map((design) => ({
    slug: design.slug.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const design = resolveDesign(slug)

  if (!design) {
    return {
      title: 'Design - Redesign',
    }
  }

  const description = extractDescription(design.content)
  const title = `${design.slug} - Redesign`
  const url = `https://stitchredesign.com/design/${design.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: 'https://stitchredesign.com/redesign-logo-white.webp' }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://stitchredesign.com/redesign-logo-white.webp'],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function DesignPage({ params }: PageProps) {
  const { slug } = await params
  const design = resolveDesign(slug)

  if (!design) {
    notFound()
  }

  const description = extractDescription(design.content)
  const techArticleSchema = generateTechArticleSchema(design, description)

  return <DesignPageClient design={design} schema={techArticleSchema} />
}