export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Shield, Truck, RotateCcw, Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductVariantSelector } from "@/components/store/product-variant-selector";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductReviews } from "@/components/store/product-reviews";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
      variants: {
        where: { isActive: true },
        include: {
          options: true,
          stockLevels: true,
        },
        orderBy: { price: "asc" },
      },
      attributeValues: {
        include: {
          attribute: true,
        },
      },
      reviews: {
        where: { status: "APPROVED" },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
  return product;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const lowestPrice = product.variants[0]?.price;
  const highestPrice = product.variants[product.variants.length - 1]?.price;
  const priceNum = typeof lowestPrice === 'object' && 'toNumber' in lowestPrice 
    ? lowestPrice.toNumber() 
    : Number(lowestPrice || 0);

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const totalStock = product.variants.reduce((sum, v) => {
    return sum + v.stockLevels.reduce((s, sl) => s + sl.quantity - sl.reserved, 0);
  }, 0);

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            {product.brand && (
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            )}
            <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
            
            {/* Rating */}
            {product.reviews.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
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
                <span className="text-sm text-muted-foreground">
                  {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(priceNum)}
            </span>
            {product.variants[0]?.compareAtPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(
                  typeof product.variants[0].compareAtPrice === 'object' 
                    ? product.variants[0].compareAtPrice.toNumber() 
                    : Number(product.variants[0].compareAtPrice)
                )}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {totalStock > 0 ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">In Stock</span>
                {totalStock <= 5 && (
                  <Badge variant="secondary">Only {totalStock} left</Badge>
                )}
              </>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground">{product.shortDescription}</p>
          )}

          <Separator />

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <ProductVariantSelector variants={product.variants} />
          )}

          {/* Add to Cart */}
          <AddToCartButton 
            productId={product.id} 
            variantId={product.variants[0]?.id}
            disabled={totalStock <= 0}
          />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-6 w-6 text-primary" />
              <span className="mt-1 text-xs font-medium">Fast Delivery</span>
              <span className="text-xs text-muted-foreground">1-2 days Accra</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-6 w-6 text-primary" />
              <span className="mt-1 text-xs font-medium">Warranty</span>
              <span className="text-xs text-muted-foreground">
                {product.warrantyMonths ? `${product.warrantyMonths} months` : "Included"}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="h-6 w-6 text-primary" />
              <span className="mt-1 text-xs font-medium">Easy Returns</span>
              <span className="text-xs text-muted-foreground">7-day policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Description */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {product.description || "No description available."}
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          {product.attributeValues.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y">
                  {product.attributeValues.map((av) => (
                    <div key={av.id} className="flex py-3">
                      <dt className="w-1/3 text-sm font-medium text-muted-foreground">
                        {av.attribute.name}
                      </dt>
                      <dd className="w-2/3 text-sm">
                        {av.value} {av.attribute.unit && av.attribute.unit}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          <Suspense fallback={<Skeleton className="mt-6 h-64" />}>
            <ProductReviews 
              productId={product.id} 
              reviews={product.reviews}
              avgRating={avgRating}
            />
          </Suspense>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Warranty Info */}
          {product.warrantyTerms && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Warranty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{product.warrantyTerms}</p>
              </CardContent>
            </Card>
          )}

          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Greater Accra</span>
                <span className="font-medium">1-2 days</span>
              </div>
              <div className="flex justify-between">
                <span>Other Regions</span>
                <span className="font-medium">2-5 days</span>
              </div>
              <Separator className="my-2" />
              <p className="text-muted-foreground">
                Free delivery on orders above GHS 500 in Greater Accra
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
