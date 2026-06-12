import HeroSection from '@/components/home/HeroSection';
import TrendingProducts from '@/components/home/TrendingProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import NewsletterCTA from '@/components/home/NewsletterCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <HeroSection />
      {/* Suspense isn't strictly necessary here because Next.js handles server component loading, but it's good practice if TrendingProducts does heavy async fetching */}
      <TrendingProducts />
      <CategoryShowcase />
      <Features />
      <Testimonials />
      <NewsletterCTA />
    </div>
  );
}
