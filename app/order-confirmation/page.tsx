"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Package } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-400 mb-8">Thank you for your order</p>

          <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-8 mb-8">
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Order ID</p>
                <p className="text-2xl font-bold text-[#fbbf24]">#{orderId}</p>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-start gap-4 text-left">
                  <Package className="w-6 h-6 text-[#fbbf24] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">What happens next?</h3>
                    <ul className="text-gray-400 space-y-2 text-sm">
                      <li>✓ Your order has been received</li>
                      <li>✓ Payment verification in progress</li>
                      <li>✓ We'll send a confirmation email shortly</li>
                      <li>✓ Your order will be prepared and delivered within 30-45 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#fbbf24] text-black p-4 rounded-lg">
                <p className="font-bold">Order status updates will be sent to your email</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold px-8">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                variant="outline"
                className="border-[#fbbf24]/20 text-white hover:bg-[#fbbf24]/10 px-8 bg-transparent"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black pt-32" />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
