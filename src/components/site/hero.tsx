"use client";

import { motion } from "motion/react";
import { ArrowRight, Award, ChevronDown, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { publicAsset } from "@/lib/public-asset";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const highlights = [
  { icon: Shield, label: "Empresa certificada" },
  { icon: Award, label: "Desde 1974" },
  { icon: Zap, label: "Obra limpa e acompanhada" },
];

export function Hero() {
  const heroImage = siteConfig.heroBackgroundImage || siteConfig.leadershipPhoto;

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-navy pt-16"
    >
      {heroImage ? (
        <>
          <Image
            src={publicAsset(heroImage)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%] contrast-110 brightness-105"
          />
          <div className="absolute inset-0 bg-navy/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/48 to-navy/8" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/14 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-white bg-grid-pattern" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-slate-50/80 to-transparent pointer-events-none" />
        </>
      )}

      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 select-none opacity-[0.08] pointer-events-none xl:block">
        <Zap className="h-96 w-96 text-white" strokeWidth={1} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Empresa familiar de instalações elétricas
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Eletricidade bem executada, do primeiro ponto ao quadro final
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-10 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl"
          >
            Trabalhos para habitação, comércio e indústria, com planeamento claro,
            execução cuidada e atenção aos detalhes que ficam para uso diário.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-14 flex flex-wrap gap-3"
          >
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-graphite transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Pedir orçamento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-white/10"
            >
              Ver portfólio
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-6"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/65">
                <Icon className="h-4 w-4 flex-shrink-0 text-gold" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="text-xs uppercase tracking-wider text-white/45">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-white/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
