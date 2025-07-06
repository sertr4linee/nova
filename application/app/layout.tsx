import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import { ReactPlugin } from "@stagewise-plugins/react";
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

export const metadata: Metadata = {
  title: "nova",
  description: "Sites web sur-mesure pour créateurs indépendants et petites équipes",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased overflow-x-hidden`}
      >
        {children}
        {/* wrap cursor in responsive block to disable on small screens */}
        <div className="hidden md:block">
          <ClientComponents />
        </div>
        <StagewiseToolbar
          config={{
            plugins: [ReactPlugin],
          }}
        />
        <Footer />
      </body>
    </html>
  );
}


