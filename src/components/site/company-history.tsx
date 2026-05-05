"use client";

import { motion } from "motion/react";
import { Building2, CalendarDays, TrendingUp } from "lucide-react";

const timeline = [
  {
    year: "1974",
    icon: CalendarDays,
    title: "Início da atividade",
    description:
      "Adelino B. Carvalho inicia atividade no setor elétrico, com foco em instalações.",
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
    title: "Mais de 50 anos de experiência",
    description:
      "Continuamos a trabalhar com rigor técnico para clientes particulares, empresas e indústria.",
  },
];

export function CompanyHistory() {
  return (
    <section id="empresa" className="bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-dark">
              A nossa história
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-graphite sm:text-4xl">
              Uma história construída com rigor
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              Uma empresa familiar com décadas de experiência acumulada em
              instalações elétricas residenciais, comerciais e industriais.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-3"
          >
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy">
                  <item.icon className="h-4.5 w-4.5 text-gold" />
                </div>
                <div>
                  <div className="mb-0.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
                    {item.year}
                  </div>
                  <div className="mb-1 text-sm font-semibold text-graphite">
                    {item.title}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
