```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Parque das Plantas',
    description: 'Um refúgio para suas plantas favoritas.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#22c55e" />
            </head>
            <body className={inter.className}>
                <PageTransition>
                    {children}
                </PageTransition>
            </body>
        </html>
    )
}
