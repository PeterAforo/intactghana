import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Headphones, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredCategories = [
  { name: "Laptops", slug: "laptops", image: "/images/categories/laptops.jpg", count: 45 },
  { name: "Phones", slug: "phones", image: "/images/categories/phones.jpg", count: 120 },
  { name: "Tablets", slug: "tablets", image: "/images/categories/tablets.jpg", count: 35 },
  { name: "Accessories", slug: "accessories", image: "/images/categories/accessories.jpg", count: 200 },
];

const featuredProducts = [
  {
    id: "1",
    name: "HP Pavilion 15",
    slug: "hp-pavilion-15",
    price: 4500,
    compareAtPrice: 5000,
    image: "/images/products/hp-pavilion-15-1.jpg",
    brand: "HP",
    rating: 4.5,
    reviews: 24,
  },
  {
    id: "2",
    name: "Dell Inspiron 14",
    slug: "dell-inspiron-14",
    price: 4200,
    image: "/images/products/dell-inspiron-14-1.jpg",
    brand: "Dell",
    rating: 4.3,
    reviews: 18,
  },
  {
    id: "3",
    name: "Samsung Galaxy A54",
    slug: "samsung-galaxy-a54",
    price: 2800,
    compareAtPrice: 3200,
    image: "/images/products/samsung-a54-1.jpg",
    brand: "Samsung",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: "4",
    name: "iPhone 15",
    slug: "iphone-15",
    price: 8500,
    image: "/images/products/iphone-15-1.jpg",
    brand: "Apple",
    rating: 4.9,
    reviews: 89,
  },
];

const trustFeatures = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "1-2 days in Accra, nationwide delivery available",
  },
  {
    icon: Shield,
    title: "Genuine Products",
    description: "100% authentic products with warranty",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "AI assistant and human support available",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "MoMo, cards, and bank transfer accepted",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                New Arrivals
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Quality Electronics for Ghana
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Discover genuine laptops, phones, and accessories with warranty. 
                Fast delivery across Ghana with Mobile Money payment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/category/laptops">
                    Shop Laptops <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/category/phones">Shop Phones</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
              <div className="absolute inset-4 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                Hero Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Shop by Category</h2>
              <p className="text-muted-foreground">Browse our popular categories</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/categories">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      {category.name}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Featured Products</h2>
              <p className="text-muted-foreground">Our top picks for you</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      {product.name}
                    </div>
                    {product.compareAtPrice && (
                      <Badge className="absolute left-2 top-2" variant="destructive">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-bold text-primary">
                        GHS {product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          GHS {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">
                Need Help Finding the Right Product?
              </h2>
              <p className="max-w-2xl text-primary-foreground/80">
                Our AI shopping assistant can help you find the perfect laptop, phone, or accessory 
                based on your needs and budget. Get personalized recommendations instantly.
              </p>
              <Button size="lg" variant="secondary">
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
