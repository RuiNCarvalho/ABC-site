import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { publicAsset } from "@/lib/public-asset";

const quickLinks = [
  { href: "#empresa", label: "A Empresa" },
  { href: "#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/candidaturas", label: "Candidaturas" },
  { href: "#faq", label: "Perguntas Frequentes" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.1fr]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src={publicAsset("/logo_adelino_b_carvalho_transparente_2x.png")}
                alt="Adelino B. Carvalho Instalações Elétricas Lda"
                width={562}
                height={96}
                className="h-10 w-auto object-contain brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Empresa constituída em 2002, com experiência acumulada em
              instalações elétricas em Portugal.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">
              Links rápidos
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-3.5">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 group"
              >
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-white/62 group-hover:text-gold transition-colors">
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 group"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-white/62 group-hover:text-gold transition-colors">
                  {siteConfig.email}
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-white/62">
                  {siteConfig.address.country}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/62 leading-relaxed">
                  {siteConfig.businessHours}
                </span>
              </div>
              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-fit rounded-md bg-white p-1.5 transition-transform hover:-translate-y-0.5"
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
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/30">
            © {currentYear} Adelino B. Carvalho Instalações Elétricas Lda. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/20">
            Empresa constituída em 2002 · NIPC: xxxxxxxx
          </p>
        </div>
      </div>
    </footer>
  );
}
