import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/Footer"
import { GoogleAnalytics } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RIT TitleCraft",
  description: "Generate professional title pages for assignments and reports at RIT, Bangalore",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}