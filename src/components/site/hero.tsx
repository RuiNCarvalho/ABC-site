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

const MOBILE_PHOTO = "/foto-patroes.png.png";

export function Hero() {
  const desktopImage = siteConfig.heroBackgroundImage || siteConfig.leadershipPhoto;

  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-dark sm:min-h-screen sm:justify-center"
    >
      {/* MOBILE: foto inteira em frame elegante, sem overlay azul */}
      <div className="relative pt-[68px] sm:hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[68px] bg-gradient-to-b from-navy-dark/90 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative px-4 pb-3 pt-5"
        >
          <div className="relative mx-auto max-w-[440px]">
            {/* Glow dourado por trás */}
            <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gold/15 blur-2xl" />
            <div className="pointer-events-none absolute -inset-1 rounded-[24px] bg-gradient-to-br from-gold/30 via-transparent to-navy-light/30" />

            {/* Frame da foto */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-navy-dark shadow-2xl shadow-black/50 ring-1 ring-gold/10">
              <div className="relative aspect-[5/3] w-full">
                <Image
                  src={publicAsset(MOBILE_PHOTO)}
                  alt="Equipa Adelino B. Carvalho"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 440px"
                  className="object-cover object-top"
                />
                {/* Vinheta subtil para integrar com o navy */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/35 via-transparent to-transparent" />
              </div>

              {/* Faixa inferior com badge */}
              <div className="relative flex items-center justify-between gap-3 border-t border-white/10 bg-gradient-to-r from-navy-dark via-navy to-navy-dark px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  Adelino B. Carvalho Lda
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                  Desde 1974
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* DESKTOP: imagem de fundo cobrindo tudo */}
      {desktopImage && (
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src={publicAsset(desktopImage)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain object-top contrast-110 brightness-105 sm:object-cover sm:object-[center_28%]"
          />
          <div className="absolute inset-0 bg-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/54 to-navy/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/16 via-transparent to-transparent" />
        </div>
      )}

      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 select-none opacity-[0.08] pointer-events-none xl:block">
        <Zap className="h-96 w-96 text-white" strokeWidth={1} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gold backdrop-blur-sm sm:mb-6 sm:border-white/15 sm:bg-white/10 sm:text-xs sm:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="hidden sm:inline">Empresa familiar de instalações elétricas</span>
            <span className="sm:hidden">Empresa familiar · Instalações elétricas</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-[3.35rem]"
          >
            Eletricidade bem executada, do primeiro ponto ao quadro final
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-7 max-w-xl text-[0.95rem] leading-relaxed text-white/72 sm:mb-9 sm:text-lg"
          >
            Trabalhos para habitação, comércio e indústria, com planeamento claro,
            execução cuidada e atenção aos detalhes que ficam para uso diário.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-10 flex flex-col gap-2.5 sm:mb-12 sm:flex-row sm:flex-wrap sm:gap-3"
          >
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-bold text-graphite transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 sm:py-3"
            >
              Pedir orçamento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-white/10 sm:py-3"
            >
              Ver portfólio
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:gap-6"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[13.5px] text-white/65 sm:text-sm">
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
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex"
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
