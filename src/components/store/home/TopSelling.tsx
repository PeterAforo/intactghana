"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "hot";
  discount?: number;
  inStock: boolean;
  brand: string;
}

interface TopSellingProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function TopSelling({
  products,
  title = "Top Selling This Week",
  subtitle = "Most popular items among our customers",
}: TopSellingProps) {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="top-selling-heading">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">
                Trending
              </span>
            </div>
            <h2
              id="top-selling-heading"
              className="text-2xl font-bold text-slate-900 md:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-slate-600">{subtitle}</p>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                variant="grid"
                showRank={index + 1}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/products?sort=sales">
              View All Best Sellers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
