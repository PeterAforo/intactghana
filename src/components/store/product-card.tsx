import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    images: { url: string; alt: string | null }[];
    variants: {
      price: number | { toNumber(): number };
      compareAtPrice: number | { toNumber(): number } | null;
      stockLevels: { quantity: number; reserved: number }[];
    }[];
    reviews: { rating: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const variant = product.variants[0];
  
  const price = typeof variant?.price === 'object' && 'toNumber' in variant.price 
    ? variant.price.toNumber() 
    : Number(variant?.price || 0);
  
  const compareAtPrice = variant?.compareAtPrice 
    ? (typeof variant.compareAtPrice === 'object' && 'toNumber' in variant.compareAtPrice 
        ? variant.compareAtPrice.toNumber() 
        : Number(variant.compareAtPrice))
    : null;

  const totalStock = variant?.stockLevels.reduce(
    (sum, sl) => sum + sl.quantity - sl.reserved,
    0
  ) || 0;

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const isOnSale = compareAtPrice && compareAtPrice > price;
  const isOutOfStock = totalStock <= 0;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-muted">
          {primaryImage ? (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              {product.name}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {isOnSale && (
              <Badge variant="destructive">Sale</Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        {product.brand && (
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {avgRating > 0 && (
          <div className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span>{avgRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviews.length})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-primary">
            {formatPrice(price)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button 
          className="mt-3 w-full" 
          size="sm"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
