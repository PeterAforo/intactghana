export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Check, X, Eye } from "lucide-react";

interface ReviewsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;
  const status = params.status || "PENDING";

  const [reviews, total] = await Promise.all([
    db.review.findMany({
      where: { status: status as "PENDING" | "APPROVED" | "REJECTED" },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.review.count({ where: { status: status as "PENDING" | "APPROVED" | "REJECTED" } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">Moderate customer reviews</p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2">
        {["PENDING", "APPROVED", "REJECTED"].map((s) => (
          <Link key={s} href={`/admin/reviews?status=${s}`}>
            <Button variant={status === s ? "default" : "outline"} size="sm">
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </Button>
          </Link>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {review.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  
                  <Link href={`/product/${review.product.slug}`} className="font-medium hover:text-primary">
                    {review.product.name}
                  </Link>
                  
                  {review.title && <h4 className="font-medium mt-2">{review.title}</h4>}
                  {review.content && (
                    <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{review.user.firstName} {review.user.lastName}</span>
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>

                {status === "PENDING" && (
                  <div className="flex flex-col gap-2">
                    <form action={`/api/admin/reviews/${review.id}/approve`} method="POST">
                      <Button type="submit" size="sm" variant="default">
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </form>
                    <form action={`/api/admin/reviews/${review.id}/reject`} method="POST">
                      <Button type="submit" size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No {status.toLowerCase()} reviews</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/reviews?status=${status}&page=${p}`}
              className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
