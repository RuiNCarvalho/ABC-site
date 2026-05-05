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
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/8 blur-3xl lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-navy/6 blur-3xl lg:h-[28rem] lg:w-[28rem]" />

      {/* Watermark "Anos" no fundo (desktop) */}
      <div className="pointer-events-none absolute bottom-8 right-4 hidden select-none lg:block">
        <span className="block text-[14rem] font-black leading-none tracking-tighter text-navy/[0.025] xl:text-[18rem]">
          50+
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
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

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="mb-5 hidden h-px w-20 origin-left bg-gradient-to-r from-gold to-gold/0 lg:block"
            />

            <h2 className="mb-5 text-[1.85rem] font-bold leading-[1.15] tracking-tight text-graphite sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              Uma empresa{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-navy">
                  construída
                </span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-2.5 bg-gold/30 lg:h-3" />
              </span>{" "}
              no terreno
            </h2>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-slate-600 sm:text-base lg:text-[1.05rem] lg:leading-[1.7]">
              Crescemos com trabalho prático, relações de confiança e atenção
              ao que cada cliente precisa em obra.
            </p>

            {/* Mini-card de credibilidade (desktop) */}
            <div className="mt-8 hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm lg:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-dark text-gold shadow-md shadow-navy/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest">EST</span>
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none text-graphite">1974</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Mais de meio século no setor
                  </div>
                </div>
              </div>
            </div>

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
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-[31px]" />

            <div className="flex flex-col gap-5 lg:gap-6">
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
                    <div className="absolute inset-0 rounded-2xl bg-gold/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-dark shadow-lg shadow-navy/25 ring-4 ring-white sm:h-[62px] sm:w-[62px]">
                      <item.icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lg hover:shadow-navy/5 sm:p-6 lg:p-7">
                    {/* Linha gold no hover (desktop) */}
                    <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-gold via-gold/60 to-transparent transition-transform duration-300 group-hover:scale-y-100 lg:block" />

                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark lg:text-[11px]">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-[0.95rem] font-bold leading-snug text-graphite sm:text-base lg:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-slate-600 sm:text-sm lg:text-[14.5px] lg:leading-[1.65]">
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
