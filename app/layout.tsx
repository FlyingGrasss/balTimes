// app/layout.tsx
import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'BAL Times - BAL Öğrenci Derneği Haberleri',
  description: 'BAL Times. Okul etkinlikleri, duyurular ve öğrenci haberleri için BAL Times\'ı takip edin.',
  metadataBase: new URL('https://www.baltimes.org'),
  keywords: [
    'Bornova Anadolu Lisesi',
    'BAL',
    'BAL Times',
    'Okul Haberleri',
    'Eğitim Haberleri',
    'İzmir Lisesi',
    'Anadolu Lisesi',
    'Öğrenci Haberleri',
    'Okul Duyuruları',
    'Bornova',
    'İzmir',
    'Lise Haberleri',
    'Eğitim',
    'Geleceğin aydınlık sesi',
    "Bornova Anadolu Lisesi Öğrenci Derneği"
  ],
  openGraph: {
    title: 'BAL Times - BAL Öğrenci Derneği Haberleri',
    description: 'BAL Times. Okul etkinlikleri, duyurular ve öğrenci haberleri için BAL Times\'ı takip edin.',
    url: 'https://www.baltimes.org', // Güncel domain ile değiştirin
    siteName: 'BAL Times',
    images: [
      {
        url: '/icon.png', // Public klasörüne ekleyeceğiniz görsel
        width: 1200,
        height: 630,
        alt: 'BAL Times - BAL Öğrenci Derneği Haberleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAL Times - BAL Öğrenci Derneği Haberleri',
    description: 'Bornova Anadolu Lisesi Öğrenci Derneği\'nin resmi haber platformu. Okul etkinlikleri, duyurular ve öğrenci haberleri için BAL Times\'ı takip edin.',
    images: ['/icon.png'], // Public klasörüne ekleyeceğiniz görsel
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <html lang="tr" className={`${libreBaskerville.variable}`}>
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
}