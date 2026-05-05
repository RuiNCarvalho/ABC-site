"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { siteConfig, services } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(9, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  service: z.string().min(1, "Selecione um serviço"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/25 focus:border-navy/40 transition-all duration-200";

  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy/6 border border-navy/10 rounded-full text-xs font-semibold text-navy tracking-wide uppercase mb-4">
            Contacte-nos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-graphite leading-tight mb-4">
            Diga-nos o que precisa
          </h2>
          <p className="text-slate-600">
            Preencha o formulário e entraremos em contacto o mais rapidamente possível.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-semibold text-graphite mb-4 text-sm">Informações de contacto</h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy/8 flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition-all">
                    <Phone className="w-3.5 h-3.5 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Telefone</div>
                    <div className="text-sm font-medium text-graphite group-hover:text-navy transition-colors">
                      {siteConfig.phone}
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy/8 flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition-all">
                    <Mail className="w-3.5 h-3.5 text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Email</div>
                    <div className="text-sm font-medium text-graphite group-hover:text-navy transition-colors">
                      {siteConfig.email}
                    </div>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy/8 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-navy" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Localização</div>
                    <div className="text-sm font-medium text-graphite">
                      {siteConfig.address.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-6 text-white">
              <div className="text-sm font-semibold mb-1">Horário de atendimento</div>
              <div className="text-white/60 text-xs leading-relaxed">
                {siteConfig.businessHours}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                Para assuntos simples, o telefone continua a ser o caminho mais direto.
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-graphite mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Recebemos o seu pedido. Entraremos em contacto em breve.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-dark transition-colors"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Nome *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="O seu nome"
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Telefone *
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="+351 000 000 000"
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className={errorClass}>{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    placeholder="email@exemplo.pt"
                    type="email"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Serviço pretendido *
                  </label>
                  <select {...register("service")} className={inputClass}>
                    <option value="">Selecione um serviço</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Outro">Outro</option>
                  </select>
                  {errors.service && (
                    <p className={errorClass}>{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Mensagem *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Indique o espaço, localização e trabalho pretendido..."
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p className={errorClass}>{errors.message.message}</p>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Erro ao enviar mensagem. Tente novamente ou contacte por telefone.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-navy/20"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      A enviar...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar pedido
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400">
                  Os seus dados são usados exclusivamente para responder ao seu pedido.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
