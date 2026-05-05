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
  from?: number;
};

const REFERENCE_YEAR = 2026;

const metrics: Metric[] = [
  {
    icon: Calendar,
    value: 1974,
    suffix: "",
    label: "Início de atividade",
    sublabel: "Início da experiência técnica",
    from: REFERENCE_YEAR,
  },
  {
    icon: Building2,
    value: 2002,
    suffix: "",
    label: "Empresa constituída",
    sublabel: "Sociedade registada em Portugal",
    from: REFERENCE_YEAR,
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
  from = 0,
}: {
  value: number;
  suffix: string;
  from?: number;
}) {
  const [display, setDisplay] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;
    const distance = Math.abs(value - from);
    // Anos têm muitos dígitos a percorrer — damos-lhes mais tempo para o efeito ser legível
    const duration = distance > 100 ? 1800 : 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value, from]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function TrustMetrics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-dark via-navy to-navy-dark py-14 sm:py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,209,128,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      {/* Grain subtil */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] mix-blend-overlay lg:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

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
          <h2 className="mb-3 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
            Números que contam{" "}
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text italic text-transparent">
              a nossa história
            </span>
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-white/60 sm:text-base lg:text-[1.05rem]">
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.07] sm:p-6 lg:p-7"
            >
              {/* Glow no canto */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              {/* Linha gold no topo (desktop) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100 lg:block" />

              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold ring-1 ring-gold/20 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                <metric.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>

              <div className="mb-1.5 text-[1.65rem] font-bold leading-none tabular-nums text-white sm:text-3xl lg:text-[2.4rem]">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  from={metric.from}
                />
              </div>
              <div className="mb-1 text-[13px] font-semibold leading-tight text-white/95 sm:text-sm lg:text-[15px]">
                {metric.label}
              </div>
              <div className="text-[11px] leading-snug text-white/45 sm:text-xs lg:text-[12.5px]">
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
