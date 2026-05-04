"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Zap, ImageOff } from "lucide-react";
import { portfolio, type PortfolioItem } from "@/data/site";

const categories = ["Todos", "Residencial", "Comercial", "Industrial"];

// Gradient palettes for placeholders — swap for real images in public/images/portfolio/
const placeholderGradients = [
  "from-navy to-navy-dark",
  "from-graphite to-navy",
  "from-navy-light to-graphite",
  "from-navy-dark to-graphite",
  "from-graphite to-navy-light",
  "from-navy to-graphite",
];

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = placeholderGradients[index % placeholderGradients.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-navy/8 hover:border-navy/15 transition-all duration-300"
    >
      {/* Image / Placeholder */}
      {/* To use real images: place files in public/images/portfolio/projeto-N.jpg */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {!imgError && item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center`}>
            {/* Technical grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <ImageOff className="w-8 h-8 text-white/30 mb-2 relative z-10" />
            <span className="text-white/40 text-xs font-medium relative z-10">
              Foto em breve
            </span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy text-xs font-semibold rounded-lg border border-white/40">
            {item.category}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="font-semibold text-graphite text-sm mb-1.5 leading-snug group-hover:text-navy transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          {item.location && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="w-3 h-3" />
              {item.location}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gold-dark font-medium ml-auto">
            <Zap className="w-3 h-3" />
            {item.service}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-xs font-semibold text-gold-dark tracking-wide uppercase mb-4">
            Projetos realizados
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-graphite leading-tight mb-4">
            Trabalhos que falam por nós
          </h2>
          <p className="text-slate-600">
            Exemplos de projetos executados com rigor técnico, nas áreas residencial, comercial e industrial.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-navy/30 hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <PortfolioCard key={item.title} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Note about real images */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-xs text-slate-400 mt-10"
        >
          Fotografias reais dos projetos serão adicionadas em breve.
        </motion.p>
      </div>
    </section>
  );
}
