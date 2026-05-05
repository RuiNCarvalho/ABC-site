"use client";

import { motion } from "motion/react";
import { Building2, CalendarDays, TrendingUp } from "lucide-react";

const timeline = [
  {
    year: "1974",
    icon: CalendarDays,
    title: "Início da atividade",
    description:
      "Começa um percurso ligado à eletricidade, feito de trabalho de proximidade e aprendizagem no terreno.",
  },
  {
    year: "2002",
    icon: Building2,
    title: "Constituição da sociedade",
    description:
      "É constituída a Adelino B. Carvalho Instalações Elétricas Lda.",
  },
  {
    year: "Hoje",
    icon: TrendingUp,
    title: "Continuidade familiar",
    description:
      "A empresa mantém uma atuação próxima, orientada para obras bem preparadas e entregues com seriedade.",
  },
];

export function CompanyHistory() {
  return (
    <section
      id="empresa"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-navy/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-24"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              A nossa história
            </div>
            <h2 className="mb-5 text-[1.85rem] font-bold leading-[1.15] tracking-tight text-graphite sm:text-4xl lg:text-[2.5rem]">
              Uma empresa construída no terreno
            </h2>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-slate-600 sm:text-base">
              Crescemos com trabalho prático, relações de confiança e atenção
              ao que cada cliente precisa em obra.
            </p>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-dark">
                Marcos
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Linha vertical da timeline */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-[31px]" />

            <div className="flex flex-col gap-5">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative flex gap-5"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                    <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-navy shadow-lg shadow-navy/20 ring-4 ring-white sm:h-[62px] sm:w-[62px]">
                      <item.icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md sm:p-6">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-[0.95rem] font-bold leading-snug text-graphite sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
