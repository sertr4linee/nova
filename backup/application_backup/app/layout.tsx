import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientComponents from "./client-components";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "NOVA — Web Development Studio",
  description: "Sites web sur-mesure pour créateurs indépendants et petites équipes"
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body
        className={`${bebasNeue.variable} ${spaceMono.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <div className="hidden md:block">
          <ClientComponents />
        </div>
      </body>
    </html>
  );
}