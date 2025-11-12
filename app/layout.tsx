import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TrackingProvider } from '@/components/providers/TrackingProvider';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'Minikurs - Paulina od Matematyki',
  description: 'Profesjonalne kursy matematyki online',
  keywords: ['matematyka', 'kurs', 'matura', 'egzamin ósmoklasisty', 'nauka'],
  authors: [{ name: 'Paulina od Matematyki' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Paulina od Matematyki',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        <TrackingProvider>{children}</TrackingProvider>
      </body>
    </html>
  );
}
