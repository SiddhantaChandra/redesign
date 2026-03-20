"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { MagnifyingGlassIcon, GithubLogoIcon } from "@phosphor-icons/react";
import designsData from "@/generated/designs.json";
import type { Design } from "@/types/design";

const MAX_QUERY_LENGTH = 200;

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Redesign",
  description:
    "Open-source library of design specifications for AI tools. Copy, download, and use with your favorite AI design assistants.",
  url: "https://stitchredesign.com",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_QUERY_LENGTH) {
      setQuery(value);
    }
  };

  const getSearchTokens = (slug: string): string[] => {
    return slug
      .split("/")
      .flatMap((part) => part.split("-"))
      .filter(Boolean);
  };

  const fuse = useMemo(() => {
    const searchableItems = designsData.designs.map((design) => ({
      ...design,
      tokens: getSearchTokens(design.slug),
    }));

    return new Fuse(searchableItems, {
      keys: ["tokens"],
      threshold: 0.3,
      includeScore: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return designsData.designs;
    return fuse.search(query.toLowerCase()).map((r) => r.item);
  }, [query, fuse]);

  const getDesignUrl = (design: Design): string => {
    return `/design/${design.slug}`;
  };

  return (
    <main className="py-16 md:py-24 flex flex-col gap-8">
      <section className="grid grid-cols-[2fr_1.5fr] items-center">
        <div className="flex-1 max-w-xl">
          <p className="text-text-primary text-sm uppercase tracking-widest font-medium mb-4">
            Open Source Design Library for Google Stitch
          </p>
          <div>
            <img
              src="/redesign-logo-white.webp"
              alt="Redesign Logo"
              className="w-lg h-auto object-contain"
            />
          </div>
        </div>
        <div>
          <p className="text-text-secondary text-lg leading-relaxed">
            A curated collection of design specifications. Copy or download any
            Designs.md and use it with your favorite AI tools to jumpstart your
            workflow.
          </p>
        </div>
      </section>
      <div className="flex items-center justify-between mt-2 mb-6">
        <div>
          <h2 className="text-text-primary font-medium mb-1">
            Contribute a design
          </h2>
          <p className="text-text-secondary text-sm">
            Add your own design prompts via GitHub pull request.
          </p>
        </div>
        <a
          href="https://github.com/SiddhantaChandra/redesign.git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-text-primary transition-colors text-sm font-medium"
        >
          <GithubLogoIcon size={18} weight="fill" />
          <span>Submit</span>
        </a>
      </div>

      <section className="relative w-full">
        <div className="relative">
          <MagnifyingGlassIcon
            size={16}
            weight="bold"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search designs.md..."
            value={query}
            onChange={handleQueryChange}
            maxLength={MAX_QUERY_LENGTH}
            className="w-full bg-transparent text-text-primary placeholder:text-text-secondary border-b border-white/20 pl-7 pr-4 py-2 outline-none transition-colors focus:border-white/40 text-sm"
          />
        </div>
      </section>

      <section className="flex flex-col w-full">
        {results.map((design) => (
          <a
            key={design.slug}
            href={getDesignUrl(design)}
            className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-white/20  hover:bg-white/5 transition-colors"
          >
            <div className="flex items-baseline gap-4 px-4">
              <span className="font-semibold text-text-primary">
                {design.slug}
              </span>
              {design.author && (
                <span className="text-sm text-text-secondary">
                  by {design.author}
                </span>
              )}
            </div>
          </a>
        ))}
      </section>

      {query && results.length === 0 && (
        <div className="py-12 text-center border-t border-white/10 mt-8">
          <p className="text-text-secondary mb-4">
            Try a different search term
          </p>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
    </main>
  );
}
