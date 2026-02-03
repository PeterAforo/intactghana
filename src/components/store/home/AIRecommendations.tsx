"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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

interface AIRecommendationsProps {
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

export function AIRecommendations({
  products,
  title = "Recommended For You",
  subtitle = "Based on your browsing history and preferences",
}: AIRecommendationsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16"
      aria-labelledby="ai-recommendations-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                AI Powered
              </span>
            </div>
            <h2
              id="ai-recommendations-heading"
              className="text-2xl font-bold text-slate-900 md:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-slate-600">{subtitle}</p>
          </div>
          <Button asChild variant="ghost" className="hidden gap-2 md:flex">
            <Link href="/recommendations">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={{ ...product, isAiRecommended: true }}
                variant="grid"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/recommendations">
              View All Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
