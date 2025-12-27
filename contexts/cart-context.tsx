"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { MenuItem } from "@/lib/menu-data"

export type CartItem = {
  item: MenuItem
  quantity: number
  selectedSize?: { name: string; price: number }
  price: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: MenuItem, quantity: number, selectedSize?: { name: string; price: number }) => void
  removeFromCart: (itemId: string, sizeName?: string) => void
  updateQuantity: (itemId: string, quantity: number, sizeName?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("buttg-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("buttg-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: MenuItem, quantity: number, selectedSize?: { name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.item.id === item.id &&
          (selectedSize ? cartItem.selectedSize?.name === selectedSize.name : !cartItem.selectedSize),
      )

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      }

      const price = selectedSize ? selectedSize.price : item.price
      return [...prevCart, { item, quantity, selectedSize, price }]
    })
  }

  const removeFromCart = (itemId: string, sizeName?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.item.id === itemId &&
            (sizeName ? cartItem.selectedSize?.name === sizeName : !cartItem.selectedSize)
          ),
      ),
    )
  }

  const updateQuantity = (itemId: string, quantity: number, sizeName?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, sizeName)
      return
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId && (sizeName ? cartItem.selectedSize?.name === sizeName : !cartItem.selectedSize)
          ? { ...cartItem, quantity }
          : cartItem,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
