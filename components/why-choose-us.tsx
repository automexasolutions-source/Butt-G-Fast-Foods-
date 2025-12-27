"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Clock, Award, Truck, Shield } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Fast Service",
    description: "Quick preparation and delivery times",
  },
  {
    icon: Award,
    title: "Quality Food",
    description: "Fresh ingredients, authentic taste",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    description: "Available with minimum order 500Rs",
  },
  {
    icon: Shield,
    title: "Hygiene First",
    description: "Maintaining highest standards",
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Why Choose <span className="text-[#fbbf24]">Us?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-black border-[#fbbf24]/20 p-8 text-center hover:border-[#fbbf24] transition-all duration-300 hover:scale-105">
                  <div className="bg-[#fbbf24] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
