import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Candidaturas } from "@/components/site/candidaturas";

export const metadata: Metadata = {
  title: "Candidaturas",
  description:
    "Junte-se à equipa da Adelino B. Carvalho Instalações Elétricas Lda. Empresa com mais de 50 anos de experiência no setor elétrico.",
};

export default function CandidaturasPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Candidaturas />
      </main>
      <Footer />
    </>
  );
}
