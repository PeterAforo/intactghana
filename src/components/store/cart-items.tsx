"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    images: { url: string; alt: string | null }[];
  };
  variant: {
    id: string;
    name: string;
    sku: string;
    price: number;
  };
}

export function CartItems() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingId(itemId);
    try {
      const response = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      if (response.ok) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdatingId(itemId);
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (response.ok) {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Your cart is empty</h3>
          <p className="text-muted-foreground mb-4">
            Add some products to get started
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <Link href={`/product/${item.product.slug}`}>
                <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                  {item.product.name.slice(0, 10)}...
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.slug}`}>
                  <h3 className="font-medium hover:text-primary line-clamp-1">
                    {item.product.name}
                  </h3>
                </Link>
                {item.product.brand && (
                  <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                )}
                <p className="text-sm text-muted-foreground">{item.variant.name}</p>
                <p className="font-bold text-primary mt-1">
                  {formatPrice(item.variant.price)}
                </p>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                  disabled={updatingId === item.id}
                >
                  {updatingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || updatingId === item.id}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={updatingId === item.id}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
