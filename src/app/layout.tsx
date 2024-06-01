import localFont from 'next/font/local';
import './globals.css';
import { DataQueryProvider } from '@/providers/query';
import { baseMetadata } from '@/lib/seo';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';

const josefin = localFont({
  src: '../../public/fonts/josefin-san-variable-font.ttf',
  variable: '--josefin',
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
      <body className={cn(josefin.className, josefin.variable)}>
        <SessionProvider session={session}>
          <DataQueryProvider>{children}</DataQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
