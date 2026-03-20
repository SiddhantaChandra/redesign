"use client";

import { GithubLogoIcon, BookOpenTextIcon } from "@phosphor-icons/react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10">
      <a href="/">
        <img
          src="/redesign-logo-white.webp"
          alt="Redesign Logo"
          className="w-24 h-auto object-contain"
        />
      </a>
      <nav className="flex items-center gap-6">
        <a
          href="https://github.com/SiddhantaChandra/redesign.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm"
        >
          <GithubLogoIcon size={24} weight="fill" />
          <span>Github</span>
        </a>
        <a
          href="/docs"
          className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm"
        >
          <BookOpenTextIcon size={24} weight="fill" />
          <span>Docs</span>
        </a>
      </nav>
    </header>
  );
}
