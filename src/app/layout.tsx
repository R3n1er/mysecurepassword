import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MySecurePassword - Générateur de mots de passe sécurisés",
  description:
    "Générateur de mots de passe sécurisés compatibles avec Google Workspace. Créez des mots de passe forts et sécurisés en quelques clics.",
  keywords: [
    "Générateur de mots de passe",
    "Mots de passe sécurisés",
    "Google Workspace",
    "Sécurité",
    "Cryptographie",
    "MySecurePassword",
    "MSP",
  ],
  authors: [{ name: "MySecurePassword Team" }],
  creator: "MySecurePassword",
  publisher: "MySecurePassword",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3001"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "MySecurePassword - Générateur de mots de passe sécurisés",
    description:
      "Générateur de mots de passe sécurisés compatibles avec Google Workspace. Créez des mots de passe forts et sécurisés en quelques clics.",
    url: "http://localhost:3000",
    siteName: "MySecurePassword",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MySecurePassword - Générateur de mots de passe",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MySecurePassword - Générateur de mots de passe sécurisés",
    description:
      "Générateur de mots de passe sécurisés compatibles avec Google Workspace. Créez des mots de passe forts et sécurisés en quelques clics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
