import { db } from "@/lib/db";

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  price: number;
  image: string | null;
  category: string;
}

export interface SearchOptions {
  query: string;
  categoryId?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sort?: "relevance" | "price-asc" | "price-desc" | "newest";
}

export async function searchProducts(options: SearchOptions): Promise<{
  results: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const {
    query,
    categoryId,
    brands,
    minPrice,
    maxPrice,
    inStock,
    page = 1,
    limit = 12,
    sort = "relevance",
  } = options;

  const where: Record<string, unknown> = {
    isActive: true,
  };

  // Text search
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { brand: { contains: query, mode: "insensitive" } },
      { sku: { contains: query, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (brands && brands.length > 0) {
    where.brand = { in: brands };
  }

  // Price filter requires joining with variants
  const variantWhere: Record<string, unknown> = { isActive: true };
  if (minPrice !== undefined) {
    variantWhere.price = { ...((variantWhere.price as object) || {}), gte: minPrice };
  }
  if (maxPrice !== undefined) {
    variantWhere.price = { ...((variantWhere.price as object) || {}), lte: maxPrice };
  }

  // Sorting
  let orderBy: Record<string, unknown> = { createdAt: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { variants: { _min: { price: "asc" } } };
  if (sort === "price-desc") orderBy = { variants: { _max: { price: "desc" } } };

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: { select: { name: true } },
        images: { where: { isPrimary: true }, take: 1 },
        variants: {
          where: variantWhere,
          orderBy: { price: "asc" },
          take: 1,
          include: {
            stockLevels: inStock ? { where: { quantity: { gt: 0 } } } : undefined,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  // Filter by stock if needed
  let filteredProducts = products;
  if (inStock) {
    filteredProducts = products.filter(
      (p) => p.variants.some((v) => v.stockLevels && v.stockLevels.length > 0)
    );
  }

  const results: SearchResult[] = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    price: product.variants[0] ? Number(product.variants[0].price) : 0,
    image: product.images[0]?.url || null,
    category: product.category.name,
  }));

  return {
    results,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getSearchSuggestions(query: string, limit = 5): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const products = await db.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
      ],
    },
    select: { name: true, brand: true },
    take: limit * 2,
  });

  const suggestions = new Set<string>();
  
  for (const product of products) {
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.name);
    }
    if (product.brand?.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.brand);
    }
    if (suggestions.size >= limit) break;
  }

  return Array.from(suggestions).slice(0, limit);
}

export async function logSearchQuery(query: string, resultsCount: number): Promise<void> {
  // In production, this would log to analytics
  console.log(`Search: "${query}" - ${resultsCount} results`);
}
