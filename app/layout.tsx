import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";
import { InitialLoader } from "./components/InitialLoader";
import { PageTransition } from "./components/PageTransition";
import { ReadyProvider } from "./components/anim/ReadyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LFC Wires & Cables — Bridging the gap of connectivity",
  description:
    "Manufacturer of precision wires, cables, connectors and electromechanical components for automotive, appliance and industrial applications. ISO 9001 certified.",
  metadataBase: new URL("https://lfcpowercab.com"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "LFC Wires & Cables",
    description:
      "Bridging the gap of connectivity — wires, cables and connectors engineered for the mobility of tomorrow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ReadyProvider>
          <SmoothScroll />
          <InitialLoader />
          <Nav />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ReadyProvider>
      </body>
    </html>
  );
}
