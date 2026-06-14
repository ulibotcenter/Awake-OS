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

const siteDescription =
  "Awake OS is the operating manual for your mind — a practical protocol to reboot your nervous system, end the hidden stress loop, and reclaim calm, clarity, and authentic presence. By Ariel Uri · Somatic Labs Publishing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Awake OS | The Hardware Reset",
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
    canonical: "/",
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
        width: 1650,
        height: 2550,
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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
