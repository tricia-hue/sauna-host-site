import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Sauna Host — A free 5-day mini course from Revivery",
  description:
    "Become the host your friends will remember. A free 5-day mini course on hosting a sauna and cold plunge gathering — women's circle, men's gathering, milestone celebration, or book club.",
  metadataBase: new URL("https://revivery.co"),
  openGraph: {
    title: "The Sauna Host",
    description:
      "A free 5-day mini course from Revivery on hosting a sauna and cold plunge gathering.",
    url: "https://revivery.co/host",
    siteName: "Revivery",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Sauna Host — Revivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sauna Host",
    description:
      "A free 5-day mini course from Revivery on hosting a sauna and cold plunge gathering.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
