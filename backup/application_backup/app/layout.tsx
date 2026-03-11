import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientComponents from "./client-components";
import Footer from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "nova",
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
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${cormorant.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <div className="hidden md:block">
          <ClientComponents />
        </div>
        <Footer />
      </body>
    </html>
  );
}
