import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { publishedEvent } from "@/data/published-event";
import "./globals.css";

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(publishedEvent.canonicalUrl),
  title: {
    default: `${publishedEvent.title} | ${publishedEvent.date.label} at ${publishedEvent.venue.name}`,
    template: `%s | ${publishedEvent.name}`,
  },
  description: publishedEvent.description,
  alternates: { canonical: publishedEvent.canonicalUrl },
  openGraph: {
    title: publishedEvent.title,
    description: publishedEvent.description,
    url: publishedEvent.canonicalUrl,
    siteName: publishedEvent.name,
    type: "website",
    images: [{ url: `${publishedEvent.canonicalUrl}/assets/nyc-skyline.jpg`, width: 1800, height: 1200, alt: "Midtown Manhattan skyline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: publishedEvent.title,
    description: publishedEvent.description,
    images: [`${publishedEvent.canonicalUrl}/assets/nyc-skyline.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
