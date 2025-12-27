import Hero from "@/components/hero"
import FeaturedMenu from "@/components/featured-menu"
import HotDeals from "@/components/hot-deals"
import WhyChooseUs from "@/components/why-choose-us"
import CTASection from "@/components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedMenu />
      <HotDeals />
      <WhyChooseUs />
      <CTASection />
    </main>
  )
}
