"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProductFiltersProps {
  categoryId: string;
}

const brands = ["HP", "Dell", "Lenovo", "Apple", "Samsung", "Asus", "Acer"];
const priceRanges = [
  { label: "Under GHS 1,000", min: 0, max: 1000 },
  { label: "GHS 1,000 - 3,000", min: 1000, max: 3000 },
  { label: "GHS 3,000 - 5,000", min: 3000, max: 5000 },
  { label: "GHS 5,000 - 10,000", min: 5000, max: 10000 },
  { label: "Over GHS 10,000", min: 10000, max: null },
];

export function ProductFilters({ categoryId }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    } else {
      params.delete("brands");
    }

    if (priceMin) params.set("minPrice", priceMin);
    else params.delete("minPrice");

    if (priceMax) params.set("maxPrice", priceMax);
    else params.delete("maxPrice");

    if (inStockOnly) params.set("inStock", "true");
    else params.delete("inStock");

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
    setInStockOnly(false);
    router.push("?");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear all
        </Button>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-medium">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="h-9"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setPriceMin(range.min.toString());
                  setPriceMax(range.max?.toString() || "");
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h4 className="mb-3 font-medium">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h4 className="mb-3 font-medium">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">In Stock Only</span>
        </label>
      </div>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
