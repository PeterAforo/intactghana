import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Intact Ghana - Electronics & Technology Store",
    template: "%s | Intact Ghana",
  },
  description: "Ghana's trusted destination for electronics, laptops, phones, and technology products. Quality guaranteed with warranty.",
  keywords: ["electronics", "laptops", "phones", "Ghana", "technology", "computers", "accessories"],
  authors: [{ name: "Intact Ghana" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://intactghana.com",
    siteName: "Intact Ghana",
    title: "Intact Ghana - Electronics & Technology Store",
    description: "Ghana's trusted destination for electronics, laptops, phones, and technology products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intact Ghana - Electronics & Technology Store",
    description: "Ghana's trusted destination for electronics, laptops, phones, and technology products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
