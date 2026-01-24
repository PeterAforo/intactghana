"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";

interface CartSummary {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
}

export function CartSummary() {
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await fetch("/api/cart/summary");
      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError("");
    try {
      const response = await fetch("/api/cart/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });
      if (response.ok) {
        fetchSummary();
        setCouponCode("");
      } else {
        const data = await response.json();
        setCouponError(data.message || "Invalid coupon code");
      }
    } catch (error) {
      setCouponError("Failed to apply coupon");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!summary || summary.itemCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coupon Code */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          {couponError && (
            <p className="text-sm text-destructive">{couponError}</p>
          )}
        </div>

        <Separator />

        {/* Summary Lines */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({summary.itemCount} items)
            </span>
            <span>{formatPrice(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span>
              {summary.deliveryFee > 0
                ? formatPrice(summary.deliveryFee)
                : "Calculated at checkout"}
            </span>
          </div>
          {summary.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(summary.discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatPrice(summary.total)}</span>
        </div>

        {/* Free Delivery Notice */}
        {summary.subtotal < 500 && (
          <p className="text-sm text-muted-foreground">
            Add {formatPrice(500 - summary.subtotal)} more for free delivery in Greater Accra
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button asChild className="w-full" size="lg">
          <Link href="/checkout">
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
