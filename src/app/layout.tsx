import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nishant Singh Chauhan | Portfolio OS",
  description:
    "Interactive macOS-inspired portfolio of Nishant Singh Chauhan — Full Stack Developer, Python Developer, AI Enthusiast, and Broadcast Engineer.",
  keywords: [
    "Nishant Singh Chauhan",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Python",
    "AI",
  ],
  authors: [{ name: "Nishant Singh Chauhan" }],
  openGraph: {
    title: "Nishant Singh Chauhan | Portfolio OS",
    description: "An interactive macOS-inspired developer portfolio",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <body className="h-full overflow-hidden antialiased">{children}</body>
    </html>
  );
}
