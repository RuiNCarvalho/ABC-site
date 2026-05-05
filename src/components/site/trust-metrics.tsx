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
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-8 lg:py-9">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mx-auto mb-7 max-w-xl text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-graphite sm:text-3xl">
            Números que contam a nossa história
          </h2>
          <p className="text-sm leading-relaxed text-slate-500">
            Uma leitura rápida do percurso da empresa e da sua evolução.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 divide-x-0 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="p-5 text-center transition-colors hover:bg-white"
            >
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-white text-navy ring-1 ring-slate-200">
                <metric.icon className="h-5 w-5" />
              </div>
              <div className="mb-1 text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  countUp={metric.countUp}
                />
              </div>
              <div className="mb-1 text-sm font-semibold text-graphite">
                {metric.label}
              </div>
              <div className="text-xs leading-snug text-slate-500">
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
