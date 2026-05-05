"use client";

import { motion } from "motion/react";
import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section id="processo" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy/6 border border-navy/10 rounded-full text-xs font-semibold text-navy tracking-wide uppercase mb-4">
            Como trabalhamos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-graphite leading-tight mb-4">
            Processo simples e transparente
          </h2>
          <p className="text-slate-600">
            Do primeiro contacto à entrega, mantemos o processo simples,
            organizado e fácil de acompanhar.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] h-px bg-slate-200 z-0" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative z-10 text-center"
            >
              {/* Step number */}
              <div className="w-16 h-16 rounded-2xl bg-navy text-white flex flex-col items-center justify-center mx-auto mb-5 shadow-sm shadow-navy/20">
                <span className="text-xs font-bold text-gold/70 leading-none">{step.step}</span>
                <span className="text-lg font-bold leading-none mt-0.5">{parseInt(step.step)}</span>
              </div>
              <h3 className="font-semibold text-graphite mb-2 text-sm">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
