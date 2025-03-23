import "../global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "../components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { logEvent } from "firebase/analytics";
import { googleAnalytics } from "firebase-config";
import { baseUrl } from "app/sitemap";
import { inconsolata } from "app/components/fonts";

export const metadata: Metadata = {
  title: {
    default: "Art Portfolio",
    template: "%s | Art Portfolio",
  },
  description: "Portfolio for artists.",
  openGraph: {
    title: "Art Portfolio",
    description: "Portfolio for artists",
    images: ["/name-logo.png"],
    url: baseUrl,
    siteName: "Art Portfolio",
    locale: "en_US",
    type: "website",
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  description: "Portfolio for artists",
  creator: "Your name",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof googleAnalytics !== "undefined") {
    logEvent(googleAnalytics, "search");
    logEvent(googleAnalytics, "select_content");
    logEvent(googleAnalytics, "share");
  }

  return (
    <html
      lang='en'
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <link rel='icon' href='/app/favicon.tsx' type='image/png' sizes='32x32' />
      <body
        className={`${inconsolata.className} antialiased w-full mt-8 px-5 lg:mx-auto`}
      >
        <main className='flex-auto min-w-0 mt-6 flex flex-col md:px-0 mb-10'>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </main>
      </body>
    </html>
  );
}
