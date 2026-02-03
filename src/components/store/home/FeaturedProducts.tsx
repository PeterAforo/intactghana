"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

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

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
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

export function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Handpicked deals just for you",
  products,
  viewAllLink = "/products?featured=true",
}: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    const newScrollLeft =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 lg:py-16" aria-labelledby="featured-products-heading">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2
              id="featured-products-heading"
              className="text-2xl font-bold text-slate-900 md:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-slate-600">{subtitle}</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:gap-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="w-[280px] flex-shrink-0 md:w-[300px] lg:w-[320px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} variant="featured" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="group">
            <Link href={viewAllLink}>
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
