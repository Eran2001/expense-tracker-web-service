import type { Metadata } from "next";
import { Geist_Mono, Manrope, Noto_Sans_Sinhala } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-ledger",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
});

export const metadata: Metadata = {
  title: "Ledger | Personal Money Manager",
  description: "A private personal finance ledger.",
  applicationName: "Ledger",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="ledger-theme-bootstrap" strategy="beforeInteractive">
          {`try {
            const savedTheme = localStorage.getItem("ledger-theme");
            if (savedTheme === "dark" || savedTheme === "light") {
              document.documentElement.classList.toggle("dark", savedTheme === "dark");
            }
          } catch {}`}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${geistMono.variable} ${notoSinhala.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
