import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/providers";
import { baseMetadata } from "@/lib/seo";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const josefin = localFont({
  src: "../../public/fonts/josefin-san-variable-font.ttf",
  variable: "--josefin",
});

export const metadata = baseMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(josefin.className, josefin.variable)}>
        <Toaster />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
