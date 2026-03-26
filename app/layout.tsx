import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import StructuredData from "@/components/StructuredData";
import { defaultMetadata } from "@/lib/metadata";

import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-mono",
  weight: ["400", "700"]
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0a0a0a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#0a0a0a]">
      <body
        className={`${mono.variable} h-screen overflow-hidden bg-[#0a0a0a] text-white`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
