import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto com a Adelino B. Carvalho Instalações Elétricas Lda. Pedidos de orçamento e informações sobre instalações elétricas.",
};

export default function Contacto() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
