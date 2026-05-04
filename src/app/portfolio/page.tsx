import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortfolioPage } from "@/components/site/portfolio-page";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Conheça alguns projetos realizados pela Adelino B. Carvalho Instalações Elétricas Lda.",
};

export default function PortfolioRoute() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
}
