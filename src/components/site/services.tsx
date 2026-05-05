"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Factory,
  Hammer,
  Home,
  LayoutGrid,
  Lightbulb,
  Network,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/data/site";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  Factory,
  LayoutGrid,
  Lightbulb,
  ShieldCheck,
  Network,
  Zap,
  Hammer,
};

const featuredIds = new Set(["residencial", "comercial", "industrial"]);

export function Services() {
  const featured = services.filter((service) => featuredIds.has(service.id));
  const secondary = services.filter((service) => !featuredIds.has(service.id));

  return (
    <section id="servicos" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" />
            Serviços
          </div>
          <h2 className="mb-4 text-[1.85rem] font-bold leading-[1.15] tracking-tight text-graphite sm:text-4xl lg:text-[2.5rem]">
            Trabalhos preparados para cada tipo de espaço
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-slate-600 sm:text-base">
            Cada intervenção é pensada para o uso real do espaço, desde a
            distribuição de circuitos à iluminação e documentação necessária.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap;
            const isPrimary = i === 0;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-40px" }}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 sm:p-7 ${
                  isPrimary
                    ? "border border-navy bg-gradient-to-br from-navy via-navy to-navy-dark text-white shadow-xl shadow-navy/20"
                    : "border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5"
                }`}
              >
                {isPrimary && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
                    <div className="pointer-events-none absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  </>
                )}

                <div className="relative mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                      isPrimary
                        ? "bg-gradient-to-br from-gold/25 to-gold/5 text-gold ring-1 ring-gold/30"
                        : "bg-gradient-to-br from-navy/8 to-navy/2 text-navy ring-1 ring-navy/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
                      isPrimary ? "text-gold" : "text-gold-dark"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className={`relative mb-2.5 text-[1.05rem] font-bold leading-snug sm:text-lg ${
                    isPrimary ? "text-white" : "text-graphite"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`relative text-[13.5px] leading-relaxed sm:text-sm ${
                    isPrimary ? "text-white/72" : "text-slate-600"
                  }`}
                >
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:mt-8 sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy">
                Áreas complementares
              </h3>
            </div>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 self-start rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy-dark hover:shadow-md sm:self-auto"
            >
              Falar sobre o projeto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy/8 to-navy/2 text-navy ring-1 ring-navy/8 transition-colors group-hover:from-gold/15 group-hover:to-gold/5 group-hover:text-gold-dark group-hover:ring-gold/20">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 text-[14px] font-semibold leading-snug text-graphite">
                      {service.title}
                    </div>
                    <p className="line-clamp-2 text-[12px] leading-snug text-slate-500">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
