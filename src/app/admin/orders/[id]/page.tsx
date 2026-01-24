export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Truck, User, CreditCard, MapPin } from "lucide-react";
import { OrderStatusUpdater } from "@/components/admin/order-status-updater";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, firstName: true, lastName: true, email: true, phone: true },
      },
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
      payments: true,
      shipments: {
        include: { location: true },
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
    PAID: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    PACKED: "bg-indigo-100 text-indigo-800",
    DISPATCHED: "bg-cyan-100 text-cyan-800",
    DELIVERED: "bg-green-100 text-green-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
          <p className="text-muted-foreground">
            Created {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge className={statusColors[order.status] || "bg-gray-100"}>
          {order.status.replace(/_/g, " ")}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                      IMG
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.variantName} • SKU: {item.sku}
                      </p>
                      <p className="text-sm">
                        {formatPrice(Number(item.price))} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(Number(item.total))}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(Number(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{formatPrice(Number(order.deliveryFee))}</span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(Number(order.discount))}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(Number(order.total))}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.payments.map((payment) => (
                <div key={payment.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span>{payment.method.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={payment.status === "SUCCESS" ? "default" : "secondary"}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference</span>
                    <span className="font-mono text-sm">{payment.reference}</span>
                  </div>
                  {payment.providerRef && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider Ref</span>
                      <span className="font-mono text-sm">{payment.providerRef}</span>
                    </div>
                  )}
                  {payment.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paid At</span>
                      <span>{formatDate(payment.paidAt)}</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.statusHistory.map((history, index) => (
                  <div key={history.id} className="flex gap-4">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {index < order.statusHistory.length - 1 && (
                        <div className="absolute left-1.5 top-3 h-full w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{history.status.replace(/_/g, " ")}</p>
                      {history.note && (
                        <p className="text-sm text-muted-foreground">{history.note}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(history.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                {order.user
                  ? `${order.user.firstName} ${order.user.lastName}`
                  : `${order.shippingFirstName} ${order.shippingLastName}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.user?.email || order.guestEmail}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.user?.phone || order.guestPhone}
              </p>
              {order.user && (
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href={`/admin/customers/${order.user.id}`}>
                    View Customer
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">
                {order.shippingFirstName} {order.shippingLastName}
              </p>
              <p>{order.shippingPhone}</p>
              <p>{order.shippingCity}, {order.shippingRegion}</p>
              {order.shippingLandmark && <p>{order.shippingLandmark}</p>}
              {order.shippingGpsCode && (
                <p className="font-mono">{order.shippingGpsCode}</p>
              )}
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
