import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { name: "Laptops", href: "/category/laptops" },
    { name: "Phones", href: "/category/phones" },
    { name: "Tablets", href: "/category/tablets" },
    { name: "Accessories", href: "/category/accessories" },
    { name: "Printers", href: "/category/printers" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Track Order", href: "/track-order" },
    { name: "Warranty Claims", href: "/warranty" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Delivery Policy", href: "/delivery-policy" },
    { name: "Return Policy", href: "/return-policy" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                IG
              </div>
              <span className="font-bold text-xl">Intact Ghana</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Ghana&apos;s trusted destination for quality electronics and technology products.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +233 XX XXX XXXX
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@intactghana.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Accra, Ghana
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Intact Ghana. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>We accept:</span>
            <span className="font-medium">MTN MoMo</span>
            <span>•</span>
            <span className="font-medium">Vodafone Cash</span>
            <span>•</span>
            <span className="font-medium">Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
