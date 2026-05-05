import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortfolioPage } from "@/components/site/portfolio-page";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Veja uma seleção de trabalhos elétricos realizados em contextos residenciais, comerciais e técnicos.",
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
