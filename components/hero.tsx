"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80",
    title: "Welcome to Butt G Fast Foods",
    subtitle: "Where Taste Meets Quality",
    description: "Experience the finest Pakistani fast food in Lahore",
    cta: "Explore Menu",
    ctaLink: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80",
    title: "Authentic Pakistani Flavors",
    subtitle: "From Burgers to Shawarmas",
    description: "Handcrafted with love and traditional spices",
    cta: "Order Now",
    ctaLink: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80",
    title: "Hot Deals Every Day",
    subtitle: "Save More, Eat More",
    description: "Check out our amazing combo deals starting from Rs 350",
    cta: "View Deals",
    ctaLink: "/deals",
  },
  {
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1920&q=80",
    title: "Fresh & Delicious Pizzas",
    subtitle: "Multiple Sizes & Flavors",
    description: "Regular & Crust pizzas with premium toppings",
    cta: "See Menu",
    ctaLink: "/menu",
  },
  {
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1920&q=80",
    title: "Signature Shawarmas",
    subtitle: "Large, Platter & Regular Options",
    description: "Juicy chicken wrapped in fresh bread",
    cta: "Order Now",
    ctaLink: "/menu",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{ y }}
        >
          <Image
            src={heroSlides[currentSlide].image || "/placeholder.svg"}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/10 to-[#dc2626]/10 z-10" />

      {/* Animated particles effect */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#fbbf24] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ opacity }}
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <motion.div
            className="text-[#fbbf24] font-bold text-6xl md:text-8xl mb-4 tracking-tighter"
            animate={{
              textShadow: [
                "0 0 20px rgba(251, 191, 36, 0.5)",
                "0 0 40px rgba(251, 191, 36, 0.8)",
                "0 0 20px rgba(251, 191, 36, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Butt G
          </motion.div>
          <div className="text-[#dc2626] font-bold text-3xl md:text-5xl tracking-wide">FAST FOODS</div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-3xl text-[#fbbf24] mb-3 font-semibold"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base md:text-xl text-gray-200 mb-8"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href={heroSlides[currentSlide].ctaLink}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold text-lg px-8 py-6 rounded-full shadow-2xl"
                  >
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              </Link>
              <Link href="/booking">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#dc2626] text-white hover:bg-[#dc2626] hover:text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl bg-transparent"
                  >
                    Book a Table
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-12 bg-[#fbbf24]" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-[#fbbf24]" />
        </motion.div>
      </motion.div>
    </div>
  )
}
