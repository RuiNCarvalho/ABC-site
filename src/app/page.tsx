import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { CompanyHistory } from "@/components/site/company-history";
import { TrustMetrics } from "@/components/site/trust-metrics";
import { Services } from "@/components/site/services";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CompanyHistory />
        <TrustMetrics />
        <Services />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
