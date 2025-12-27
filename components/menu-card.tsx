"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/menu-data"
import Link from "next/link"
import { ShoppingCart, Flame, Sparkles } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface MenuCardProps {
  item: MenuItem
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const size = item.sizes?.[0]
    addToCart(item, 1, size)
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Link href={`/menu/${item.id}`}>
      <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 overflow-hidden group hover:border-[#fbbf24] transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-2xl hover:shadow-[#fbbf24]/20">
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isPopular && (
              <Badge className="bg-[#dc2626] text-white font-bold border-0">
                <Flame className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
            {item.isNew && (
              <Badge className="bg-[#fbbf24] text-black font-bold border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/80 text-[#fbbf24] border border-[#fbbf24]/50 font-semibold">
              {item.category}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fbbf24] transition-colors">
            {item.name}
          </h3>
          {item.description && <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>}

          {/* Size Options Indicator */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="text-xs text-gray-500 mb-3">Available in {item.sizes.length} sizes</div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-[#fbbf24]">Rs {item.price}/-</span>
              {item.sizes && <span className="text-xs text-gray-500 block">Starting from</span>}
            </div>
            <Button
              size="sm"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
