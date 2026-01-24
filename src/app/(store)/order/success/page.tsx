import Link from "next/link";
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

interface OrderSuccessPageProps {
  searchParams: Promise<{ id?: string; method?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { id, method } = await searchParams;

  if (!id) {
    notFound();
  }

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: true,
      payments: { take: 1 },
    },
  });

  if (!order) {
    notFound();
  }

  const isBankTransfer = method === "bank";

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">
            {isBankTransfer ? "Order Placed!" : "Payment Successful!"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isBankTransfer
              ? "Please complete the bank transfer to confirm your order."
              : "Thank you for your order. We'll start processing it right away."}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono font-medium">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-primary">
                {order.status === "PAID" ? "Confirmed" : "Awaiting Payment"}
              </span>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.productName} ({item.variantName}) × {item.quantity}
                  </span>
                  <span>{formatPrice(Number(item.total))}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(Number(order.subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>
                {Number(order.deliveryFee) > 0
                  ? formatPrice(Number(order.deliveryFee))
                  : "Free"}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(Number(order.total))}</span>
            </div>
          </CardContent>
        </Card>

        {isBankTransfer && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <CardTitle>Bank Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Please transfer the exact amount to the following account:
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">Ghana Commercial Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="font-medium">Intact Ghana Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="font-mono font-medium">1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-primary">
                    {formatPrice(Number(order.total))}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                After making the transfer, please send proof of payment to our WhatsApp
                or email with your order number.
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">
              {order.shippingFirstName} {order.shippingLastName}
            </p>
            <p className="text-muted-foreground">{order.shippingPhone}</p>
            <p className="text-muted-foreground">
              {order.shippingCity}, {order.shippingRegion}
            </p>
            {order.shippingLandmark && (
              <p className="text-muted-foreground">{order.shippingLandmark}</p>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Track Your Order</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive SMS updates on your order status
                  </p>
                </div>
              </div>
              <Truck className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href="/account/orders">
              View My Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
