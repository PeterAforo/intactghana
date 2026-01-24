import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, CreditCard, RotateCcw, Heart, Eye, ShoppingCart, Star, ChevronRight, Laptop, Smartphone, Monitor, Headphones, Printer, Wifi, Gamepad2, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Laptops", slug: "laptops", icon: Laptop, count: 156, color: "bg-blue-50 text-blue-600" },
  { name: "Phones", slug: "phones", icon: Smartphone, count: 243, color: "bg-green-50 text-green-600" },
  { name: "Monitors", slug: "monitors", icon: Monitor, count: 89, color: "bg-purple-50 text-purple-600" },
  { name: "Audio", slug: "audio", icon: Headphones, count: 178, color: "bg-orange-50 text-orange-600" },
  { name: "Printers", slug: "printers", icon: Printer, count: 67, color: "bg-red-50 text-red-600" },
  { name: "Networking", slug: "networking", icon: Wifi, count: 94, color: "bg-cyan-50 text-cyan-600" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, count: 112, color: "bg-pink-50 text-pink-600" },
  { name: "Storage", slug: "storage", icon: HardDrive, count: 145, color: "bg-amber-50 text-amber-600" },
];

const featuredProducts = [
  {
    id: "1",
    name: "Dell Latitude 7430 Business Laptop",
    slug: "dell-latitude-7430",
    price: 8500,
    compareAtPrice: 9500,
    image: "/images/products/dell-latitude.jpg",
    brand: "Dell",
    rating: 4.8,
    reviews: 124,
    tag: "Hot",
    isNew: true,
  },
  {
    id: "2",
    name: "HP ProBook 450 G9 Notebook",
    slug: "hp-probook-450",
    price: 6200,
    image: "/images/products/hp-probook.jpg",
    brand: "HP",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "Lenovo ThinkPad E14 Gen 4",
    slug: "lenovo-thinkpad-e14",
    price: 5800,
    compareAtPrice: 6500,
    image: "/images/products/lenovo-thinkpad.jpg",
    brand: "Lenovo",
    rating: 4.7,
    reviews: 156,
    tag: "-11%",
  },
  {
    id: "4",
    name: "MacBook Air M2 13-inch",
    slug: "macbook-air-m2",
    price: 9800,
    image: "/images/products/macbook-air.jpg",
    brand: "Apple",
    rating: 4.9,
    reviews: 312,
    isNew: true,
  },
  {
    id: "5",
    name: "ASUS ROG Strix G15 Gaming",
    slug: "asus-rog-strix",
    price: 7500,
    compareAtPrice: 8200,
    image: "/images/products/asus-rog.jpg",
    brand: "ASUS",
    rating: 4.5,
    reviews: 78,
    tag: "-9%",
  },
  {
    id: "6",
    name: "Acer Aspire 5 Slim Laptop",
    slug: "acer-aspire-5",
    price: 4200,
    image: "/images/products/acer-aspire.jpg",
    brand: "Acer",
    rating: 4.4,
    reviews: 203,
  },
  {
    id: "7",
    name: "Samsung Galaxy Book3 Pro",
    slug: "samsung-galaxy-book3",
    price: 8900,
    image: "/images/products/samsung-book3.jpg",
    brand: "Samsung",
    rating: 4.7,
    reviews: 67,
    isNew: true,
  },
  {
    id: "8",
    name: "Microsoft Surface Laptop 5",
    slug: "surface-laptop-5",
    price: 7200,
    compareAtPrice: 7800,
    image: "/images/products/surface-laptop.jpg",
    brand: "Microsoft",
    rating: 4.6,
    reviews: 145,
    tag: "-8%",
  },
];

const newArrivals = [
  { id: "1", name: "iPhone 15 Pro Max 256GB", price: 12500, image: "/images/products/iphone-15-pro.jpg", brand: "Apple", rating: 4.9 },
  { id: "2", name: "Samsung Galaxy S24 Ultra", price: 10900, image: "/images/products/samsung-s24.jpg", brand: "Samsung", rating: 4.8 },
  { id: "3", name: "Google Pixel 8 Pro", price: 8500, image: "/images/products/pixel-8.jpg", brand: "Google", rating: 4.7 },
  { id: "4", name: "Sony WH-1000XM5 Headphones", price: 2800, image: "/images/products/sony-xm5.jpg", brand: "Sony", rating: 4.9 },
];

const brands = ["HP", "Dell", "Lenovo", "Apple", "Samsung", "ASUS", "Acer", "Microsoft"];

const trustFeatures = [
  { icon: Truck, title: "Free Shipping", description: "On orders over GHS 500" },
  { icon: Shield, title: "Secure Payment", description: "100% secure checkout" },
  { icon: RotateCcw, title: "Easy Returns", description: "7-day return policy" },
  { icon: CreditCard, title: "Flexible Payment", description: "MoMo, Cards, Bank" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Kumo Style */}
      <section className="bg-slate-100">
        <div className="container py-6 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            {/* Hero Content */}
            <div className="order-2 lg:order-1">
              <Badge className="bg-primary/10 text-primary border-0 mb-4">New Collection 2024</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Premium Electronics<br />
                <span className="text-primary">For Every Need</span>
              </h1>
              <p className="text-slate-600 text-lg mb-6 max-w-lg">
                Discover the latest laptops, phones, and accessories from top brands. 
                Quality guaranteed with warranty and fast delivery across Ghana.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white">
                  View Deals
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 mt-8 pt-8 border-t">
                <div>
                  <p className="text-2xl font-bold text-slate-900">15K+</p>
                  <p className="text-sm text-slate-500">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">50K+</p>
                  <p className="text-sm text-slate-500">Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">100+</p>
                  <p className="text-sm text-slate-500">Brands</p>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Banner */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 lg:p-12">
                <div className="aspect-square max-w-md mx-auto bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <Laptop className="h-24 w-24 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-500">Featured Product Image</p>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Up to 30% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features - Kumo Style */}
      <section className="bg-white border-y">
        <div className="container py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{feature.title}</p>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Kumo Style Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Shop by Category</h2>
              <p className="text-slate-500 mt-1">Browse our wide range of products</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center p-4 lg:p-6 rounded-xl border bg-white hover:border-primary hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-slate-900 text-sm text-center">{category.name}</span>
                <span className="text-xs text-slate-400 mt-1">{category.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Kumo Style with Hover Actions */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Featured Products</h2>
              <p className="text-slate-500 mt-1">Handpicked products just for you</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Product Image */}
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <Laptop className="h-16 w-16" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white text-xs">New</Badge>
                    )}
                    {product.tag && (
                      <Badge className={`text-xs ${product.tag === 'Hot' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {product.tag}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Hover Actions - Kumo Style */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{product.brand}</p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-medium text-slate-900 mt-1 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-primary">
                      GHS {product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        GHS {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner - Kumo Style */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 p-8 lg:p-10 text-white min-h-[250px]">
              <div className="relative z-10 max-w-sm">
                <Badge className="bg-primary text-white border-0 mb-3">Limited Offer</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">MacBook Air M2</h3>
                <p className="text-slate-300 mb-4">Experience the power of Apple Silicon</p>
                <Button className="bg-white text-slate-900 hover:bg-slate-100">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-8 lg:p-10 text-white min-h-[250px]">
              <div className="relative z-10 max-w-sm">
                <Badge className="bg-white text-primary border-0 mb-3">New Arrival</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">iPhone 15 Pro</h3>
                <p className="text-white/80 mb-4">Titanium. So strong. So light. So Pro.</p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-slate-100">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals - Kumo Style */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">New Arrivals</h2>
              <p className="text-slate-500 mt-1">Check out our latest products</p>
            </div>
            <Link href="/new-arrivals" className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="bg-slate-50 rounded-xl p-6 mb-4 group-hover:bg-slate-100 transition-colors">
                  <div className="aspect-square flex items-center justify-center">
                    <Smartphone className="h-20 w-20 text-slate-300" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 uppercase">{product.brand}</p>
                <h3 className="font-medium text-slate-900 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-600">{product.rating}</span>
                </div>
                <p className="text-lg font-bold text-primary mt-2">GHS {product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands - Kumo Style */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Shop by Brand</h2>
          <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
            {brands.map((brand) => (
              <Link 
                key={brand} 
                href={`/brand/${brand.toLowerCase()}`}
                className="text-2xl lg:text-3xl font-bold text-slate-300 hover:text-primary transition-colors"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Kumo Style */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-slate-400 mb-6">Get the latest updates on new products and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
