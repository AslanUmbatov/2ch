import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MediaProvider } from "./context/MediaContext";
import { FeedProvider } from "./context/FeedContext";
import BackButtonHandler from "./components/BackButtonHandler";
import StatusBarHandler from "./components/StatusBarHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2ch /b/ Feed",
  description: "Modern 2ch client",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
        <FeedProvider>
          <MediaProvider>
            <BackButtonHandler />
            <StatusBarHandler />
            {children}
          </MediaProvider>
        </FeedProvider>
      </body>
    </html>
  );
}
