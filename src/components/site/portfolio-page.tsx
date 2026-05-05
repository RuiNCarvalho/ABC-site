"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ImageOff, MapPin, Sparkles, Zap } from "lucide-react";
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
      className="group w-[82vw] flex-none overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-xl hover:shadow-navy/8 sm:w-[420px] lg:w-[480px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgError && item.image ? (
          <Image
            src={publicAsset(item.image)}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
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

        {/* Gradient overlay no hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-gold" />
          {item.category}
        </span>

        {/* Numero de projeto */}
        <span className="absolute right-3 top-3 rounded-lg bg-navy-dark/70 px-2.5 py-1 text-[10px] font-bold tabular-nums tracking-widest text-gold backdrop-blur-sm">
          0{index + 1}
        </span>
      </div>

      <div className="p-5 lg:p-6">
        <h3 className="mb-2 text-[15px] font-bold leading-snug text-graphite lg:text-base">
          {item.title}
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-slate-500 lg:text-sm">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          {item.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              {item.location}
            </div>
          )}
          <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gold-dark">
            <Zap className="h-3.5 w-3.5" />
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-dark px-5 pt-14 pb-14 text-white sm:px-8 sm:pt-16 sm:pb-16 lg:px-14 lg:pt-20 lg:pb-20">
        {/* Vinheta + grain + decorations */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.5)_100%)]" />
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl lg:h-96 lg:w-96" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-navy-light/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.06] mix-blend-overlay lg:block"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Watermark */}
        <div className="pointer-events-none absolute bottom-[-2rem] right-[-1rem] hidden select-none lg:block">
          <span className="block text-[14rem] font-black leading-none tracking-tighter text-white/[0.04] xl:text-[18rem]">
            {portfolio.length}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="h-3 w-3" />
            Projetos realizados
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 h-px w-16 origin-left bg-gradient-to-r from-gold to-gold/0 lg:w-24"
          />

          <h1 className="mb-5 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
            Portf<span className="italic">ó</span>lio
          </h1>
          <p className="max-w-3xl text-[0.95rem] leading-relaxed text-white/70 sm:text-base lg:text-[1.1rem] lg:leading-[1.7]">
            Uma seleção inicial de trabalhos que mostram diferentes contextos
            de obra, desde habitação a espaços comerciais e infraestruturas
            técnicas.
          </p>

          {/* Stats inline (desktop) */}
          <div className="mt-10 hidden items-center gap-8 border-t border-white/10 pt-6 sm:flex">
            <div>
              <div className="text-2xl font-bold tabular-nums text-white lg:text-3xl">
                {portfolio.length}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/45">
                Projetos
              </div>
            </div>
            <span className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold tabular-nums text-white lg:text-3xl">
                {categories.length - 1}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/45">
                Categorias
              </div>
            </div>
            <span className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold tabular-nums text-white lg:text-3xl">50+</div>
              <div className="text-[11px] uppercase tracking-widest text-white/45">
                Anos de obra
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="relative px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-40" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="mb-1.5 text-xl font-bold text-graphite lg:text-2xl">
                Obras em destaque
              </h2>
              <p className="text-[13px] text-slate-500">
                Deslize na horizontal para percorrer os projetos disponíveis.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-navy text-white shadow-md shadow-navy/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-navy/30 hover:text-navy hover:shadow-sm"
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
              className="group absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-lg transition-all duration-200 hover:-translate-x-[55%] hover:bg-navy hover:text-white hover:shadow-xl lg:flex"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <motion.div
              ref={scrollRef}
              layout
              className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-1 [&::-webkit-scrollbar]:hidden"
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
              className="group absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-lg transition-all duration-200 hover:translate-x-[55%] hover:bg-navy hover:text-white hover:shadow-xl lg:flex"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
