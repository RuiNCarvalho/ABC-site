"use client";

import { useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ImageOff, MapPin, Zap } from "lucide-react";
import { portfolio, type PortfolioItem } from "@/data/site";
import { publicAsset } from "@/lib/public-asset";

const categories = ["Todos", "Residencial", "Comercial", "Industrial"];

const placeholderGradients = [
  "from-navy to-navy-dark",
  "from-graphite to-navy",
  "from-navy-light to-graphite",
  "from-navy-dark to-graphite",
  "from-graphite to-navy-light",
  "from-navy to-graphite",
];

function PortfolioProject({ item, index }: { item: PortfolioItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = placeholderGradients[index % placeholderGradients.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="w-[82vw] flex-none overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-navy/15 hover:shadow-lg hover:shadow-navy/8 sm:w-[420px] lg:w-[460px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgError && item.image ? (
          <Image
            src={publicAsset(item.image)}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center`}>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <ImageOff className="relative z-10 mb-2 h-8 w-8 text-white/30" />
            <span className="relative z-10 text-xs font-medium text-white/40">
              Foto em breve
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-lg border border-white/40 bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="mb-1.5 text-sm font-semibold leading-snug text-graphite">
          {item.title}
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-slate-500">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          {item.location && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3" />
              {item.location}
            </div>
          )}
          <div className="ml-auto flex items-center gap-1 text-xs font-medium text-gold-dark">
            <Zap className="h-3 w-3" />
            {item.service}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "Todos"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  const scrollProjects = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = Math.min(container.clientWidth * 0.9, 520);
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <section className="bg-navy px-6 pt-14 pb-12 text-white sm:px-8 lg:px-14 lg:pt-16 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
            Projetos realizados
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Portfólio
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/65">
            Algumas das nossas obras que nos deixam orgulhosos dos nossos
            serviços. Uma seleção inicial de trabalhos realizados nas áreas
            residencial, comercial e industrial.
          </p>
        </motion.div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-14 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="mb-1 text-xl font-bold text-graphite">
                Obras em destaque
              </h2>
              <p className="text-xs text-slate-500">
                Deslize na horizontal ou use as setas para ver mais projetos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-navy text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-navy/30 hover:text-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scrollProjects("left")}
              aria-label="Ver projetos anteriores"
              className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.div
              ref={scrollRef}
              layout
              className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-1 [&::-webkit-scrollbar]:hidden"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <div key={item.title} className="snap-start">
                    <PortfolioProject item={item} index={index} />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>

            <button
              type="button"
              onClick={() => scrollProjects("right")}
              aria-label="Ver mais projetos"
              className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
