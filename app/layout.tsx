import React from 'react';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insight ERP - Head Office",
  description: "Enterprise Resource Planning System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}