"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Shield, Zap } from "lucide-react";
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
            <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-gold/15 blur-2xl" />
            <div className="pointer-events-none absolute -inset-1 rounded-[24px] bg-gradient-to-br from-gold/30 via-transparent to-navy-light/30" />

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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/35 via-transparent to-transparent" />
              </div>

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

      {/* DESKTOP: imagem de fundo + tratamento cinematográfico */}
      {desktopImage && (
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src={publicAsset(desktopImage)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%] contrast-[1.08] brightness-[1.04] saturate-[0.92]"
          />
          {/* Vinheta radial cinematográfica */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,transparent_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.55)_100%)]" />
          {/* Gradiente diagonal premium */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 via-navy/55 to-navy/0" />
          {/* Top-bottom subtle */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/55 via-transparent to-navy-dark/30" />
          {/* Grain SVG noise */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Linhas verticais decorativas (border) */}
          <div className="pointer-events-none absolute inset-y-0 left-[7vw] hidden w-px bg-gradient-to-b from-transparent via-white/8 to-transparent xl:block" />
          <div className="pointer-events-none absolute inset-y-0 right-[5vw] hidden w-px bg-gradient-to-b from-transparent via-white/6 to-transparent xl:block" />
        </div>
      )}

      {/* WATERMARK: ano em filigrana */}
      <div className="pointer-events-none absolute inset-0 hidden select-none lg:block">
        <div className="absolute bottom-[8%] right-[4%] xl:right-[6%]">
          <span className="block text-[14rem] font-black leading-none tracking-tighter text-white/[0.045] xl:text-[19rem]">
            1974
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:py-16 lg:px-8 lg:py-24 xl:py-28">
        <div className="max-w-2xl xl:max-w-3xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gold backdrop-blur-sm sm:mb-6 sm:border-white/15 sm:bg-white/10 sm:px-3.5 sm:py-2 sm:text-xs sm:text-white"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="hidden sm:inline">Empresa familiar de instalações elétricas</span>
            <span className="sm:hidden">Empresa familiar · Instalações elétricas</span>
          </motion.div>

          {/* Linha gold accent (apenas desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="mb-5 hidden h-px w-16 origin-left bg-gradient-to-r from-gold to-gold/0 sm:block lg:w-24"
          />

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08] xl:text-[4rem]"
          >
            Eletricidade{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text italic text-transparent">
                bem executada
              </span>
              <span className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-gold/60 via-gold/30 to-transparent" />
            </span>
            , do primeiro ponto ao quadro final
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-7 max-w-xl text-[0.95rem] leading-relaxed text-white/72 sm:mb-9 sm:text-lg lg:text-[1.1rem] lg:leading-[1.65]"
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
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gold px-6 py-3.5 font-bold text-graphite transition-all duration-300 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/25 sm:py-3 lg:px-7 lg:py-3.5 lg:text-[15px]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Pedir orçamento</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10 sm:py-3 lg:px-7 lg:py-3.5 lg:text-[15px]"
            >
              Ver portfólio
              <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3"
          >
            {highlights.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-[13.5px] text-white/65 sm:text-sm"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 sm:h-8 sm:w-8">
                  <Icon className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" />
                </span>
                <span className="font-medium">{label}</span>
                {i < highlights.length - 1 && (
                  <span className="hidden h-3 w-px bg-white/15 sm:ml-4 sm:inline-block" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust strip flutuante na parte de baixo (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="absolute bottom-0 left-0 right-0 hidden border-t border-white/8 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-navy-dark/40 backdrop-blur-md lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-4 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                Desde
              </span>
              <span className="text-2xl font-bold tabular-nums text-white">1974</span>
            </div>
            <span className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-bold tabular-nums text-white">50+</span>
              <span className="text-[12px] uppercase tracking-wider text-white/60">
                anos de<br />experiência
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            Explorar
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
