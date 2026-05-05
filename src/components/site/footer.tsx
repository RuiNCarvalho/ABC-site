import { ExternalLink, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { publicAsset } from "@/lib/public-asset";

const COPYRIGHT_YEAR = 2026;

type QuickLink = {
  href: string;
  label: string;
  external?: boolean;
};

const quickLinks: QuickLink[] = [
  { href: "#empresa", label: "A Empresa" },
  { href: "#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/candidaturas", label: "Candidaturas" },
  { href: "#faq", label: "Perguntas Frequentes" },
  { href: "/contacto", label: "Contacto" },
  {
    href: "https://ruincarvalho.github.io/Trited/",
    label: "Trited",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-navy/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.15fr_0.75fr_1.1fr] lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Image
                src={publicAsset("/logo_adelino_b_carvalho_transparente_2x.png")}
                alt="Adelino B. Carvalho Instalações Elétricas Lda"
                width={562}
                height={96}
                className="h-11 w-auto object-contain brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-white/55 sm:text-sm">
              Empresa constituída em 2002, com experiência acumulada em
              instalações elétricas em Portugal.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold/90">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Desde 1974
              </span>
            </div>

            <a
              href="https://ruincarvalho.github.io/Trited/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex max-w-sm items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-[13px] font-semibold text-white/70 transition-colors hover:border-gold/30 hover:bg-white/[0.07] hover:text-gold"
            >
              Empresa associada: Trited
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
              Links rápidos
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1 sm:gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/55 transition-colors hover:text-gold sm:text-sm"
                    >
                      <span className="h-px w-2 bg-gold/0 transition-all duration-200 group-hover:w-3 group-hover:bg-gold" />
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/55 transition-colors hover:text-gold sm:text-sm"
                    >
                      <span className="h-px w-2 bg-gold/0 transition-all duration-200 group-hover:w-3 group-hover:bg-gold" />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/55 transition-colors hover:text-gold sm:text-sm"
                    >
                      <span className="h-px w-2 bg-gold/0 transition-all duration-200 group-hover:w-3 group-hover:bg-gold" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
              Contacto
            </h4>
            <div className="flex flex-col gap-3.5">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-gold/15 group-hover:ring-gold/25">
                  <Phone className="h-4 w-4 text-gold" />
                </span>
                <span className="text-[13.5px] text-white/65 transition-colors group-hover:text-gold sm:text-sm">
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-gold/15 group-hover:ring-gold/25">
                  <Mail className="h-4 w-4 text-gold" />
                </span>
                <span className="break-all text-[13.5px] text-white/65 transition-colors group-hover:text-gold sm:text-sm">
                  {siteConfig.email}
                </span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-4 w-4 text-gold" />
                </span>
                <span className="text-[13.5px] text-white/65 sm:text-sm">
                  {siteConfig.address.country}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Clock className="h-4 w-4 text-gold" />
                </span>
                <span className="pt-1.5 text-[13.5px] leading-snug text-white/65 sm:text-sm">
                  {siteConfig.businessHours}
                </span>
              </div>

              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-fit rounded-md bg-white p-1.5 transition-transform hover:-translate-y-0.5"
                aria-label="Abrir Livro de Reclamações Eletrónico"
              >
                <Image
                  src={publicAsset("/livro-reclamacoes.svg")}
                  alt="Livro de Reclamações Eletrónico"
                  width={180}
                  height={56}
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-[11px] text-white/35">
            © {COPYRIGHT_YEAR} Adelino B. Carvalho Instalações Elétricas Lda. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/25">
            Empresa constituída em 2002 · Livro de Reclamações Eletrónico disponível
          </p>
        </div>
      </div>
    </footer>
  );
}
