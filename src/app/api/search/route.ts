import { NextRequest, NextResponse } from "next/server";
import { searchProducts, logSearchQuery } from "@/lib/search";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get("q") || "";
    const categoryId = searchParams.get("category") || undefined;
    const brands = searchParams.get("brands")?.split(",").filter(Boolean);
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const inStock = searchParams.get("inStock") === "true";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);
    const sort = (searchParams.get("sort") as "relevance" | "price-asc" | "price-desc" | "newest") || "relevance";

    const results = await searchProducts({
      query,
      categoryId,
      brands,
      minPrice,
      maxPrice,
      inStock,
      page,
      limit,
      sort,
    });

    // Log search for analytics
    if (query) {
      await logSearchQuery(query, results.total);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Search failed" },
      { status: 500 }
    );
  }
}
