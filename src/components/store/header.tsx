"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Heart, Phone, ChevronDown, MapPin, Mail, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { 
    name: "Laptops", 
    href: "/category/laptops",
    subcategories: ["Business Laptops", "Gaming Laptops", "Student Laptops", "2-in-1 Laptops"]
  },
  { 
    name: "Phones & Tablets", 
    href: "/category/phones",
    subcategories: ["Smartphones", "Tablets", "Feature Phones", "Phone Accessories"]
  },
  { 
    name: "Computing", 
    href: "/category/computing",
    subcategories: ["Desktops", "Monitors", "Components", "Software"]
  },
  { 
    name: "Accessories", 
    href: "/category/accessories",
    subcategories: ["Keyboards", "Mice", "Headphones", "Webcams", "Cables"]
  },
  { 
    name: "Printers", 
    href: "/category/printers",
    subcategories: ["Inkjet", "Laser", "All-in-One", "Ink & Toner"]
  },
  { 
    name: "Networking", 
    href: "/category/networking",
    subcategories: ["Routers", "Switches", "Access Points", "Cables"]
  },
  { 
    name: "Gaming", 
    href: "/category/gaming",
    subcategories: ["Consoles", "Controllers", "Gaming Chairs", "VR"]
  },
  { 
    name: "Audio", 
    href: "/category/audio",
    subcategories: ["Speakers", "Headphones", "Microphones", "Soundbars"]
  },
];

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar - Kumo Style */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
        <div className="container">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center divide-x divide-slate-700">
              <span className="flex items-center gap-1.5 pr-4">
                <Phone className="h-3 w-3" />
                +233 30 XXX XXXX
              </span>
              <span className="flex items-center gap-1.5 px-4">
                <Mail className="h-3 w-3" />
                info@intactghana.com
              </span>
              <span className="flex items-center gap-1.5 pl-4">
                <Clock className="h-3 w-3" />
                Mon - Sat: 9am - 6pm
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-1">
                <Truck className="h-3 w-3" />
                Track Order
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/help" className="hover:text-white transition-colors">Help & FAQs</Link>
              <span className="text-slate-600">|</span>
              <Link href="/login" className="hover:text-white transition-colors">Login / Register</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Kumo Style */}
      <div className="border-b">
        <div className="container">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">INTACT</span>
                <span className="text-[10px] lg:text-xs text-slate-500 tracking-widest -mt-1">GHANA</span>
              </div>
            </Link>

            {/* Search Bar - Kumo Style */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full flex">
                <Input
                  type="search"
                  placeholder="Search for products, brands and more..."
                  className="w-full h-11 rounded-l-full rounded-r-none border-2 border-r-0 border-slate-200 focus:border-primary pl-5 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="h-11 px-6 rounded-l-none rounded-r-full bg-primary hover:bg-primary/90">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Action Icons - Kumo Style */}
            <div className="flex items-center gap-1 lg:gap-3">
              <Link href="/wishlist" className="hidden sm:flex flex-col items-center p-2 hover:text-primary transition-colors group">
                <div className="relative">
                  <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-slate-700 group-hover:text-primary" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">0</span>
                </div>
                <span className="hidden lg:block text-xs text-slate-600 mt-1">Wishlist</span>
              </Link>
              
              <Link href="/account" className="flex flex-col items-center p-2 hover:text-primary transition-colors group">
                <User className="h-5 w-5 lg:h-6 lg:w-6 text-slate-700 group-hover:text-primary" />
                <span className="hidden lg:block text-xs text-slate-600 mt-1">Account</span>
              </Link>
              
              <Link href="/cart" className="flex flex-col items-center p-2 hover:text-primary transition-colors group">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 text-slate-700 group-hover:text-primary" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">0</span>
                </div>
                <span className="hidden lg:block text-xs text-slate-600 mt-1">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Kumo Style with Mega Menu */}
      <nav className="hidden lg:block bg-slate-900">
        <div className="container">
          <div className="flex items-center">
            {/* All Categories Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveCategory("all")}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center gap-2 bg-primary text-white px-5 py-3.5 font-medium">
                <Menu className="h-5 w-5" />
                All Categories
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Mega Menu Dropdown */}
              <div className={cn(
                "absolute left-0 top-full w-[600px] bg-white shadow-xl border rounded-b-lg transition-all duration-200",
                activeCategory === "all" ? "opacity-100 visible" : "opacity-0 invisible"
              )}>
                <div className="grid grid-cols-2 gap-0">
                  {categories.map((category) => (
                    <div key={category.name} className="p-4 hover:bg-slate-50 border-b border-r">
                      <Link href={category.href} className="font-semibold text-slate-900 hover:text-primary block mb-2">
                        {category.name}
                      </Link>
                      <ul className="space-y-1">
                        {category.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link href={`${category.href}?sub=${sub.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-slate-600 hover:text-primary">
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Navigation Links */}
            <ul className="flex items-center">
              <li>
                <Link href="/" className="text-white hover:text-primary px-4 py-3.5 block font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/phones" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  Phones
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded mr-1">HOT</span>
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white px-4 py-3.5 block transition-colors">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Free Shipping Notice */}
            <div className="ml-auto flex items-center gap-2 text-slate-300 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over GHS 500</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden border-b p-3">
        <div className="relative flex">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full h-10 rounded-l-full rounded-r-none border-2 border-r-0 border-slate-200 pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="h-10 px-4 rounded-l-none rounded-r-full bg-primary">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Kumo Style */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-50 bg-white lg:hidden transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          <ul className="space-y-1">
            <li>
              <Link href="/" className="block py-3 px-4 font-medium hover:bg-slate-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="block py-3 px-4 font-medium hover:bg-slate-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t space-y-2">
            <Link href="/account" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              My Account
            </Link>
            <Link href="/wishlist" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              Wishlist
            </Link>
            <Link href="/help" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              Help Center
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
