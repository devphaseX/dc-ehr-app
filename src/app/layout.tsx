import localFont from 'next/font/local';
import './globals.css';
import { DataQueryProvider } from '@/providers/query';
import { baseMetadata } from '@/lib/seo';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.ttf',
  variable: '--satoshi',
});

export const metadata = baseMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <SessionProvider session={session}>
          <DataQueryProvider>{children}</DataQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
