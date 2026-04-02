import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Vidmaxx: AI video generator and scheduler app",
  description: "Vidmaxx is an AI video generator and scheduler app that helps you create and schedule videos for social media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${roboto.variable} font-sans dark h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
