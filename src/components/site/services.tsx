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
    <section id="servicos" className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
            Serviços
          </div>
          <h2 className="mb-3 text-3xl font-bold leading-tight text-graphite sm:text-4xl">
            Instalações elétricas para habitação, comércio e indústria
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Soluções técnicas claras, executadas com rigor e adaptadas ao tipo
            de espaço e necessidade de cada projeto.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/8"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold leading-snug text-graphite">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-navy">
              Outros trabalhos
            </h3>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold-dark"
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
                  transition={{ duration: 0.3, delay: (i % 3) * 0.04 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 rounded-lg bg-slate-50 p-3"
                >
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white text-navy ring-1 ring-slate-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-snug text-graphite">
                      {service.title}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
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
