import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  categories: [
    { name: "Laptops", href: "/category/laptops" },
    { name: "Phones & Tablets", href: "/category/phones" },
    { name: "Computing", href: "/category/computing" },
    { name: "Accessories", href: "/category/accessories" },
    { name: "Printers", href: "/category/printers" },
    { name: "Networking", href: "/category/networking" },
  ],
  quickLinks: [
    { name: "My Account", href: "/account" },
    { name: "Track Order", href: "/track-order" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Shopping Cart", href: "/cart" },
    { name: "Compare Products", href: "/compare" },
  ],
  information: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Return Policy", href: "/return-policy" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer - Kumo Style */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white tracking-tight">INTACT</span>
                <span className="text-xs text-slate-400 tracking-widest">GHANA</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Ghana&apos;s trusted destination for quality electronics and technology products. 
              We offer genuine products with warranty and fast delivery.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-white">Accra, Ghana</p>
                  <p className="text-xs text-slate-500">Osu, Oxford Street</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-white">+233 30 XXX XXXX</p>
                  <p className="text-xs text-slate-500">Mon - Sat: 9am - 6pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-white">info@intactghana.com</p>
                  <p className="text-xs text-slate-500">24/7 Online Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">Information</h3>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Kumo Style */}
      <div className="border-t border-slate-800">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} <span className="text-white">Intact Ghana</span>. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 mr-2">Follow us:</span>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-slate-800 rounded flex items-center gap-1.5">
                  <Smartphone className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-slate-300">MoMo</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-800 rounded flex items-center gap-1.5">
                  <CreditCard className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-slate-300">Cards</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-800 rounded">
                  <span className="text-xs text-slate-300">Bank</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
