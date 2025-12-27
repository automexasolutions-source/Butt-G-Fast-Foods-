import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-[#fbbf24]/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-[#fbbf24] font-bold text-3xl mb-2">Butt G</div>
            <div className="text-white text-sm font-semibold mb-4">FAST FOODS</div>
            <p className="text-gray-400 text-sm">
              Serving authentic Pakistani fast food with quality and passion since establishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#fbbf24] font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Hot Deals
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  Book Table
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#fbbf24] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#fbbf24] font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1 text-[#fbbf24] flex-shrink-0" />
                <span>18 19-B Commerical, Sher Shah Colony, Raiwand Road, Lahore</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-[#fbbf24]" />
                <a href="tel:03214500552" className="hover:text-[#fbbf24] transition-colors">
                  0321 4500552
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-[#fbbf24]" />
                <span>2:30pm - 4:00am</span>
              </li>
            </ul>
          </div>
{/* .. */}
          {/* Delivery Info */}
          <div>
            <h3 className="text-[#fbbf24] font-bold text-lg mb-4">Delivery</h3>
            <p className="text-gray-400 text-sm mb-4">Home delivery available with minimum order of 500Rs</p>
            <div className="bg-[#dc2626] text-white px-4 py-2 rounded-lg text-center font-bold">
              Order & Reservation
            </div>
          </div>
        </div>

        <div className="border-t border-[#fbbf24]/20 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Butt G Fast Foods. All rights reserved. Made by Automexa Solutions</p>
        </div>
      </div>
    </footer>
  )
}
