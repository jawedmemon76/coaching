import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'teacher.ac.pk - Pakistan\'s Premier Education Platform',
    template: '%s | teacher.ac.pk',
  },
  description:
    'Comprehensive exam-focused digital learning platform for Pakistan. From literacy to professional exams, prepare with past papers, mock tests, and expert guidance.',
  keywords: [
    'education',
    'Pakistan',
    'exam prep',
    'MDCAT',
    'matric',
    'intermediate',
    'O-Level',
    'A-Level',
    'past papers',
    'mock exams',
    'online learning',
  ],
  authors: [{ name: 'teacher.ac.pk' }],
  creator: 'teacher.ac.pk',
  publisher: 'teacher.ac.pk',
  metadataBase: new URL('https://teacher.ac.pk'),
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://teacher.ac.pk',
    siteName: 'teacher.ac.pk',
    title: 'teacher.ac.pk - Pakistan\'s Premier Education Platform',
    description:
      'Comprehensive exam-focused digital learning platform for Pakistan.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'teacher.ac.pk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'teacher.ac.pk - Pakistan\'s Premier Education Platform',
    description:
      'Comprehensive exam-focused digital learning platform for Pakistan.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)', color: '#047857' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}

