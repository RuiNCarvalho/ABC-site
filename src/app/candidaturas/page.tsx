import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Candidaturas } from "@/components/site/candidaturas";

export const metadata: Metadata = {
  title: "Candidaturas",
  description:
    "Envie a sua candidatura para integrar uma equipa técnica ligada a obras elétricas em Portugal.",
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
