'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { useState } from 'react'
import {
  CopyIcon,
  CheckIcon,
  CaretLeftIcon,
  DownloadIcon,
} from '@phosphor-icons/react'
import type { Design } from '@/types/design'

interface DesignPageClientProps {
  design: Design
  schema: Record<string, unknown>
}

export default function DesignPageClient({
  design,
  schema,
}: DesignPageClientProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(design.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([design.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'DESIGN.md'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="py-8 md:py-12 max-w-4xl mx-auto w-full flex flex-col gap-8">
      <nav className="flex items-center gap-2 text-sm text-text-secondary">
        <a
          href="/"
          className="hover:text-text-primary transition-colors flex items-center gap-1"
        >
          <CaretLeftIcon size={16} weight="bold" />
          Home
        </a>
        <span>/</span>
        <span className="text-text-primary">{design.slug}</span>
      </nav>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium text-text-primary mb-2">
              {design.slug}
            </h1>
            {design.author && (
              <div className="text-text-secondary">
                by <span className="text-text-primary">{design.author}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-bg-secondary hover:bg-white/10 text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
            >
              {copied ? (
                <CheckIcon size={18} weight="bold" className="text-green-500" />
              ) : (
                <CopyIcon size={18} weight="fill" />
              )}
              <span>Markdown</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-bg-secondary hover:bg-white/10 text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
              title="Download DESIGN.md"
            >
              <DownloadIcon size={18} weight="fill" />
              <span>Download</span>
            </button>
          </div>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none text-text-secondary prose-headings:text-[var(--color-text-primary)] prose-a:text-[var(--color-text-primary)] prose-strong:text-[var(--color-text-primary)] prose-code:text-[var(--color-text-primary)] prose-code:bg-[var(--color-bg-secondary)] prose-code:p-1 prose-pre:bg-[var(--color-bg-secondary)] prose-pre:border prose-pre:border-white/10">
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-medium mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-medium mt-8 mb-4 border-b border-white/10 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className
                return isInline ? (
                  <code className="bg-bg-secondary px-1.5 py-0.5 font-mono text-sm">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-bg-secondary p-4 overflow-x-auto text-sm my-6 border border-white/10">
                    <code className="font-mono text-text-primary">
                      {children}
                    </code>
                  </pre>
                )
              },
              strong: ({ children }) => (
                <strong className="font-medium">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-white/20 pl-4 py-1 my-6 italic text-white/70">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="border-white/10 my-8" />,
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="underline underline-offset-4 hover:text-white transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {design.content}
          </ReactMarkdown>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  )
}