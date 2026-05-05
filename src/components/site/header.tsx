"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { publicAsset } from "@/lib/public-asset";

type NavLink = {
  href: string;
  label: string;
  page: boolean;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { href: "#empresa", label: "Empresa", page: false },
  { href: "#servicos", label: "Serviços", page: false },
  { href: "/portfolio", label: "Portfólio", page: true },
  { href: "/candidaturas", label: "Candidaturas", page: true },
  { href: "/contacto", label: "Contacto", page: true },
  {
    href: "https://ruincarvalho.github.io/Trited/",
    label: "Trited",
    page: false,
    external: true,
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const transparentHeader = isHome;
  const linkClass = `px-3.5 py-2 text-sm font-semibold transition-colors rounded-md ${
    transparentHeader
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-slate-600 hover:text-navy hover:bg-slate-50"
  }`;

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHome ? "bg-transparent" : "border-b border-slate-100 bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center">
            <Link href="/" className="flex min-w-0 items-center">
              <Image
                src={publicAsset("/logo_adelino_b_carvalho_transparente_2x.png")}
                alt="Adelino B. Carvalho Instalações Elétricas Lda"
                width={562}
                height={96}
                className={`h-10 w-auto max-w-[210px] object-contain sm:h-11 sm:max-w-none ${
                  transparentHeader ? "brightness-0 invert" : ""
                }`}
                priority
                unoptimized
              />
            </Link>

            <nav className="ml-auto hidden items-center gap-2 lg:flex">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-1.5`}
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : link.page ? (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchorClick(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`ml-auto p-2 transition-colors lg:hidden ${
                transparentHeader
                  ? "text-white hover:text-gold"
                  : "text-slate-600 hover:text-navy"
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white shadow-xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <Image
                src={publicAsset("/logo_adelino_b_carvalho_transparente_2x.png")}
                alt="Adelino B. Carvalho Instalações Elétricas Lda"
                width={562}
                height={96}
                className="h-9 w-auto max-w-[210px] object-contain"
                unoptimized
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-navy"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex w-full flex-col gap-1 px-4 py-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : link.page ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchorClick(link.href);
                    }}
                    className="rounded-md px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
