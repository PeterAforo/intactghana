"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  disabled?: boolean;
}

export function AddToCartButton({ productId, variantId, disabled }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          variantId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // Show success feedback
      alert("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center rounded-lg border">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-r-none"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1 || disabled}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-l-none"
          onClick={() => setQuantity((q) => q + 1)}
          disabled={disabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="flex-1"
        onClick={handleAddToCart}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="mr-2 h-4 w-4" />
        )}
        {disabled ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
