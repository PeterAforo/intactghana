"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "HP", logo: "/images/brands/hp.svg", href: "/brands/hp" },
  { name: "Samsung", logo: "/images/brands/samsung.svg", href: "/brands/samsung" },
  { name: "Apple", logo: "/images/brands/apple.svg", href: "/brands/apple" },
  { name: "Dell", logo: "/images/brands/dell.svg", href: "/brands/dell" },
  { name: "Lenovo", logo: "/images/brands/lenovo.svg", href: "/brands/lenovo" },
  { name: "Sony", logo: "/images/brands/sony.svg", href: "/brands/sony" },
  { name: "LG", logo: "/images/brands/lg.svg", href: "/brands/lg" },
  { name: "Canon", logo: "/images/brands/canon.svg", href: "/brands/canon" },
];

export function BrandPartners() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12" aria-labelledby="brands-heading">
      <div className="container">
        <h2
          id="brands-heading"
          className="mb-8 text-center text-lg font-semibold text-slate-600"
        >
          Trusted by Leading Brands
        </h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Double the brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={brand.href}
                className="flex h-16 w-24 flex-shrink-0 items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:h-20 md:w-32"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-lg font-bold text-slate-400">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
