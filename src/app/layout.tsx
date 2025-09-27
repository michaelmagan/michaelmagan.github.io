import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magan.info"),
  title: {
    default: "Michael Magan — Thoughts & Reading",
    template: "%s — Michael Magan",
  },
  description:
    "Personal site for Michael Magan. Thoughts, notes, and books I'm reading.",
  openGraph: {
    title: "Michael Magan — Thoughts & Reading",
    description:
      "Personal site for Michael Magan. Thoughts, notes, and books I'm reading.",
    type: "website",
    locale: "en_US",
    url: "https://magan.info",
    siteName: "Michael Magan",
    images: [
      {
        url: "/michael-magan-li.jpeg",
        width: 1200,
        height: 630,
        alt: "Michael Magan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mrmagan_",
    creator: "@mrmagan_",
    title: "Michael Magan — Thoughts & Reading",
    description:
      "Personal site for Michael Magan. Thoughts, notes, and books I'm reading.",
    images: ["/michael-magan-li.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto max-w-5xl px-6 py-12">
          <header className="flex items-center justify-between pb-6">
            <Link
              href="/"
              className={`${fraunces.className} font-semibold tracking-tight`}
            >
              Michael Magán
            </Link>
            <Nav />
          </header>
          <main>{children}</main>
          <footer className="mt-12 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
            <p>
              Follow on X:{" "}
              <a
                href="https://x.com/mrmagan_"
                className="font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @mrmagan_
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
