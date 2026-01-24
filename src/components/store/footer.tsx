import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  contact: {
    title: "Contact Intact Ghana",
    items: [
      "Intact Ghana Office, Accra",
      "Mon - Sat: 9am - 6pm",
      "+233 30 XXX XXXX",
      "info@intactghana.com",
    ],
  },
  categories: {
    title: "Categories",
    links: [
      { name: "Laptops", href: "/category/laptops" },
      { name: "Phones & Tablets", href: "/category/phones" },
      { name: "Computing", href: "/category/computing" },
      { name: "Accessories", href: "/category/accessories" },
      { name: "Printers", href: "/category/printers" },
      { name: "Networking", href: "/category/networking" },
    ],
  },
  customerService: {
    title: "Customer Services",
    links: [
      { name: "My Account", href: "/account" },
      { name: "Track Order", href: "/track-order" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "FAQs", href: "/faqs" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  information: {
    title: "Information",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Delivery Policy", href: "/delivery-policy" },
      { name: "Return Policy", href: "/return-policy" },
    ],
  },
};

export function StoreFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Quick Links Bar */}
      <div className="border-b border-gray-800">
        <div className="container py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <span className="text-gray-600">|</span>
            <Link href="/customer-service" className="hover:text-white">Customer Service</Link>
            <span className="text-gray-600">|</span>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <span className="text-gray-600">|</span>
            <Link href="/faqs" className="hover:text-white">FAQs</Link>
            <span className="text-gray-600">|</span>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.contact.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.contact.items.map((item, i) => (
                <li key={i} className="text-gray-400">{item}</li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.categories.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.categories.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.customerService.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.customerService.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.information.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.information.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Intact Ghana. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>We accept:</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">MTN MoMo</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">Vodafone</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">Cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
