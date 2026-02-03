"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Tv,
  Home,
  Gamepad2,
  Headphones,
  Camera,
  Printer,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  icon: LucideIcon;
  count: string;
  href: string;
  color: string;
}

const categories: Category[] = [
  {
    name: "Laptops",
    icon: Laptop,
    count: "150+ products",
    href: "/category/laptops",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Smartphones",
    icon: Smartphone,
    count: "200+ products",
    href: "/category/phones",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "TVs",
    icon: Tv,
    count: "80+ products",
    href: "/category/tvs",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Home Appliances",
    icon: Home,
    count: "120+ products",
    href: "/category/appliances",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: "90+ products",
    href: "/category/gaming",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Audio",
    icon: Headphones,
    count: "110+ products",
    href: "/category/audio",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Cameras",
    icon: Camera,
    count: "60+ products",
    href: "/category/cameras",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Printers",
    icon: Printer,
    count: "70+ products",
    href: "/category/printers",
    color: "bg-teal-100 text-teal-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function QuickCategories() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="categories-heading">
      <div className="container">
        <div className="mb-8 text-center">
          <h2
            id="categories-heading"
            className="text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Shop by Category
          </h2>
          <p className="mt-2 text-slate-600">
            Browse our wide selection of electronics and appliances
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.name} variants={itemVariants}>
                <Link
                  href={category.href}
                  className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div
                    className={cn(
                      "mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                      category.color
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-center text-xs text-slate-500">
                    {category.count}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
