import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Makitex Trading PLC - Architecture & Construction",
  description: "Modern design and build construction firm in East Africa specializing in high-end residential, commercial design, and quality builds.",
  keywords: ["Construction", "Architecture", "Addis Ababa Building", "Makitex Trading", "Engineering"],
  openGraph: {
    title: "Makitex Trading PLC - Architecture & Construction",
    description: "Modern design and build construction firm in East Africa specializing in high-end residential, commercial design, and quality builds.",
    type: "website",
    locale: "en_ET",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": "Makitex Trading PLC",
    "url": "https://www.makitex.com",
    "description": "Premier architectural and construction firm in East Africa.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "Ethiopia"
    },
    "sameAs": [
      "https://www.linkedin.com/company/makitex"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-primary/20 selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}
