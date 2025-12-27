"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, Phone, Mail, User, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeSlots = [
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
]

const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (!formData.guests) newErrors.guests = "Number of guests is required"

    // Phone validation
    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Email validation (optional but if provided should be valid)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Booking submitted:", formData)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          specialRequests: "",
        })
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-[#fbbf24] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-xl text-gray-300 mb-2">Thank you for choosing Butt G Fast Foods</p>
          <p className="text-gray-400">We'll call you shortly to confirm your reservation</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Book a <span className="text-[#fbbf24]">Table</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Reserve your spot and enjoy our delicious food in a comfortable setting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Reservation Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-white mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#fbbf24]" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#fbbf24]" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="03XX XXXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Email (Optional) */}
                <div>
                  <Label htmlFor="email" className="text-white mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#fbbf24]" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-white mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#fbbf24]" />
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                        errors.date ? "border-red-500" : ""
                      }`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-white mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#fbbf24]" />
                      Time *
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
                      <SelectTrigger
                        className={`bg-black border-[#fbbf24]/20 text-white ${errors.time ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <Label htmlFor="guests" className="text-white mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#fbbf24]" />
                    Number of Guests *
                  </Label>
                  <Select value={formData.guests} onValueChange={(value) => handleChange("guests", value)}>
                    <SelectTrigger
                      className={`bg-black border-[#fbbf24]/20 text-white ${errors.guests ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {guestCounts.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count} {count === "1" ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                </div>

                {/* Special Requests */}
                <div>
                  <Label htmlFor="requests" className="text-white mb-2">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="requests"
                    value={formData.specialRequests}
                    onChange={(e) => handleChange("specialRequests", e.target.value)}
                    className="bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] min-h-[100px]"
                    placeholder="Any special requirements or dietary restrictions?"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-lg py-6 rounded-full"
                >
                  Confirm Reservation
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Restaurant Info */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Visit Us</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-[#fbbf24] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Opening Hours</h4>
                    <p className="text-gray-400">2:30 PM to 4:00 AM</p>
                    <p className="text-gray-500 text-sm">Open Daily</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#fbbf24] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Contact</h4>
                    <a href="tel:03214500552" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                      0321 4500552
                    </a>
                    <p className="text-gray-500 text-sm">Call for reservations</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#fbbf24] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-400 text-sm">18 19-B Commerical</p>
                    <p className="text-gray-400 text-sm">Sher Shah Colony, Raiwand Road</p>
                    <p className="text-gray-400 text-sm">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Booking Info */}
            <Card className="bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] p-8">
              <h3 className="text-2xl font-bold text-black mb-4">Important Information</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Reservations are confirmed via phone call</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Please arrive within 15 minutes of your booking time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Large groups (10+) require advance notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Cancellations should be made 24 hours in advance</span>
                </li>
              </ul>
            </Card>

            {/* Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/delicious-food-spread.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-2xl font-bold text-white mb-2">Comfortable Dining</h4>
                <p className="text-gray-300">Experience great food in a welcoming atmosphere</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
