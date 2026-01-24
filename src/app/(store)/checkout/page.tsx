"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, Loader2, CreditCard, Smartphone, Building2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { GHANA_REGIONS } from "@/lib/validations/address";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  region: z.string().min(1, "Region required"),
  city: z.string().min(2, "City required"),
  landmark: z.string().optional(),
  gpsCode: z.string().optional(),
  paymentMethod: z.enum(["momo_mtn", "momo_vodafone", "momo_airteltigo", "card", "bank_transfer"]),
  momoNumber: z.string().optional(),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CartItem {
  id: string;
  quantity: number;
  product: { name: string; slug: string };
  variant: { name: string; price: number };
}

interface CartSummary {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "momo_mtn",
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      updateDeliveryFee(selectedRegion);
    }
  }, [selectedRegion]);

  const fetchCartData = async () => {
    try {
      const [cartRes, summaryRes] = await Promise.all([
        fetch("/api/cart"),
        fetch("/api/cart/summary"),
      ]);

      if (cartRes.ok && summaryRes.ok) {
        const cartData = await cartRes.json();
        const summaryData = await summaryRes.json();
        setItems(cartData.items || []);
        setSummary(summaryData);

        if (!cartData.items || cartData.items.length === 0) {
          router.push("/cart");
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDeliveryFee = async (region: string) => {
    try {
      const response = await fetch(`/api/delivery/fee?region=${encodeURIComponent(region)}&subtotal=${summary?.subtotal || 0}`);
      if (response.ok) {
        const data = await response.json();
        setSummary((prev) => prev ? { ...prev, deliveryFee: data.fee, total: prev.subtotal + data.fee - prev.discount } : null);
      }
    } catch (error) {
      console.error("Failed to get delivery fee:", error);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            variantId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create order");
      }

      const order = await response.json();

      // Redirect to payment or success page
      if (data.paymentMethod === "bank_transfer") {
        router.push(`/order/success?id=${order.id}&method=bank`);
      } else {
        router.push(`/payment/${order.id}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/cart" className="hover:text-foreground">Cart</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0XX XXX XXXX"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register("firstName")} />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register("lastName")} />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select
                      onValueChange={(value) => {
                        setValue("region", value);
                        setSelectedRegion(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {GHANA_REGIONS.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.region && (
                      <p className="text-sm text-destructive">{errors.region.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input id="city" {...register("city")} />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark / Address Details</Label>
                  <Input
                    id="landmark"
                    placeholder="Near..."
                    {...register("landmark")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpsCode">Ghana GPS Code (Optional)</Label>
                  <Input
                    id="gpsCode"
                    placeholder="GA-XXX-XXXX"
                    {...register("gpsCode")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  defaultValue="momo_mtn"
                  onValueChange={(value) => setValue("paymentMethod", value as CheckoutFormData["paymentMethod"])}
                >
                  <div className="grid gap-3">
                    <Label
                      htmlFor="momo_mtn"
                      className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary"
                    >
                      <RadioGroupItem value="momo_mtn" id="momo_mtn" />
                      <Smartphone className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">MTN Mobile Money</p>
                        <p className="text-sm text-muted-foreground">Pay with MTN MoMo</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="momo_vodafone"
                      className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary"
                    >
                      <RadioGroupItem value="momo_vodafone" id="momo_vodafone" />
                      <Smartphone className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Vodafone Cash</p>
                        <p className="text-sm text-muted-foreground">Pay with Vodafone Cash</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="momo_airteltigo"
                      className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary"
                    >
                      <RadioGroupItem value="momo_airteltigo" id="momo_airteltigo" />
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">AirtelTigo Money</p>
                        <p className="text-sm text-muted-foreground">Pay with AirtelTigo Money</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="card"
                      className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary"
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Card Payment</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="bank_transfer"
                      className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary"
                    >
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <Building2 className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Manual bank transfer</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {(paymentMethod === "momo_mtn" || paymentMethod === "momo_vodafone" || paymentMethod === "momo_airteltigo") && (
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="momoNumber">Mobile Money Number</Label>
                    <Input
                      id="momoNumber"
                      type="tel"
                      placeholder="0XX XXX XXXX"
                      {...register("momoNumber")}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Any special instructions for your order..."
                  {...register("notes")}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-muted-foreground">
                          {item.variant.name} × {item.quantity}
                        </p>
                      </div>
                      <span>{formatPrice(item.variant.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                {summary && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(summary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>
                        {summary.deliveryFee > 0
                          ? formatPrice(summary.deliveryFee)
                          : "Free"}
                      </span>
                    </div>
                    {summary.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(summary.discount)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(summary.total)}</span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${summary ? formatPrice(summary.total) : ""}`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing this order, you agree to our{" "}
                  <Link href="/terms" className="underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="underline">Privacy Policy</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
