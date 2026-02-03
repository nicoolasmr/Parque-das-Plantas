import type { Metadata } from 'next'
import './globals.css'

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
            <body>{children}</body>
        </html>
    )
}
