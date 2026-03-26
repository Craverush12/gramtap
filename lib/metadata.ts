import type { Metadata } from "next";

export const BASE_URL = "https://gramtap.app";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GramTap – iPhone Weighing Scale App",
    template: "%s | GramTap"
  },
  description:
    "GramTap turns your iPhone into a digital weighing scale using 3D Touch. No hardware needed. Works in Safari on iPhone 6S, 7, 8, X, and XS. Free, instant, no app download required.",
  keywords: [
    "iPhone weighing scale",
    "iPhone scale app",
    "phone scale",
    "digital scale browser",
    "3D touch scale",
    "weigh objects iPhone",
    "pocket scale online",
    "grams scale iPhone"
  ],
  authors: [{ name: "GramTap" }],
  creator: "GramTap",
  applicationName: "GramTap",
  category: "utilities",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GramTap"
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "GramTap",
    title: "GramTap – Turn Your iPhone Into a Weighing Scale",
    description:
      "Free browser-based iPhone scale. Uses 3D Touch force sensing in Safari. Measure up to 385g — no app download needed.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GramTap – iPhone Weighing Scale"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GramTap – iPhone Scale in Your Browser",
    description:
      "Turn your iPhone into a digital scale using 3D Touch. Free, no download needed.",
    images: ["/opengraph-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: BASE_URL
  }
};
