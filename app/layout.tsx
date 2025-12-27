import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Butt G Fast Foods | Best Fast Food in Lahore",
  description:
    "Experience authentic Pakistani fast food - Burgers, Pizzas, Shawarmas & More. Located in Lahore with home delivery available.",
  keywords: "fast food, Lahore restaurant, burgers, pizza, shawarma, Pakistani food",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
