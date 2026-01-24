"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  avgRating: number;
}

export function ProductReviews({ productId, reviews, avgRating }: ProductReviewsProps) {
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0
      ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100
      : 0,
  }));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="flex items-center justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {reviews.length} reviews
                </div>
              </div>
              <div className="flex-1 space-y-1">
                {ratingCounts.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {review.user.firstName[0]}{review.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {review.user.firstName} {review.user.lastName[0]}.
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <h4 className="font-medium">{review.title}</h4>
                  )}
                  {review.content && (
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  )}
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews yet</p>
            <Button className="mt-4">Write a Review</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
