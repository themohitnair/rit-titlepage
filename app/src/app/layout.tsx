import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ritlepage",
  description:
    "Generate professional title pages for assignments and reports at RIT Bangalore",
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "pub-4810694769527892"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritlepage.netlify.app",
    title: "ritlepage",
    description:
      "Generate professional title pages for assignments and reports at RIT Bangalore",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810694769527892"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Header />
          </div>
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}

