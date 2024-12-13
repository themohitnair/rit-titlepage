import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'RIT TitleCraft',
    description: 'Generate professional title pages for assignments and reports at RIT, Bangalore',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-background text-foreground`}>{children}</body>
        </html>
    )
}