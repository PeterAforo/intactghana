"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
  image: string;
  gradient: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Electronics at Unbeatable Prices",
    subtitle: "Shop laptops, phones, appliances & more with AI-powered recommendations",
    cta: { text: "Shop Now", href: "/category/laptops" },
    image: "/images/hero/hero-electronics.webp",
    gradient: "from-blue-600 via-blue-700 to-blue-900",
  },
  {
    id: 2,
    title: "Buy Now, Pay Later with Canpay",
    subtitle: "Spread payments over 3-12 months with 0% interest",
    cta: { text: "Learn More", href: "/canpay" },
    image: "/images/hero/hero-bnpl.webp",
    gradient: "from-orange-500 via-orange-600 to-red-600",
  },
  {
    id: 3,
    title: "AI-Powered Shopping Assistant",
    subtitle: "Find the perfect product with our smart chatbot",
    cta: { text: "Try Now", href: "#ai-chat" },
    image: "/images/hero/hero-ai.webp",
    gradient: "from-purple-600 via-indigo-700 to-blue-800",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  }),
};

export function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  const goToSlide = (index: number) => {
    const newDirection = index > slideIndex ? 1 : -1;
    setPage([index, newDirection]);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, paginate]);

  const currentSlide = slides[slideIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Featured promotions carousel"
      role="region"
    >
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className={cn(
              "absolute inset-0 bg-gradient-to-r",
              currentSlide.gradient
            )}
          >
            <div className="container h-full">
              <div className="flex h-full items-center">
                <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
                  {/* Text Content */}
                  <div className="z-10 px-4 py-12 text-white md:px-0 lg:py-0">
                    <motion.span
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm"
                    >
                      Featured
                    </motion.span>
                    <motion.h1
                      custom={1}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl"
                    >
                      {currentSlide.title}
                    </motion.h1>
                    <motion.p
                      custom={2}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-8 max-w-lg text-base text-white/90 md:text-lg lg:text-xl"
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                    <motion.div
                      custom={3}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-slate-900 hover:bg-white/90"
                      >
                        <Link href={currentSlide.cta.href}>
                          {currentSlide.cta.text}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Image */}
                  <div className="relative hidden h-full items-center justify-center lg:flex">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative h-[400px] w-[400px]"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
                      <Image
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/placeholder-product.png";
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
          {/* Dot Indicators */}
          <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white",
                  index === slideIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                )}
                role="tab"
                aria-selected={index === slideIndex}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
