"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-text-secondary)] text-center">
          © {new Date().getFullYear()} Redesign. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
