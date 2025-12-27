"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Flame } from "lucide-react"

const categories = [
  {
    name: "Burgers",
    image: "/juicy-cheeseburger.png",
    description: "Juicy, flame-grilled perfection",
    items: 12,
  },
  {
    name: "Pizzas",
    image: "/delicious-pizza-slice.jpg",
    description: "Hand-tossed with love",
    items: 9,
  },
  {
    name: "Shawarmas",
    image: "/chicken-shawarma-wrap.png",
    description: "Authentic Pakistani taste",
    items: 15,
  },
  {
    name: "Fries",
    image: "/loaded-cheese-fries.jpg",
    description: "Crispy golden goodness",
    items: 6,
  },
]

export default function FeaturedMenu() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-[#fbbf24]">Signature</span> Menu
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our diverse range of Pakistani fast food favorites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/menu?category=${category.name.toLowerCase()}`}>
                <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 overflow-hidden group hover:border-[#fbbf24] transition-all duration-300 hover:scale-105">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-[#dc2626]" />
                        <span className="text-[#fbbf24] font-semibold">{category.items} Items</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-lg px-12 py-6 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              View Full Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
