"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "@/store";
import "@/app/globals.css";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
