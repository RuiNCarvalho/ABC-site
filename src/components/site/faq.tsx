"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/site";

export function Faq() {
  const featuredFaqs = faqs.slice(0, 4);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-navy/5 backdrop-blur-sm sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:p-10"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy">
              <MessageCircleQuestion className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="mb-4 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-graphite sm:text-3xl lg:text-[2.1rem]">
              Antes de avançar
            </h2>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-slate-600 sm:text-base">
              Respostas curtas para perceber melhor como começamos cada pedido.
              Se ficar com alguma dúvida, fale connosco.
            </p>

            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy-dark hover:shadow-md"
            >
              Enviar uma mensagem
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                {featuredFaqs.length} perguntas
              </span>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            {featuredFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                className="border-b border-slate-100 px-5 last:border-b-0 sm:px-6"
              >
                <AccordionTrigger className="py-5 text-left text-[14px] font-semibold text-graphite transition-colors hover:text-navy hover:no-underline sm:text-sm">
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                      0{i + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-9 text-[13.5px] leading-relaxed text-slate-600 sm:text-sm">
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
