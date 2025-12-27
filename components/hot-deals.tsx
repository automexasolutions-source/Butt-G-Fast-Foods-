"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const deals = [
  {
    id: 1,
    name: "Deal 01",
    items: ["Anda Shami Burger", "Reg Fries", "Salad", "Reg Drink"],
    price: 350,
    image: "/burger-combo.png",
  },
  {
    id: 2,
    name: "Deal 06",
    items: ["1 Chicken Burger", "1 Zinger Burger", "Reg Fries Salad", "1 Ltr Drink"],
    price: 840,
    image: "/double-burger-combo.jpg",
  },
  {
    id: 3,
    name: "Deal 15",
    items: ["1 Family Pizza", "12 Hot Wings", "2 Chicken Shawarmas", "2 Zinger Burgers", "Full Fries", "1.5 Ltr Drink"],
    price: 4700,
    image: "/family-feast-pizza-combo.jpg",
  },
]

export default function HotDeals() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-black to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Badge className="bg-[#dc2626] text-white text-lg px-4 py-2 mb-4">LIMITED TIME OFFERS</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Hot <span className="text-[#fbbf24]">Deals</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl">Unbeatable value with our special combo deals</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#fbbf24] border-0 overflow-hidden group hover:shadow-2xl hover:shadow-[#fbbf24]/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${deal.image})` }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#dc2626] text-white font-bold text-lg px-3 py-1">SAVE 30%</Badge>
                  </div>
                </div>

                <div className="p-6 bg-black text-white">
                  <h3 className="text-2xl font-bold text-[#fbbf24] mb-4">{deal.name}</h3>
                  <ul className="space-y-2 mb-6">
                    {deal.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-[#fbbf24] mt-1">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-[#fbbf24]">Rs {deal.price}/-</span>
                    </div>
                    <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Order
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
