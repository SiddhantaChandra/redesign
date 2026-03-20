import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Redesign - Designs.md Library for Google Stitch",
  description:
    "Open-source library of design specifications for AI tools. Copy, download, and use with your favorite AI design assistants.",
  openGraph: {
    title: "Redesign - Designs.md Library for Google Stitch",
    description:
      "Open-source library of design specifications for AI tools. Copy, download, and use with your favorite AI design assistants.",
    url: "https://stitchredesign.com",
    images: [
      {
        url: "https://stitchredesign.com/redesign-logo-white.webp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redesign - Designs.md Library for Google Stitch",
    description:
      "Open-source library of design specifications for AI tools. Copy, download, and use with your favorite AI design assistants.",
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
