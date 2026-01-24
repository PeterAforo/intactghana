"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  sku: string;
  price: number | { toNumber(): number };
  options: { name: string; value: string }[];
  stockLevels: { quantity: number; reserved: number }[];
}

interface ProductVariantSelectorProps {
  variants: Variant[];
  onVariantChange?: (variantId: string) => void;
}

export function ProductVariantSelector({ variants, onVariantChange }: ProductVariantSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);

  const handleSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    onVariantChange?.(variantId);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select Option</label>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const stock = variant.stockLevels.reduce(
            (sum, sl) => sum + sl.quantity - sl.reserved,
            0
          );
          const isOutOfStock = stock <= 0;
          const price = typeof variant.price === 'object' && 'toNumber' in variant.price 
            ? variant.price.toNumber() 
            : Number(variant.price);

          return (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant.id)}
              disabled={isOutOfStock}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm transition-all",
                selectedVariantId === variant.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input hover:border-primary/50",
                isOutOfStock && "opacity-50 cursor-not-allowed line-through"
              )}
            >
              <span className="font-medium">{variant.name}</span>
              <span className="ml-2 text-muted-foreground">
                {formatPrice(price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
