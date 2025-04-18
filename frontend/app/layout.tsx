import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pawgress',
  description: 'Track your pet\'s progress and activities',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 