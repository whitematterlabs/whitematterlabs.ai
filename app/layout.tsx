import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "White Matter Labs",
  description:
    "Building the future of personal computing.",
  metadataBase: new URL("https://whitematterlabs.ai"),
  openGraph: {
    title: "White Matter Labs",
    description:
      "Building the future of personal computing.",
    type: "website",
  },
  icons: { icon: "/brand/wml-mark.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
