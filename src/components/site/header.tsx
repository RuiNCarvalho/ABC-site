"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { publicAsset } from "@/lib/public-asset";

const navLinks = [
  { href: "#empresa", label: "Empresa", page: false },
  { href: "#servicos", label: "Serviços", page: false },
  { href: "/portfolio", label: "Portfólio", page: true },
  { href: "/candidaturas", label: "Candidaturas", page: true },
  { href: "/contacto", label: "Contacto", page: true },
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
  const linkClass = `px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
    transparentHeader
      ? "text-white/88 hover:text-white hover:bg-white/10"
      : "text-slate-600 hover:text-navy hover:bg-slate-50"
  }`;

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHome ? "bg-transparent" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex min-w-0 items-center">
              <Image
                src={publicAsset("/logo_adelino_b_carvalho_transparente_2x.png")}
                alt="Adelino B. Carvalho Instalações Elétricas Lda"
                width={562}
                height={96}
                className={`h-9 w-auto max-w-[190px] object-contain sm:h-10 sm:max-w-none ${
                  transparentHeader ? "brightness-0 invert" : ""
                }`}
                priority
                unoptimized
              />
            </Link>

            <nav className="ml-auto hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.page ? (
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
            className="fixed top-16 left-0 right-0 z-40 border-b border-slate-100 bg-white shadow-lg lg:hidden"
          >
            <div className="flex w-full flex-col gap-1 px-4 py-4">
              {navLinks.map((link) =>
                link.page ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
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
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
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
