"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Heart, Phone, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Laptops", href: "/category/laptops" },
  { name: "Phones & Tablets", href: "/category/phones" },
  { name: "Computing", href: "/category/computing" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Printers", href: "/category/printers" },
  { name: "Networking", href: "/category/networking" },
  { name: "Gaming", href: "/category/gaming" },
  { name: "Audio", href: "/category/audio" },
];

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top announcement bar */}
      <div className="bg-gray-100 text-gray-600 text-xs py-1.5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +233 30 XXX XXXX
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Mon - Sat: 9am - 6pm</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="hover:text-black">Track Order</Link>
            <span>|</span>
            <Link href="/help" className="hover:text-black">Help</Link>
          </div>
        </div>
      </div>

      {/* Main header - Black background like current site */}
      <div className="bg-black text-white">
        <div className="container">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-serif text-2xl font-bold tracking-tight">INTACT</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">GHANA</span>
            </Link>

            {/* Categories dropdown */}
            <div className="hidden md:flex items-center">
              <Button variant="ghost" className="text-white hover:bg-gray-800 gap-1">
                <Menu className="h-4 w-4" />
                All Categories
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>

            {/* Search */}
            <div className="hidden flex-1 max-w-lg md:flex">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full bg-white text-black border-0 rounded-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="sm" className="absolute right-0 top-0 h-9 rounded-l-none bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-4 text-sm">
              <Link href="/category/laptops" className="hover:text-gray-300">Laptops</Link>
              <Link href="/category/phones" className="hover:text-gray-300">Phones</Link>
              <Link href="/deals" className="hover:text-gray-300">Deals</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link href="/account">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline text-xs">Account</span>
                </Button>
              </Link>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden lg:inline text-xs">Cart</span>
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-orange-500 border-0">
                    0
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories nav bar */}
      <nav className="hidden md:block bg-white border-b shadow-sm">
        <div className="container">
          <ul className="flex items-center gap-6 h-10 text-sm overflow-x-auto">
            {categories.map((category) => (
              <li key={category.name} className="shrink-0">
                <Link
                  href={category.href}
                  className="text-gray-700 hover:text-black font-medium transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile search */}
      <div className="md:hidden bg-black px-4 pb-3">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full bg-white text-black border-0 rounded-sm h-9 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="sm" className="absolute right-0 top-0 h-9 rounded-l-none bg-primary">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-[calc(4rem+1px)] z-50 bg-background md:hidden transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="container py-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="block py-2 text-lg hover:text-primary"
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
