import Link from "next/link";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItems } from "@/components/store/cart-items";
import { CartSummary } from "@/components/store/cart-summary";

export const metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <CartItems />
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
