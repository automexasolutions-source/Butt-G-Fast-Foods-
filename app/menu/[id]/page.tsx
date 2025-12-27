"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { menuItems } from "@/lib/menu-data"
import { ArrowLeft, ShoppingCart, Flame, Sparkles, Check, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function MenuDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const item = menuItems.find((i) => i.id === params.id)

  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0] || null)
  const [quantity, setQuantity] = useState(1)

  if (!item) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Item Not Found</h1>
          <p className="text-gray-400 mb-8">The menu item you're looking for doesn't exist.</p>
          <Link href="/menu">
            <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold">Back to Menu</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedItems = menuItems.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3)

  const currentPrice = selectedSize ? selectedSize.price : item.price
  const totalPrice = currentPrice * quantity

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedSize || undefined)
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${item.name} ${selectedSize ? `(${selectedSize.name})` : ""} added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Button onClick={() => router.back()} variant="ghost" className="text-white hover:text-[#fbbf24] mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 overflow-hidden hover:shadow-2xl hover:shadow-[#fbbf24]/20 transition-all">
              <div className="relative h-96 lg:h-[500px] group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex gap-2">
                  {item.isPopular && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Badge className="bg-[#dc2626] text-white font-bold text-sm px-3 py-1">
                        <Flame className="w-4 h-4 mr-1" />
                        Popular
                      </Badge>
                    </motion.div>
                  )}
                  {item.isNew && (
                    <Badge className="bg-[#fbbf24] text-black font-bold text-sm px-3 py-1">
                      <Sparkles className="w-4 h-4 mr-1" />
                      New
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-black/80 text-[#fbbf24] border border-[#fbbf24]/50 font-semibold text-sm px-3 py-1">
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{item.name}</h1>

            {item.description && <p className="text-gray-300 text-lg mb-6 leading-relaxed">{item.description}</p>}

            {/* Size Selection */}
            {item.sizes && item.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-3">Select Size</h3>
                <div className="grid grid-cols-2 gap-3">
                  {item.sizes.map((size) => (
                    <motion.button
                      key={size.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        selectedSize?.name === size.name
                          ? "border-[#fbbf24] bg-[#fbbf24]/10"
                          : "border-[#fbbf24]/20 bg-[#1a1a1a] hover:border-[#fbbf24]/50"
                      }`}
                    >
                      {selectedSize?.name === size.name && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-[#fbbf24] rounded-full p-1">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                        </div>
                      )}
                      <div className="text-white font-semibold">{size.name}</div>
                      <div className="text-[#fbbf24] font-bold">Rs {size.price}/-</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Display */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-[#fbbf24] mb-2">Rs {currentPrice}/-</div>
              {item.sizes && <div className="text-sm text-gray-400">per item</div>}
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-white font-bold text-lg mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-[#fbbf24]/20 w-12 h-12"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <div className="text-2xl font-bold text-white w-16 text-center">{quantity}</div>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-[#fbbf24]/20 w-12 h-12"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300 text-lg">Subtotal</span>
                <span className="text-white font-bold text-xl">Rs {totalPrice}/-</span>
              </div>
              {quantity > 1 && (
                <div className="text-sm text-gray-400 mb-4">
                  Rs {currentPrice} x {quantity} items
                </div>
              )}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-lg py-6 rounded-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - Rs {totalPrice}/-
              </Button>
            </Card>

            {/* Additional Info */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6">
              <h3 className="text-white font-bold text-lg mb-3">Delivery Information</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24] mt-1">✓</span>
                  <span>Minimum order: Rs 500/-</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24] mt-1">✓</span>
                  <span>Delivery time: 30-45 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#fbbf24] mt-1">✓</span>
                  <span>Fresh ingredients daily</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              More from <span className="text-[#fbbf24]">{item.category}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, index) => (
                <motion.div
                  key={relatedItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href={`/menu/${relatedItem.id}`}>
                    <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 overflow-hidden hover:border-[#fbbf24] transition-all duration-300 hover:shadow-2xl hover:shadow-[#fbbf24]/20 cursor-pointer">
                      <div className="relative h-48 overflow-hidden group">
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${relatedItem.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 hover:text-[#fbbf24] transition-colors">
                          {relatedItem.name}
                        </h3>
                        <div className="text-xl font-bold text-[#fbbf24]">Rs {relatedItem.price}/-</div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
