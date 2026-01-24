import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Clock
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "GHS 125,430",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "324",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customers",
    value: "1,245",
    change: "+18.7%",
    trend: "up",
    icon: Users,
  },
];

const recentOrders = [
  { id: "IG-ABC123", customer: "John Doe", total: 4500, status: "Processing", date: "2 hours ago" },
  { id: "IG-DEF456", customer: "Jane Smith", total: 2800, status: "Paid", date: "4 hours ago" },
  { id: "IG-GHI789", customer: "Kwame Asante", total: 8500, status: "Dispatched", date: "6 hours ago" },
  { id: "IG-JKL012", customer: "Ama Mensah", total: 1200, status: "Delivered", date: "1 day ago" },
];

const lowStockProducts = [
  { name: "HP Pavilion 15 - 8GB/256GB", stock: 3, threshold: 10 },
  { name: "Samsung Galaxy A54 - 128GB", stock: 5, threshold: 20 },
  { name: "USB-C Hub 7-in-1", stock: 2, threshold: 15 },
];

const pendingReviews = [
  { product: "Dell Inspiron 14", customer: "Peter Osei", rating: 4, date: "1 hour ago" },
  { product: "iPhone 15 Case", customer: "Grace Adjei", rating: 5, date: "3 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">GHS {order.total.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Dispatched"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <CardTitle className="text-base">Low Stock Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between text-sm">
                    <span className="truncate">{product.name}</span>
                    <span className="text-orange-500 font-medium">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-base">Pending Reviews</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingReviews.map((review, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{review.product}</p>
                      <p className="text-muted-foreground">{review.customer}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
