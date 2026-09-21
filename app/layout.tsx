import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { overview } from "@/data/overview";
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
  metadataBase: new URL(overview.canonicalUrl),
  title: {
    default: `${overview.title} | October 29 at John Jay College of Criminal Justice`,
    template: `%s | ${overview.name}`,
  },
  description: overview.description,
  alternates: { canonical: overview.canonicalUrl },
  openGraph: {
    title: overview.title,
    description: overview.description,
    url: overview.canonicalUrl,
    siteName: overview.name,
    type: "website",
    images: [{ url: `${overview.canonicalUrl}/assets/nyc-skyline.jpg`, width: 1800, height: 1200, alt: "Midtown Manhattan skyline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: overview.title,
    description: overview.description,
    images: [`${overview.canonicalUrl}/assets/nyc-skyline.jpg`],
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
