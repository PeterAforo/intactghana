import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Headphones, CreditCard, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Laptops", slug: "laptops", icon: "💻" },
  { name: "Phones", slug: "phones", icon: "📱" },
  { name: "Tablets", slug: "tablets", icon: "📲" },
  { name: "Desktops", slug: "desktops", icon: "🖥️" },
  { name: "Printers", slug: "printers", icon: "🖨️" },
  { name: "Accessories", slug: "accessories", icon: "🎧" },
  { name: "Networking", slug: "networking", icon: "📡" },
  { name: "Storage", slug: "storage", icon: "💾" },
];

const featuredProducts = [
  {
    id: "1",
    name: "Dell Latitude 7430",
    slug: "dell-latitude-7430",
    price: 8500,
    compareAtPrice: 9500,
    image: "/images/products/dell-latitude.jpg",
    brand: "Dell",
    tag: "Hot",
  },
  {
    id: "2",
    name: "HP ProBook 450 G9",
    slug: "hp-probook-450",
    price: 6200,
    image: "/images/products/hp-probook.jpg",
    brand: "HP",
  },
  {
    id: "3",
    name: "Lenovo ThinkPad E14",
    slug: "lenovo-thinkpad-e14",
    price: 5800,
    compareAtPrice: 6500,
    image: "/images/products/lenovo-thinkpad.jpg",
    brand: "Lenovo",
    tag: "Sale",
  },
  {
    id: "4",
    name: "Jabra Elite 85h",
    slug: "jabra-elite-85h",
    price: 1200,
    image: "/images/products/jabra-elite.jpg",
    brand: "Jabra",
  },
  {
    id: "5",
    name: "Anker PowerCore 20000",
    slug: "anker-powercore",
    price: 350,
    image: "/images/products/anker-powercore.jpg",
    brand: "Anker",
  },
];

const topSelling = [
  { id: "1", name: "NASCO NAS-221SV IRON", price: 89, image: "/images/products/nasco-iron.jpg", brand: "NASCO" },
  { id: "2", name: "iPhone 15 Pro Max", price: 12500, compareAtPrice: 13500, image: "/images/products/iphone-15-pro.jpg", brand: "Apple" },
  { id: "3", name: "Samsung Galaxy S24", price: 8900, image: "/images/products/samsung-s24.jpg", brand: "Samsung" },
  { id: "4", name: "AirPods Pro 2nd Gen", price: 1800, image: "/images/products/airpods-pro.jpg", brand: "Apple" },
  { id: "5", name: "Logitech MX Master 3", price: 850, image: "/images/products/mx-master.jpg", brand: "Logitech" },
  { id: "6", name: "Samsung 27\" Monitor", price: 2200, image: "/images/products/samsung-monitor.jpg", brand: "Samsung" },
];

const brands = [
  { name: "HP", logo: "/images/brands/hp.png" },
  { name: "Lenovo", logo: "/images/brands/lenovo.png" },
  { name: "Dell", logo: "/images/brands/dell.png" },
  { name: "Samsung", logo: "/images/brands/samsung.png" },
  { name: "Apple", logo: "/images/brands/apple.png" },
  { name: "Logitech", logo: "/images/brands/logitech.png" },
];

const trustFeatures = [
  { icon: Truck, title: "Fast Delivery", description: "1-2 days in Greater Accra" },
  { icon: Shield, title: "Warranty", description: "Genuine products guaranteed" },
  { icon: CreditCard, title: "Secure Payment", description: "MoMo, Cards, Bank Transfer" },
  { icon: RotateCcw, title: "Easy Returns", description: "7-day return policy" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Hero Banners */}
      <section className="bg-white">
        <div className="container py-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Main Banner */}
            <div className="md:col-span-2 relative rounded-lg overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 md:p-8 min-h-[280px]">
              <div className="relative z-10 max-w-md">
                <Badge className="bg-black text-white mb-3">INTACT GHANA</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  Take it Home Today<br />Pay Later with CanPay
                </h2>
                <p className="text-black/80 mb-4">
                  Shop easily with Intact Ghana, select CanPay to Buy Now, Pay Later
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-contain bg-no-repeat bg-right-bottom opacity-90" />
            </div>
            
            {/* Side Banners */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white min-h-[130px]">
                <p className="text-xs text-gray-400 mb-1">NEW ARRIVAL</p>
                <h3 className="font-bold text-lg mb-2">Galaxy Unpacked</h3>
                <p className="text-sm text-gray-300">Discover the latest Samsung devices</p>
              </div>
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-red-500 to-red-600 p-5 text-white min-h-[130px]">
                <Badge className="bg-white text-red-600 mb-2">HOT DEAL</Badge>
                <h3 className="font-bold text-lg mb-1">Sale!</h3>
                <p className="text-sm">Up to 30% off on selected items</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Bar */}
      <section className="bg-white border-y">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white mt-4">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-4">
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              Categories
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg border bg-white hover:border-gray-400 hover:shadow-sm transition-all min-w-[90px]"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white mt-4">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Featured Products</h2>
            <Link href="/products" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow border">
                  <div className="relative aspect-square bg-gray-50 p-4">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      {product.brand}
                    </div>
                    {product.tag && (
                      <Badge className={`absolute left-2 top-2 text-xs ${product.tag === 'Hot' ? 'bg-red-500' : 'bg-orange-500'}`}>
                        {product.tag}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-[10px] text-gray-500 uppercase">{product.brand}</p>
                    <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">{product.name}</h3>
                    <div className="mt-2">
                      <span className="font-bold text-primary">
                        GHS {product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          GHS {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling */}
      <section className="bg-white mt-4">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Top Selling of the Week</h2>
            <Link href="/bestsellers" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topSelling.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow border h-full">
                  <div className="relative aspect-square bg-gray-50 p-3">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      {product.brand}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-xs font-medium line-clamp-2">{product.name}</h3>
                    <div className="mt-1">
                      <span className="text-sm font-bold text-primary">
                        GHS {product.price.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white mt-4 mb-4">
        <div className="container py-6">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {brands.map((brand) => (
              <div key={brand.name} className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors">
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Subscribe To Our Newsletter</h3>
              <p className="text-gray-400 text-sm">Get updates on new products and exclusive deals</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-2 rounded-sm text-black"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
