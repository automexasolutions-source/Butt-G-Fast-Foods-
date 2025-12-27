"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/cart-context"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/deals", label: "Hot Deals" },
  { href: "/booking", label: "Book Table" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-lg shadow-2xl shadow-[#fbbf24]/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-[#fbbf24] font-bold text-3xl group-hover:scale-110 transition-transform">Butt G</div>
            <div className="text-white text-sm font-semibold">FAST FOODS</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#fbbf24] font-semibold transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fbbf24] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" className="text-white hover:text-[#fbbf24] relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <a href="tel:03214500552">
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full font-bold">
                <Phone className="w-4 h-4 mr-2" />
                0321 4500552
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black border-t border-[#fbbf24]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-[#fbbf24] font-semibold py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-[#fbbf24] text-white hover:bg-[#fbbf24]/10 bg-transparent"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Button>
              </Link>
              <a href="tel:03214500552" className="block">
                <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full font-bold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
