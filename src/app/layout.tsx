import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { geistMono, geistSans, oxanium } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ben Beck | Paradigm",
    template: "%s | Ben Beck",
  },
  description:
    "Rising through continuous transformation. Exploring technology, fitness, psychology, personality typology, and literature.",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oxanium.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
