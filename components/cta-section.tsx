"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Visit Us Today!</h2>
          <p className="text-xl text-black/80 mb-8">Experience the best fast food in Lahore</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-black/90 rounded-2xl p-6 text-center"
          >
            <MapPin className="w-8 h-8 text-[#fbbf24] mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Location</h3>
            <p className="text-gray-300 text-sm">18 19-B Commerical, Sher Shah Colony, Raiwand Road, Lahore</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/90 rounded-2xl p-6 text-center"
          >
            <Clock className="w-8 h-8 text-[#fbbf24] mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Opening Hours</h3>
            <p className="text-gray-300 text-sm">2:30pm to 4:00am</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-black/90 rounded-2xl p-6 text-center"
          >
            <Phone className="w-8 h-8 text-[#fbbf24] mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Call Us</h3>
            <p className="text-gray-300 text-sm">0321 4500552</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-black hover:bg-black/80 text-[#fbbf24] font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Order Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-[#fbbf24] font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform bg-transparent"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
