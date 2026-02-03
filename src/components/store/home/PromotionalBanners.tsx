"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  link: string;
  gradient: string;
}

const banners: Banner[] = [
  {
    id: "1",
    title: "Free Delivery on Orders Over GH¢3,000",
    description: "Shop now and save on delivery",
    image: "/images/banners/free-delivery.webp",
    cta: "Shop Now",
    link: "/products",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    id: "2",
    title: "Extended Warranty Available",
    description: "Protect your devices for up to 3 years",
    image: "/images/banners/warranty.webp",
    cta: "Learn More",
    link: "/warranty",
    gradient: "from-orange-500 to-red-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function PromotionalBanners() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="promotions-heading">
      <div className="container">
        <h2 id="promotions-heading" className="sr-only">
          Special Promotions
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {banners.map((banner) => (
            <motion.div key={banner.id} variants={itemVariants}>
              <Link
                href={banner.link}
                className={`group relative flex min-h-[200px] overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} p-6 text-white transition-transform duration-300 hover:scale-[1.02] md:min-h-[280px] md:p-8`}
              >
                <div className="relative z-10 flex flex-col justify-center">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
                    {banner.title}
                  </h3>
                  <p className="mb-4 text-sm text-white/90 md:text-base">
                    {banner.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="w-fit gap-2 bg-white text-slate-900 hover:bg-white/90"
                  >
                    {banner.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                  <Image
                    src={banner.image}
                    alt=""
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
