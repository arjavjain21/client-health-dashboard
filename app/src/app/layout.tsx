import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Client Health Dashboard - Real-time Monitoring & Analytics",
  description: "Monitor client health metrics, track engagement, and analyze performance with real-time RAG status, reply rates, and lead quality indicators.",
  openGraph: {
    title: "Client Health Dashboard",
    description: "Real-time client health monitoring with RAG status tracking, reply rates, and lead quality analytics.",
    type: "website",
    url: "https://clienthealth.eagleinfoservice.com",
    siteName: "Client Health Dashboard",
    locale: "en_US",
    images: [
      {
        url: "https://clienthealth.eagleinfoservice.com/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Client Health Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Health Dashboard",
    description: "Real-time client health monitoring with RAG status tracking, reply rates, and lead quality analytics.",
    images: [
      {
        url: "https://clienthealth.eagleinfoservice.com/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Client Health Dashboard Preview",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
