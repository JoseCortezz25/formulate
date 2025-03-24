import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formulate: Build forms with ease.",
  description: "Build forms with ease, save time, and get started quickly. Generate forms for React (with Shadcn + React Hook Form) or native HTML (with Just Validate), ready for production, without the headache.",
  authors: [
    {
      name: "Alfonso Chavarro",
      url: "https://github.com/JoseCortezz25"
    }
  ],
  metadataBase: new URL("https://formulate-generator.vercel.app"),
  openGraph: {
    title: "Formulate: Build forms with ease.",
    description: "Build forms with ease, save time, and get started quickly. Generate forms for React (with Shadcn + React Hook Form) or native HTML (with Just Validate), ready for production, without the headache.",
    url: "https://formulate-generator.vercel.app",
    siteName: "Formulate"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>{children}</body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
};
