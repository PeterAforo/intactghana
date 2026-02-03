import { Metadata } from "next";
import {
  HeroSlider,
  QuickCategories,
  FeaturedProducts,
  PromotionalBanners,
  AIRecommendations,
  TopSelling,
  BrandPartners,
  TrustIndicators,
  Newsletter,
} from "@/components/store/home";

export const metadata: Metadata = {
  title: "Intact Ghana - Buy Electronics, Phones & Home Appliances Online",
  description:
    "Shop the latest electronics, smartphones, laptops, TVs, and home appliances in Ghana. Free delivery on orders over GH¢3,000. Buy now, pay later with Canpay.",
  keywords:
    "electronics ghana, laptops ghana, smartphones ghana, home appliances, buy electronics online, intact ghana",
  openGraph: {
    title: "Intact Ghana - Buy Electronics, Phones & Home Appliances Online",
    description:
      "Shop the latest electronics, smartphones, laptops, TVs, and home appliances in Ghana. Free delivery on orders over GH¢3,000.",
    type: "website",
    locale: "en_GH",
    siteName: "Intact Ghana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intact Ghana - Buy Electronics Online",
    description:
      "Shop the latest electronics in Ghana. Free delivery on orders over GH¢3,000.",
  },
};

// Mock data - In production, this would come from API
const featuredProducts = [
  {
    id: "1",
    name: "Dell Latitude 7430 Business Laptop",
    slug: "dell-latitude-7430",
    price: 8500,
    originalPrice: 9500,
    image: "/images/products/dell-latitude.jpg",
    brand: "Dell",
    rating: 4.8,
    reviewCount: 124,
    badge: "hot" as const,
    discount: 11,
    inStock: true,
  },
  {
    id: "2",
    name: "HP ProBook 450 G9 Notebook",
    slug: "hp-probook-450",
    price: 6200,
    image: "/images/products/hp-probook.jpg",
    brand: "HP",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Lenovo ThinkPad E14 Gen 4",
    slug: "lenovo-thinkpad-e14",
    price: 5800,
    originalPrice: 6500,
    image: "/images/products/lenovo-thinkpad.jpg",
    brand: "Lenovo",
    rating: 4.7,
    reviewCount: 156,
    badge: "sale" as const,
    discount: 11,
    inStock: true,
  },
  {
    id: "4",
    name: "MacBook Air M2 13-inch",
    slug: "macbook-air-m2",
    price: 9800,
    image: "/images/products/macbook-air.jpg",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 312,
    badge: "new" as const,
    inStock: true,
  },
  {
    id: "5",
    name: "ASUS ROG Strix G15 Gaming",
    slug: "asus-rog-strix",
    price: 7500,
    originalPrice: 8200,
    image: "/images/products/asus-rog.jpg",
    brand: "ASUS",
    rating: 4.5,
    reviewCount: 78,
    badge: "sale" as const,
    discount: 9,
    inStock: true,
  },
  {
    id: "6",
    name: "Acer Aspire 5 Slim Laptop",
    slug: "acer-aspire-5",
    price: 4200,
    image: "/images/products/acer-aspire.jpg",
    brand: "Acer",
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: "7",
    name: "Samsung Galaxy Book3 Pro",
    slug: "samsung-galaxy-book3",
    price: 8900,
    image: "/images/products/samsung-book3.jpg",
    brand: "Samsung",
    rating: 4.7,
    reviewCount: 67,
    badge: "new" as const,
    inStock: true,
  },
  {
    id: "8",
    name: "Microsoft Surface Laptop 5",
    slug: "surface-laptop-5",
    price: 7200,
    originalPrice: 7800,
    image: "/images/products/surface-laptop.jpg",
    brand: "Microsoft",
    rating: 4.6,
    reviewCount: 145,
    badge: "sale" as const,
    discount: 8,
    inStock: true,
  },
];

const aiRecommendedProducts = [
  {
    id: "ai-1",
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max",
    price: 12500,
    image: "/images/products/iphone-15-pro.jpg",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 245,
    badge: "new" as const,
    inStock: true,
  },
  {
    id: "ai-2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    price: 10900,
    image: "/images/products/samsung-s24.jpg",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
  },
  {
    id: "ai-3",
    name: "Sony WH-1000XM5 Headphones",
    slug: "sony-wh-1000xm5",
    price: 2800,
    image: "/images/products/sony-xm5.jpg",
    brand: "Sony",
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
  },
  {
    id: "ai-4",
    name: "iPad Pro 12.9-inch M2",
    slug: "ipad-pro-12-9-m2",
    price: 9500,
    image: "/images/products/ipad-pro.jpg",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 156,
    badge: "hot" as const,
    inStock: true,
  },
];

const topSellingProducts = [
  {
    id: "top-1",
    name: "HP 15-FD0036NIA Laptop",
    slug: "hp-15-fd0036nia",
    price: 4500,
    image: "/images/products/hp-15.jpg",
    brand: "HP",
    rating: 4.7,
    reviewCount: 523,
    inStock: true,
  },
  {
    id: "top-2",
    name: "Samsung 55\" Crystal UHD TV",
    slug: "samsung-55-crystal-uhd",
    price: 5800,
    originalPrice: 6500,
    image: "/images/products/samsung-tv.jpg",
    brand: "Samsung",
    rating: 4.6,
    reviewCount: 312,
    badge: "sale" as const,
    discount: 11,
    inStock: true,
  },
  {
    id: "top-3",
    name: "Canon PIXMA G3420 Printer",
    slug: "canon-pixma-g3420",
    price: 1800,
    image: "/images/products/canon-printer.jpg",
    brand: "Canon",
    rating: 4.5,
    reviewCount: 267,
    inStock: true,
  },
  {
    id: "top-4",
    name: "LG 260L Double Door Fridge",
    slug: "lg-260l-fridge",
    price: 4200,
    image: "/images/products/lg-fridge.jpg",
    brand: "LG",
    rating: 4.8,
    reviewCount: 189,
    badge: "hot" as const,
    inStock: true,
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Quick Category Navigation */}
      <QuickCategories />

      {/* Featured Products Carousel */}
      <FeaturedProducts
        title="Featured Products"
        subtitle="Handpicked deals just for you"
        products={featuredProducts}
        viewAllLink="/products?featured=true"
      />

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* AI-Powered Recommendations */}
      <AIRecommendations
        title="Recommended For You"
        subtitle="Based on your browsing history and preferences"
        products={aiRecommendedProducts}
      />

      {/* Top Selling Products */}
      <TopSelling
        title="Top Selling This Week"
        subtitle="Most popular items among our customers"
        products={topSellingProducts}
      />

      {/* Brand Partners */}
      <BrandPartners />

      {/* Newsletter Signup */}
      <Newsletter />
    </main>
  );
}
