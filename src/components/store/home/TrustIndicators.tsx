"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, Headphones, LucideIcon } from "lucide-react";

interface TrustIndicator {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const indicators: TrustIndicator[] = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders over GH¢3,000",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: RotateCcw,
    title: "5 Days Return",
    description: "Money back guarantee",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
    color: "text-purple-600 bg-purple-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function TrustIndicators() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="trust-heading">
      <div className="container">
        <h2 id="trust-heading" className="sr-only">
          Why Shop With Us
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={indicator.title}
                variants={itemVariants}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${indicator.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-slate-900">
                  {indicator.title}
                </h3>
                <p className="text-sm text-slate-600">{indicator.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
