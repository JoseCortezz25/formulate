import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formulate",
  description: "Build forms with ease, save time, and get started quickly.",
  authors: [
    {
      name: "Alfonso Chavarro",
      url: "https://github.com/JoseCortezz25"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
};
