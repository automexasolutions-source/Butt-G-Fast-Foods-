"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Clock } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const allDeals = [
  {
    id: "deal-1",
    name: "Deal 01",
    items: ["Anda Shami Burger", "Reg Fries", "Salad", "Reg Drink"],
    price: 350,
    image: "/burger-combo.png",
    tag: "Best Value",
  },
  {
    id: "deal-2",
    name: "Deal 02",
    items: ["1 Zinger Burger", "Reg Fries", "Salad", "Reg Drink"],
    price: 500,
    image: "/double-burger-combo.jpg",
    tag: "Popular",
  },
  {
    id: "deal-3",
    name: "Deal 03",
    items: ["1 Tikka Burger", "Reg Fries", "Salad", "Reg Drink"],
    price: 550,
    image: "/burger-combo.png",
  },
  {
    id: "deal-4",
    name: "Deal 04",
    items: ["1 Zinger Shawarma", "Reg Fries", "Salad", "Reg Drink"],
    price: 550,
    image: "/chicken-shawarma-wrap.png",
  },
  {
    id: "deal-5",
    name: "Deal 05",
    items: ["1 Grill Burger", "Reg Fries", "Salad", "340ml Drink"],
    price: 650,
    image: "/burger-combo.png",
  },
  {
    id: "deal-6",
    name: "Deal 06",
    items: ["1 Chicken Burger", "1 Zinger Burger", "Reg Fries Salad", "1 Ltr Drink"],
    price: 840,
    image: "/double-burger-combo.jpg",
    tag: "Family Favorite",
  },
  {
    id: "deal-7",
    name: "Deal 07",
    items: ["1 Club Sandwich", "1 Pizza Burger", "Reg Fries Salad", "1 Ltr Drink"],
    price: 940,
    image: "/family-feast-pizza-combo.jpg",
  },
  {
    id: "deal-8",
    name: "Deal 08",
    items: ["2 Zinger Burger", "Reg Fries", "Salad", "1 Ltr Drink"],
    price: 950,
    image: "/double-burger-combo.jpg",
  },
  {
    id: "deal-9",
    name: "Deal 09",
    items: ["1 Mexican Wrap", "1 Hot Wings", "Salad", "1.5 Ltr Drink"],
    price: 1150,
    image: "/chicken-shawarma-wrap.png",
  },
  {
    id: "deal-10",
    name: "Deal 10",
    items: ["1 Small Pizza", "2 Reg. Shawarma", "Half Fries", "1 Ltr Drink"],
    price: 1490,
    image: "/family-feast-pizza-combo.jpg",
  },
  {
    id: "deal-11",
    name: "Deal 11",
    items: ["4 Zinger Burger", "Half Fries", "1.5 Ltr Drink"],
    price: 1670,
    image: "/double-burger-combo.jpg",
  },
  {
    id: "deal-12",
    name: "Deal 12",
    items: ["5 Reg. Shawarma", "Reg Fries", "1.5 Ltr Drink"],
    price: 1900,
    image: "/chicken-shawarma-wrap.png",
  },
  {
    id: "deal-13",
    name: "Deal 13",
    items: ["2 Medium Pizzas", "Full Fries", "1.5 Ltr Drink"],
    price: 2450,
    image: "/family-feast-pizza-combo.jpg",
  },
  {
    id: "deal-14",
    name: "Deal 14",
    items: ["2 Large Pizzas", "Full Fries", "Half Ltr Drink"],
    price: 3400,
    image: "/family-feast-pizza-combo.jpg",
  },
  {
    id: "deal-15",
    name: "Deal 15",
    items: ["1 Family Pizza", "12 Hot Wings", "2 Chicken Shawarmas", "2 Zinger Burgers", "Full Fries", "1.5 Ltr Drink"],
    price: 4700,
    image: "/family-feast-pizza-combo.jpg",
    tag: "Ultimate Feast",
  },
]

export default function DealsPage() {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (deal: any) => {
    const dealItem = {
      id: deal.id,
      name: deal.name,
      price: deal.price,
      category: "Deals",
      description: deal.items.join(", "),
      image: deal.image,
    }
    addToCart(dealItem, 1)
    toast({
      title: "Deal added to cart!",
      description: `${deal.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Badge className="bg-[#dc2626] text-white text-lg px-6 py-2 mb-4">
              <Clock className="w-4 h-4 mr-2 inline" />
              LIMITED TIME OFFERS
            </Badge>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Hot <span className="text-[#fbbf24]">Deals</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Save big with our special combo deals. Perfect for families and groups!
          </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="bg-[#fbbf24] border-0 overflow-hidden group hover:shadow-2xl hover:shadow-[#fbbf24]/50 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${deal.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {deal.tag && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Badge className="bg-[#dc2626] text-white font-bold text-sm px-3 py-1">{deal.tag}</Badge>
                    </motion.div>
                  )}

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/90 text-[#fbbf24] font-bold text-lg px-4 py-2">SAVE 30%</Badge>
                  </div>
                </div>

                <div className="p-6 bg-black text-white">
                  <h3 className="text-2xl font-bold text-[#fbbf24] mb-4">{deal.name}</h3>

                  <div className="space-y-2 mb-6 min-h-[140px]">
                    {deal.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-[#fbbf24] mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-3xl font-bold text-[#fbbf24]">Rs {deal.price}/-</div>
                      <div className="text-xs text-gray-500">All inclusive</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(deal)}
                      className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold rounded-full px-6"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Order
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-black mb-4">Can't Decide?</h2>
          <p className="text-black/80 text-lg mb-6">Call us and we'll help you choose the perfect deal!</p>
          <a href="tel:03214500552">
            <Button
              size="lg"
              className="bg-black hover:bg-black/80 text-[#fbbf24] font-bold text-lg px-12 rounded-full"
            >
              Call Now: 0321 4500552
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
