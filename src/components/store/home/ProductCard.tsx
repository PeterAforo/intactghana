"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  isAiRecommended?: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "featured" | "list";
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  showRank?: number;
}

const badgeStyles = {
  new: "bg-green-500 text-white",
  sale: "bg-red-500 text-white",
  hot: "bg-orange-500 text-white",
};

const badgeText = {
  new: "NEW",
  sale: "SALE",
  hot: "HOT",
};

export function ProductCard({
  product,
  variant = "grid",
  onAddToCart,
  onQuickView,
  onWishlist,
  showRank,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300",
        isHovered && "shadow-xl -translate-y-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Rank Badge */}
      {showRank && (
        <div className="absolute left-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
          #{showRank}
        </div>
      )}

      {/* Product Badge */}
      {product.badge && (
        <div
          className={cn(
            "absolute right-3 top-3 z-20 rounded-full px-2.5 py-1 text-xs font-semibold",
            badgeStyles[product.badge]
          )}
        >
          {product.discount
            ? `-${product.discount}%`
            : badgeText[product.badge]}
        </div>
      )}

      {/* AI Recommended Badge */}
      {product.isAiRecommended && (
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
          <Sparkles className="h-3 w-3" />
          AI Pick
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={cn(
          "absolute right-3 z-20 rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500",
          product.badge ? "top-12" : "top-3",
          isWishlisted ? "text-red-500" : "text-slate-400 hover:text-red-500"
        )}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn("h-5 w-5", isWishlisted && "fill-current")}
        />
      </button>

      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-slate-50"
      >
        <Image
          src={imageError ? "/images/placeholder-product.png" : product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 320px"
          onError={() => setImageError(true)}
        />

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <Button
            onClick={handleQuickView}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </motion.div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.brand}
        </p>

        {/* Name */}
        <Link
          href={`/product/${product.slug}`}
          className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-slate-200 text-slate-200"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-xl font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            product.inStock ? "text-green-600" : "text-red-600"
          )}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-4 w-full gap-2"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.article>
  );
}
