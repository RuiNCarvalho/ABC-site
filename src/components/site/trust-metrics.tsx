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
    <section className="relative overflow-hidden bg-navy py-14 lg:py-16">
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mx-auto mb-9 max-w-xl text-center"
        >
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            Números que contam a nossa história
          </h2>
          <p className="text-sm leading-relaxed text-white/60">
            Uma leitura rápida do percurso da empresa e da sua evolução.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-white/8 p-5 text-center transition-colors hover:bg-white/12"
            >
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
                <metric.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="mb-1 text-2xl font-bold tabular-nums text-white sm:text-3xl">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  countUp={metric.countUp}
                />
              </div>
              <div className="mb-1 text-sm font-semibold text-white/80">
                {metric.label}
              </div>
              <div className="text-xs leading-snug text-white/45">
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
