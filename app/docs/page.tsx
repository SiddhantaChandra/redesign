import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs - Redesign",
  description:
    "Learn how to use, contribute to, and structure design specs in Redesign.",
  alternates: {
    canonical: "https://stitchredesign.com/docs",
  },
};

const quickStartCommands = [
  "bun install",
  "bun run dev",
  "bun run generate",
  "bun run build",
];

const sidebar = [
  {
    title: "Start here",
    links: [
      { href: "#overview", label: "Overview" },
      { href: "#getting-started", label: "Getting started" },
      { href: "#project-structure", label: "Project structure" },
    ],
  },
  {
    title: "Contributing",
    links: [
      { href: "#add-design", label: "Add a design" },
      { href: "#design-format", label: "Design format" },
      { href: "#checklist", label: "Contribution checklist" },
    ],
  },
  {
    title: "Reference",
    links: [{ href: "#commands", label: "Commands" }],
  },
];

export default function DocsPage() {
  return (
    <main className="py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 h-fit border border-white/10 bg-bg-secondary/35 p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-text-secondary">
            Docs
          </p>
          <h1 className="mt-2 text-xl font-medium text-text-primary">Redesign</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A practical guide for running the app and contributing design specs.
          </p>

          <div className="mt-6 space-y-6">
            {sidebar.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-[0.18em] text-text-secondary/80 mb-2">
                  {group.title}
                </p>
                <nav className="space-y-1.5">
                  {group.links.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 px-2 py-1.5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div className="mt-7 border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-text-secondary mb-2">
              Quick start
            </p>
            <div className="space-y-1.5">
              {quickStartCommands.map((command) => (
                <code key={command} className="block text-xs text-text-primary">
                  {command}
                </code>
              ))}
            </div>
          </div>
        </aside>

        <article className="border border-white/10 bg-bg-secondary/20 p-6 md:p-8 lg:p-10 space-y-12">
          <section id="overview" className="scroll-mt-24">
            <p className="text-xs uppercase tracking-[0.24em] text-text-secondary mb-3">
              Documentation
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-text-primary leading-tight">
              Sidebar style docs for contributors
            </h2>
            <p className="mt-4 max-w-3xl text-text-secondary leading-relaxed">
              Redesign is a searchable library of design specs for Stitch. This
              page explains the contribution workflow, file format, and the
              exact commands needed to keep submissions clean and deploy-ready.
            </p>
          </section>

          <section id="getting-started" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Getting started</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Clone the repository, install dependencies with Bun, and run the
              local development server.
            </p>
            <pre className="mt-4 border border-white/10 bg-black/20 p-4 overflow-x-auto">
              <code className="text-sm text-text-primary">
                git clone https://github.com/YOUR_USERNAME/redesign.git{"\n"}
                cd redesign{"\n"}
                bun install{"\n"}
                bun run dev
              </code>
            </pre>
            <p className="mt-3 text-sm text-text-secondary">
              Local server: <span className="text-text-primary">http://localhost:3000</span>
            </p>
          </section>

          <section id="project-structure" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Project structure</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">
              These folders and files cover most contribution work.
            </p>
            <div className="mt-4 border border-white/10 bg-black/20 p-4 text-sm text-text-primary space-y-2">
              <p>app/ - Application routes and pages</p>
              <p>app/docs/page.tsx - Documentation page</p>
              <p>designs/ - Markdown design specs</p>
              <p>scripts/generate-index.ts - Search index + sitemap generation</p>
              <p>src/generated/designs.json - Generated catalog data</p>
            </div>
          </section>

          <section id="add-design" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Add a design</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Add markdown files in either a single slug format or an author
              folder format.
            </p>
            <pre className="mt-4 border border-white/10 bg-black/20 p-4 overflow-x-auto">
              <code className="text-sm text-text-primary">
                designs/landing-page.md{"\n"}
                designs/jane-doe/analytics-dashboard.md
              </code>
            </pre>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Then regenerate and verify locally.
            </p>
            <pre className="mt-4 border border-white/10 bg-black/20 p-4 overflow-x-auto">
              <code className="text-sm text-text-primary">
                bun run generate{"\n"}
                bun run dev
              </code>
            </pre>
          </section>

          <section id="design-format" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Design format</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Keep specs structured and scannable so they are easy to reuse in
              AI design tools.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-bg-secondary/30 p-4">
                <p className="text-text-primary font-medium">Recommended sections</p>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>Design System Overview</li>
                  <li>Color System</li>
                  <li>Typography</li>
                  <li>Layout</li>
                  <li>Components</li>
                  <li>Responsive Behavior</li>
                  <li>Interactions</li>
                </ul>
              </div>
              <div className="border border-white/10 bg-bg-secondary/30 p-4">
                <p className="text-text-primary font-medium">Writing tips</p>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>Use specific values and consistent naming</li>
                  <li>Keep paragraphs short and intent-driven</li>
                  <li>Document hover, focus, and empty states</li>
                  <li>Favor reusable patterns over one-off wording</li>
                  <li>Validate readability before opening a PR</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="commands" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Commands</h3>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Core scripts used in this project.
            </p>
            <div className="mt-4 overflow-x-auto border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary/50 text-text-primary">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Command</th>
                    <th className="text-left px-4 py-3 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 text-text-primary">bun run dev</td>
                    <td className="px-4 py-3 text-text-secondary">Start local development</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 text-text-primary">bun run generate</td>
                    <td className="px-4 py-3 text-text-secondary">Rebuild index and sitemap</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 text-text-primary">bun run build</td>
                    <td className="px-4 py-3 text-text-secondary">Create production build</td>
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-3 text-text-primary">bun run start</td>
                    <td className="px-4 py-3 text-text-secondary">Run production server</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="checklist" className="scroll-mt-24">
            <h3 className="text-2xl font-medium text-text-primary">Contribution checklist</h3>
            <div className="mt-4 border border-white/10 bg-bg-secondary/30 p-4">
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Use kebab-case names for all design files</li>
                <li>Keep markdown sectioned and easy to scan</li>
                <li>Run bun run generate before creating a PR</li>
                <li>Confirm new routes render correctly in dev</li>
                <li>Keep copy concise and implementation-focused</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium border border-white/10 bg-bg-secondary/40 text-text-primary hover:bg-white/10 transition-colors"
              >
                Back to library
              </Link>
              <a
                href="https://github.com/SiddhantaChandra/redesign"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium border border-white/10 bg-bg-secondary/40 text-text-primary hover:bg-white/10 transition-colors"
              >
                Open GitHub
              </a>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}