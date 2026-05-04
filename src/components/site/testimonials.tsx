"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-xs font-semibold text-gold-dark tracking-wide uppercase mb-4">
            Testemunhos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-graphite leading-tight mb-4">
            O que dizem os nossos clientes
          </h2>
          <p className="text-slate-600">
            A confiança dos nossos clientes é o resultado de décadas de trabalho sério,
            honesto e de qualidade.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-4 hover:border-navy/15 hover:shadow-sm transition-all duration-200"
            >
              <Quote className="w-6 h-6 text-gold/60 flex-shrink-0" />

              <p className="text-sm text-slate-700 leading-relaxed flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-auto">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 text-gold fill-gold"
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold text-graphite">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
