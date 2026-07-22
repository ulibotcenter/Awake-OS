import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://awake-os.com";

/** Cache-bust: bump when the brand mark changes */
const FAVICON_V = "2";

const siteDescription =
  "Awake OS is the operating manual for your mind — a practical protocol to reboot your nervous system, end the hidden stress loop, and reclaim calm, clarity, and authentic presence. By Ariel Uri · Somatic Labs Publishing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Awake OS — The Operating Manual for Your Mind",
    template: "%s | Awake OS",
  },
  description: siteDescription,
  keywords: [
    "Awake OS",
    "Ariel Uri",
    "Somatic Labs Publishing",
    "nervous system reset",
    "stress relief",
    "mindfulness protocol",
    "hardware reset",
    "operating manual",
    "awake-os.com",
  ],
  authors: [{ name: "Ariel Uri", url: SITE_URL }],
  creator: "Ariel Uri",
  publisher: "Somatic Labs Publishing",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      pt: "/pt",
      es: "/es",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Awake OS",
    title: "Awake OS — The Operating Manual for Your Mind",
    description: siteDescription,
    images: [
      {
        url: "/images/awake-os-cover.jpg",
        width: 1801,
        height: 2702,
        alt: "Awake OS book cover — turquoise neural network on deep teal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awake OS — The Operating Manual for Your Mind",
    description: siteDescription,
    images: ["/images/awake-os-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: `/favicon.svg?v=${FAVICON_V}`, type: "image/svg+xml" },
      { url: `/favicon-32.png?v=${FAVICON_V}`, sizes: "32x32", type: "image/png" },
      { url: `/favicon-48.png?v=${FAVICON_V}`, sizes: "48x48", type: "image/png" },
      { url: `/favicon.ico?v=${FAVICON_V}`, sizes: "any" },
    ],
    shortcut: `/favicon.ico?v=${FAVICON_V}`,
    apple: [
      {
        url: `/apple-touch-icon.png?v=${FAVICON_V}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: `/favicon.svg?v=${FAVICON_V}`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <head>
        {/* Explicit favicon links with cache-bust — force neural cyan/orange mark */}
        <link rel="icon" href={`/favicon.svg?v=${FAVICON_V}`} type="image/svg+xml" />
        <link
          rel="icon"
          href={`/favicon-32.png?v=${FAVICON_V}`}
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href={`/favicon-48.png?v=${FAVICON_V}`}
          type="image/png"
          sizes="48x48"
        />
        <link rel="shortcut icon" href={`/favicon.ico?v=${FAVICON_V}`} />
        <link
          rel="apple-touch-icon"
          href={`/apple-touch-icon.png?v=${FAVICON_V}`}
          sizes="180x180"
        />
      </head>
      <body className="min-h-full text-[#FFFFFF]">{children}</body>
    </html>
  );
}
