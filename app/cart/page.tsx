"use client"

import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <ShoppingBag className="w-32 h-32 text-gray-700 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 text-lg mb-8">Add some delicious items to get started!</p>
            <Link href="/menu">
              <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold text-lg px-8 py-6 rounded-full">
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold text-white mb-2">
            Your <span className="text-[#fbbf24]">Cart</span>
          </h1>
          <p className="text-gray-400 mb-8">{cart.length} items in your cart</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((cartItem, index) => (
                <motion.div
                  key={`${cartItem.item.id}-${cartItem.selectedSize?.name || "default"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${cartItem.item.image})` }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{cartItem.item.name}</h3>
                        {cartItem.selectedSize && (
                          <p className="text-sm text-gray-400 mb-2">Size: {cartItem.selectedSize.name}</p>
                        )}
                        <p className="text-[#fbbf24] font-bold">Rs {cartItem.price}/-</p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(cartItem.item.id, cartItem.selectedSize?.name)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(cartItem.item.id, cartItem.quantity - 1, cartItem.selectedSize?.name)
                            }
                            className="w-8 h-8 p-0 border-[#fbbf24]/20 text-white hover:bg-[#fbbf24]/10"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-white font-bold w-8 text-center">{cartItem.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(cartItem.item.id, cartItem.quantity + 1, cartItem.selectedSize?.name)
                            }
                            className="w-8 h-8 p-0 border-[#fbbf24]/20 text-white hover:bg-[#fbbf24]/10"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-white font-bold">Rs {cartItem.price * cartItem.quantity}/-</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 sticky top-32">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">Rs {getCartTotal()}/-</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-white">Rs 100/-</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#fbbf24]">Rs {getCartTotal() + 100}/-</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold text-lg py-6 rounded-full">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <Link href="/menu">
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-[#fbbf24]/20 text-white hover:bg-[#fbbf24]/10 bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
