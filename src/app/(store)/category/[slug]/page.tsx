export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters } from "@/components/store/product-filters";
import { ProductCard } from "@/components/store/product-card";
import { db } from "@/lib/db";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getCategory(slug: string) {
  const category = await db.category.findUnique({
    where: { slug, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      parent: true,
    },
  });
  return category;
}

async function getProducts(categoryId: string, searchParams: Record<string, string | string[] | undefined>) {
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const sort = (searchParams.sort as string) || "newest";

  let orderBy: Record<string, unknown> = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { createdAt: "asc" };
  if (sort === "price-desc") orderBy = { createdAt: "desc" };
  if (sort === "name") orderBy = { name: "asc" };

  const [products, total] = await Promise.all([
    db.product.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        variants: {
          where: { isActive: true },
          include: {
            stockLevels: true,
          },
          orderBy: { price: "asc" },
          take: 1,
        },
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.product.count({
      where: {
        categoryId,
        isActive: true,
      },
    }),
  ]);

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.metaTitle || category.name,
    description: category.metaDescription || category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const { products, total, page, totalPages } = await getProducts(category.id, resolvedSearchParams);

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        {category.parent && (
          <>
            <Link href={`/category/${category.parent.slug}`} className="hover:text-foreground">
              {category.parent.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
      </div>

      {/* Subcategories */}
      {category.children.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {category.children.map((child) => (
              <Link key={child.id} href={`/category/${child.slug}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {child.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ProductFilters categoryId={category.id} />
          </Suspense>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} of {total} products
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/category/${slug}?page=${p}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
