import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Redesign - Designs.md Library for Google Stitch",
  description:
    "Open-source library of design specifications for Google Stitch and other AI tools. Copy, download, and use with your favorite AI design assistants.",
  keywords: [
    "Google Stitch",
    "Stitch designs",
    "Stitch UI",
    "AI design assistant",
    "Designs.md",
    "Google Stitch templates",
    "Design specifications",
    "AI UI generator",
    "Google Workspace Stitch",
  ],
  authors: [{ name: "Redesign Contributors" }],
  creator: "Redesign",
  publisher: "Redesign",
  applicationName: "Redesign for Google Stitch",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://stitchredesign.com",
  },
  openGraph: {
    title: "Redesign - Designs.md Library for Google Stitch",
    description:
      "Open-source library of design specifications for Google Stitch and other AI tools. Copy, download, and use with your favorite AI design assistants.",
    url: "https://stitchredesign.com",
    siteName: "Redesign for Google Stitch",
    images: [
      {
        url: "https://stitchredesign.com/redesign-logo-white.webp",
        width: 1200,
        height: 630,
        alt: "Redesign Logo for Google Stitch",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redesign - Designs.md Library for Google Stitch",
    description:
      "Open-source library of design specifications for Google Stitch and other AI tools. Copy, download, and use with your favorite AI design assistants.",
    images: ["https://stitchredesign.com/redesign-logo-white.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scriptSrc =
    process.env.NODE_ENV === "development"
      ? "'self' 'unsafe-inline' 'unsafe-eval'"
      : "'self' 'unsafe-inline'";

  const contentSecurityPolicy = `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark selection:bg-white/10 selection:text-white"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={contentSecurityPolicy}
        />
        <link rel="canonical" href="https://stitchredesign.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.colorScheme='dark';`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
