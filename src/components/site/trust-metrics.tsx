"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase, Building2, Calendar, Clock } from "lucide-react";

type Metric = {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  countUp?: boolean;
};

const metrics: Metric[] = [
  {
    icon: Calendar,
    value: 1974,
    suffix: "",
    label: "Início de atividade",
    sublabel: "Início da experiência técnica",
    countUp: false,
  },
  {
    icon: Building2,
    value: 2002,
    suffix: "",
    label: "Empresa constituída",
    sublabel: "Sociedade registada em Portugal",
    countUp: false,
  },
  {
    icon: Clock,
    value: 24,
    suffix: " anos",
    label: "Como sociedade",
    sublabel: "Anos de empresa formalizada",
  },
  {
    icon: Briefcase,
    value: 50,
    suffix: "+ anos",
    label: "Percurso técnico",
    sublabel: "Conhecimento aplicado em obra",
  },
];

function AnimatedCounter({
  value,
  suffix,
  countUp = true,
}: {
  value: number;
  suffix: string;
  countUp?: boolean;
}) {
  const [display, setDisplay] = useState(countUp ? 0 : value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!countUp || !isInView) return;

    let start: number | null = null;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [countUp, isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function TrustMetrics() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 sm:py-16 lg:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,209,128,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-xl text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Em números
          </div>
          <h2 className="mb-3 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Números que contam a nossa história
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-white/60 sm:text-base">
            Uma leitura rápida do percurso da empresa e da sua evolução.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.07] sm:p-6"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gold/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold ring-1 ring-gold/20 sm:h-11 sm:w-11">
                <metric.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>

              <div className="mb-1.5 text-[1.65rem] font-bold leading-none tabular-nums text-white sm:text-3xl lg:text-[2.1rem]">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  countUp={metric.countUp}
                />
              </div>
              <div className="mb-1 text-[13px] font-semibold leading-tight text-white/95 sm:text-sm">
                {metric.label}
              </div>
              <div className="text-[11px] leading-snug text-white/45 sm:text-xs">
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
