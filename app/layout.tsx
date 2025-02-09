import type React from "react"

export const metadata = {
  title: 'BETTT.FUN',
  description: 'Prediction markets for Solana. Powered by BETTT.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'BETTT.FUN',
    description: 'Prediction markets for Solana. Powered by BETTT.',
    images: [
      {
        url: '/preview.png',
        width: 1280,
        height: 630,
        alt: 'BETTT.FUN Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BETTT.FUN',
    description: 'Prediction markets for Solana. Powered by BETTT.',
    images: ['/preview.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}