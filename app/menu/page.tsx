"use client"

import { useState, useMemo, Suspense } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { menuItems, categories } from "@/lib/menu-data"
import MenuCard from "@/components/menu-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"

function MenuPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by price range
    filtered = filtered.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange])

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-[#fbbf24]">Menu</span>
          </h1>
          <p className="text-xl text-gray-400">Explore our delicious offerings</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for burgers, pizza, shawarma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-[#1a1a1a] border-[#fbbf24]/20 text-white placeholder:text-gray-500 focus:border-[#fbbf24] text-lg"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-[#fbbf24]/20 px-6"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#1a1a1a] border border-[#fbbf24]/20 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 5000])
                    setSortBy("name")
                  }}
                  className="text-[#fbbf24]"
                >
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white font-semibold mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-black border-[#fbbf24]/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Price Range</label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="bg-black border-[#fbbf24]/20 text-white"
                      placeholder="Min"
                    />
                    <span className="text-white">-</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="bg-black border-[#fbbf24]/20 text-white"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-3 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-[#fbbf24] text-black hover:bg-[#f59e0b]"
                    : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-[#fbbf24]/20"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400">
            Showing <span className="text-[#fbbf24] font-bold">{filteredAndSortedItems.length}</span> items
            {selectedCategory !== "All" && (
              <>
                {" "}
                in <span className="text-white font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          {(searchQuery || selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < 5000) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange([0, 5000])
              }}
              className="text-[#dc2626] hover:text-[#dc2626]/80"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange([0, 5000])
              }}
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black pt-32" />}>
      <MenuPageContent />
    </Suspense>
  )
}
