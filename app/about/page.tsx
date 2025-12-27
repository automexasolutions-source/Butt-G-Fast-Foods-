"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Award, Heart, Users, Clock, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We use only the freshest ingredients to create authentic Pakistani flavors",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We listen and deliver excellence",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description: "Quick preparation without compromising on taste or quality",
  },
  {
    icon: Award,
    title: "Consistency",
    description: "Same great taste every single time you visit or order",
  },
]

const stats = [
  { number: "10+", label: "Years Serving" },
  { number: "50K+", label: "Happy Customers" },
  { number: "100+", label: "Menu Items" },
  { number: "4.8", label: "Average Rating" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/delicious-food-spread.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl pt-[106px] md:pt-[70px] md:text-7xl font-bold text-white mb-6">
            About <span className="text-[#fbbf24]">Butt G Fast Foods</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Serving authentic Pakistani fast food with passion and dedication
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-[#fbbf24]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Located at 18 19-B Commerical, Sher Shah Colony, Raiwand Road, Lahore, Butt G Fast Foods has become a
                  beloved destination for food lovers across the city.
                </p>
                <p>
                  We specialize in authentic Pakistani fast food, bringing you the perfect blend of traditional flavors
                  and modern convenience. From our signature burgers and pizzas to mouthwatering shawarmas and parathas,
                  every item on our menu is crafted with care.
                </p>
                <p>
                  Our commitment to quality, taste, and customer satisfaction has made us a favorite among families,
                  students, and food enthusiasts. We're open daily from 2:30 PM to 4:00 AM, ensuring you can satisfy
                  your cravings anytime.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/family-feast-pizza-combo.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-black/80 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#fbbf24]">Values</span>
            </h2>
            <p className="text-xl text-gray-400">What makes us different</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 text-center hover:border-[#fbbf24] transition-all duration-300 h-full">
                    <div className="bg-[#fbbf24] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#fbbf24]">Specialties</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Gourmet Burgers", icon: Utensils, desc: "Juicy patties with fresh ingredients" },
              { name: "Wood-Fired Pizzas", icon: Utensils, desc: "Authentic taste in every slice" },
              { name: "Fresh Shawarmas", icon: Utensils, desc: "Rolled to perfection daily" },
            ].map((specialty, index) => (
              <motion.div
                key={specialty.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black border-[#fbbf24]/20 p-8 text-center hover:scale-105 transition-transform">
                  <specialty.icon className="w-12 h-12 text-[#fbbf24] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{specialty.name}</h3>
                  <p className="text-gray-400">{specialty.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience the Taste?</h2>
            <p className="text-xl text-gray-400 mb-8">Visit us today or place your order for home delivery</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button
                  size="lg"
                  className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold text-lg px-12 py-6 rounded-full"
                >
                  View Menu
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black font-bold text-lg px-12 py-6 rounded-full bg-transparent"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
