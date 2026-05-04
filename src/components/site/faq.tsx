"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/site";

export function Faq() {
  const featuredFaqs = faqs.slice(0, 3);

  return (
    <section id="faq" className="bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/6 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
              Perguntas frequentes
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-graphite sm:text-3xl">
              Dúvidas mais comuns
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">
              Algumas respostas rápidas antes de avançar com o seu pedido.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:bg-navy hover:text-white"
            >
              Enviar uma mensagem
            </Link>
          </div>

          <Accordion
            type="single"
            collapsible
            className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm divide-y divide-slate-100"
          >
            {featuredFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                className="border-none px-5"
              >
                <AccordionTrigger className="py-4 text-sm font-semibold text-graphite transition-colors hover:text-navy hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
