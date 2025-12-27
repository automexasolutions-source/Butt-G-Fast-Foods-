"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Contact form submitted:", formData)
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
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
          <h2 className="text-4xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-xl text-gray-300 mb-2">Thank you for contacting us</p>
          <p className="text-gray-400">We'll get back to you as soon as possible</p>
        </motion.div>
      </div>
    )
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Get in <span className="text-[#fbbf24]">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Location */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 hover:border-[#fbbf24] transition-colors">
              <div className="bg-[#fbbf24] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                18 19-B Commerical
                <br />
                Sher Shah Colony, Raiwand Road
                <br />
                Lahore, Pakistan
              </p>
            </Card>

            {/* Phone */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 hover:border-[#fbbf24] transition-colors">
              <div className="bg-[#fbbf24] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
              <a href="tel:03214500552" className="text-gray-400 hover:text-[#fbbf24] transition-colors text-lg">
                0321 4500552
              </a>
              <p className="text-gray-500 text-sm mt-1">Order & Reservations</p>
            </Card>

            {/* Email */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-6 hover:border-[#fbbf24] transition-colors">
              <div className="bg-[#fbbf24] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email Us</h3>
              <a href="mailto:info@buttgfastfoods.com" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                info@buttgfastfoods.com
              </a>
              <p className="text-gray-500 text-sm mt-1">General inquiries</p>
            </Card>

            {/* Hours */}
            <Card className="bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] p-6">
              <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <h3 className="text-black font-bold text-lg mb-2">Opening Hours</h3>
              <p className="text-black text-lg font-semibold">2:30 PM - 4:00 AM</p>
              <p className="text-black/80 text-sm mt-1">Open Daily</p>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2">
                      Your Email *
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
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2">
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

                  <div>
                    <Label htmlFor="subject" className="text-white mb-2">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-white mb-2">
                    Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`bg-black border-[#fbbf24]/20 text-white focus:border-[#fbbf24] min-h-[150px] ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    placeholder="Tell us what's on your mind..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-lg py-6 rounded-full"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Map */}
            <Card className="bg-[#1a1a1a] border-[#fbbf24]/20 p-8 mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Find Us on Map</h3>
              <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.404!2d74.2744!3d31.4678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzA0LjEiTiA3NMKwMTYnMjcuOCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Butt G Fast Foods Location"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
