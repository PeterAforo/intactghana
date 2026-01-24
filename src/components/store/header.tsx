"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Laptops", href: "/category/laptops" },
  { name: "Phones", href: "/category/phones" },
  { name: "Tablets", href: "/category/tablets" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Printers", href: "/category/printers" },
  { name: "Networking", href: "/category/networking" },
  { name: "Gaming", href: "/category/gaming" },
];

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden border-b bg-primary text-primary-foreground md:block">
        <div className="container flex h-8 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +233 XX XXX XXXX
            </span>
            <span>Free delivery on orders over GHS 500</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/help" className="hover:underline">Help Center</Link>
            <Link href="/track-order" className="hover:underline">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              IG
            </div>
            <span className="hidden font-bold text-xl sm:inline-block">Intact Ghana</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 max-w-xl md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  0
                </Badge>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories nav */}
      <nav className="hidden border-t md:block">
        <div className="container">
          <ul className="flex items-center gap-6 h-10 text-sm">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

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
