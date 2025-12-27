"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentScreenshot(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentScreenshot) {
      toast({
        title: "Payment proof required",
        description: "Please upload EasyPaisa payment screenshot",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend("phone", formData.phone)
      formDataToSend.append("address", formData.address)
      formDataToSend.append("notes", formData.notes)
      formDataToSend.append("screenshot", paymentScreenshot)
      formDataToSend.append("cart", JSON.stringify(cart))
      formDataToSend.append("total", String(getCartTotal() + 100))

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        clearCart()
        router.push(`/order-confirmation?orderId=${data.orderId}`)
      } else {
        throw new Error(data.error || "Failed to submit order")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  const total = getCartTotal() + 100

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold text-white mb-2">
            <span className="text-[#fbbf24]">Checkout</span>
          </h1>
          <p className="text-gray-400 mb-8">Complete your order</p>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Delivery Information</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black border-[#fbbf24]/20 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-black border-[#fbbf24]/20 text-white"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-black border-[#fbbf24]/20 text-white"
                          placeholder="03XX XXXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-white">
                        Delivery Address *
                      </Label>
                      <Textarea
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-black border-[#fbbf24]/20 text-white"
                        placeholder="Enter complete delivery address"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-white">
                        Order Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="bg-black border-[#fbbf24]/20 text-white"
                        placeholder="Any special instructions..."
                        rows={2}
                      />
                    </div>
                  </div>
                </Card>

                {/* Payment Information */}
                <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Payment via EasyPaisa</h2>

                  <div className="bg-[#fbbf24] text-black p-6 rounded-lg mb-6">
                    <p className="font-bold text-lg mb-2">Send payment to:</p>
                    <p className="text-2xl font-bold">0321 4500552</p>
                    <p className="text-sm mt-2">Account Title: Butt G Fast Foods</p>
                    <p className="text-sm font-bold mt-4">Amount: Rs {total}/-</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white">Upload Payment Screenshot *</Label>
                    <div className="border-2 border-dashed border-[#fbbf24]/30 rounded-lg p-8 text-center hover:border-[#fbbf24] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="screenshot-upload"
                        required
                      />
                      <label htmlFor="screenshot-upload" className="cursor-pointer">
                        {previewUrl ? (
                          <div>
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Payment screenshot"
                              className="max-h-64 mx-auto rounded-lg mb-4"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="border-[#fbbf24] text-white bg-transparent"
                            >
                              Change Screenshot
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-white font-semibold mb-2">Click to upload payment screenshot</p>
                            <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 sticky top-32">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((cartItem) => (
                      <div
                        key={`${cartItem.item.id}-${cartItem.selectedSize?.name || "default"}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-400">
                          {cartItem.quantity}x {cartItem.item.name}
                          {cartItem.selectedSize && ` (${cartItem.selectedSize.name})`}
                        </span>
                        <span className="text-white">Rs {cartItem.price * cartItem.quantity}/-</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-gray-800 pt-4 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white">Rs {getCartTotal()}/-</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery</span>
                      <span className="text-white">Rs 100/-</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold pt-3 border-t border-gray-800">
                      <span className="text-white">Total</span>
                      <span className="text-[#fbbf24]">Rs {total}/-</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold text-lg py-6 rounded-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
