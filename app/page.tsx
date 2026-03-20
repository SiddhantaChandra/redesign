"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { MagnifyingGlassIcon, GithubLogoIcon } from "@phosphor-icons/react";
import type { Design } from "@/types/design";

interface DesignsData {
  designs: Design[];
}

const fetchDesigns = async (): Promise<DesignsData> => {
  const response = await fetch("/api/designs");
  if (!response.ok) {
    throw new Error("Failed to fetch designs");
  }
  return response.json();
};

const MAX_QUERY_LENGTH = 200;

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Redesign for Google Stitch",
  description:
    "Open-source library of design specifications for Google Stitch and other AI tools. Copy, download, and use with your favorite AI design assistants.",
  url: "https://stitchredesign.com",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  keywords: "Google Stitch, Stitch designs, AI design assistant, Designs.md",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useQuery<DesignsData>({
    queryKey: ["designs"],
    queryFn: fetchDesigns,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

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
    if (!data?.designs) return null;

    const searchableItems = data.designs.map((design: Design) => ({
      ...design,
      tokens: getSearchTokens(design.slug),
    }));

    return new Fuse(searchableItems, {
      keys: ["tokens"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [data]);

  const results = useMemo(() => {
    if (!data?.designs) return [];
    if (!query.trim()) return data.designs;
    if (!fuse) return data.designs;
    return fuse.search(query.toLowerCase()).map((r) => r.item as Design);
  }, [query, fuse, data]);

  const getDesignUrl = (design: Design): string => {
    return `/design/${design.slug}`;
  };

  if (isLoading) {
    return (
      <main className="py-16 md:py-24 flex flex-col gap-8">
        <div className="text-center text-text-secondary">Loading designs...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-16 md:py-24 flex flex-col gap-8">
        <div className="text-center text-red-500">Error loading designs. Please try again later.</div>
      </main>
    );
  }

  return (
    <main className="py-16 md:py-24 flex flex-col gap-8">
      <section className="lg:grid lg:grid-cols-[2fr_1.5fr] items-center">
        <div className="flex-1 max-w-xl">
          <h1 className="text-text-primary text-sm uppercase tracking-widest font-medium mb-4">
            Open Source Design Library for Google Stitch
          </h1>
          <div>
            <img
              src="/redesign-logo-white.webp"
              alt="Redesign Logo"
              className="w-lg h-auto object-contain"
            />
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <p className="text-text-secondary text-lg leading-relaxed">
            A curated collection of design specifications. Copy or download any
            Designs.md and use it with Stitch or your favourite AI tools to jumpstart your
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
        {results.map((design: Design) => (
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
