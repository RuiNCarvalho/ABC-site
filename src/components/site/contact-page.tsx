"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Check,
  Shield,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { siteConfig, services } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  service: z.string().optional(),
  _hp: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

const contactItems = [
  {
    icon: Phone,
    label: "Telefone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Portugal",
  },
  {
    icon: Clock,
    label: "Horário",
    value: siteConfig.businessHours,
  },
];

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [notRobot, setNotRobot] = useState(false);
  const [notRobotError, setNotRobotError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (data._hp) return;

    if (!notRobot) {
      setNotRobotError(true);
      return;
    }

    setNotRobotError(false);
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: "",
          service: data.service ?? "",
          message: `Assunto: ${data.subject}\n\n${data.message}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
      setNotRobot(false);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/25 focus:border-navy/40 transition-all duration-200";

  const errorClass = "mt-1.5 text-xs text-red-500";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative order-2 flex flex-col justify-start overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-dark px-6 pt-12 pb-16 sm:px-8 sm:pt-14 lg:order-1 lg:px-16 lg:pt-20 lg:pb-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.18)_60%,rgba(0,0,0,0.5)_100%)]" />
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl lg:h-96 lg:w-96" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-navy-light/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.06] mix-blend-overlay lg:block"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="pointer-events-none absolute bottom-0 right-0 hidden select-none lg:block">
          <MessageSquare className="h-72 w-72 text-white/[0.03] xl:h-96 xl:w-96" strokeWidth={0.5} />
        </div>

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="h-3 w-3" />
            Contactos
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 h-px w-16 origin-left bg-gradient-to-r from-gold to-gold/0 lg:w-24"
          />

          <h1 className="mb-6 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
            Fale <span className="italic">connosco</span>
          </h1>

          <p className="mb-10 max-w-md text-[0.95rem] leading-relaxed text-white/70 sm:text-base lg:text-[1.05rem] lg:leading-[1.7]">
            Conte-nos o que pretende fazer, em que tipo de espaço e com que
            prioridade. Assim conseguimos responder de forma mais útil.
          </p>

          <ul className="mb-10 flex flex-col gap-3.5">
            {contactItems.map(({ icon: Icon, label, value, href }, i) => {
              const content = (
                <>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-gold/20 transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-4.5 w-4.5 text-gold" />
                  </div>
                  <div>
                    <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      {label}
                    </div>
                    <div className="text-[14px] font-medium leading-relaxed text-white/85 transition-colors group-hover:text-gold sm:text-sm lg:text-[15px]">
                      {value}
                    </div>
                  </div>
                </>
              );

              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  {href ? (
                    <a href={href} className="group flex items-start gap-3.5">
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-3.5">{content}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>

          <div className="border-t border-white/10 pt-6 text-[12px] leading-relaxed text-white/40">
            Para assuntos simples, o telefone ou email pode ser o caminho mais direto.
          </div>
        </div>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative order-1 flex flex-col justify-start overflow-hidden bg-gradient-to-b from-slate-50 to-white px-5 pt-10 pb-12 sm:px-6 sm:pt-12 lg:order-2 lg:px-14 lg:pt-20 lg:pb-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />

        <div className="relative w-full">
          {status === "success" ? (
            <div className="mx-auto flex max-w-sm flex-col items-center py-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 ring-4 ring-green-100">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-graphite">Mensagem enviada</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-500">
                Recebemos o seu pedido. Entraremos em contacto em breve.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark hover:shadow-md"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex w-full max-w-md flex-col gap-4 lg:mx-0"
            >
              <div className="mb-2">
                <h2 className="mb-1.5 text-xl font-bold text-graphite lg:text-2xl">
                  Envie a sua mensagem
                </h2>
                <p className="text-[13px] text-slate-500">
                  Indique o essencial e voltamos ao contacto assim que possível.
                </p>
              </div>

              <input
                {...register("_hp")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Nome <span className="text-gold-dark">*</span>
                  </label>
                  <input {...register("name")} placeholder="O seu nome" className={inputClass} />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Email <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email@exemplo.pt"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Assunto <span className="text-gold-dark">*</span>
                </label>
                <input
                  {...register("subject")}
                  placeholder="Ex: Quadro elétrico para moradia"
                  className={inputClass}
                />
                {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Serviço pretendido
                </label>
                <select {...register("service")} className={inputClass}>
                  <option value="">Selecione um serviço (opcional)</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Mensagem <span className="text-gold-dark">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Descreva o espaço, o trabalho pretendido e a localização..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setNotRobot(!notRobot);
                    setNotRobotError(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                    notRobotError
                      ? "border-red-300 bg-red-50"
                      : notRobot
                      ? "border-navy/30 bg-navy/4"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
                      notRobot ? "border-navy bg-navy" : "border-slate-300 bg-white"
                    }`}
                  >
                    {notRobot && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="flex-1 text-sm text-slate-700">Não sou um robô</span>
                  <div className="flex flex-shrink-0 flex-col items-center gap-0.5">
                    <Shield className="h-5 w-5 text-slate-300" />
                    <span className="text-[9px] leading-none text-slate-300">Proteção</span>
                  </div>
                </button>
                {notRobotError && (
                  <p className={errorClass}>Por favor confirme que não é um robô</p>
                )}
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  Erro ao enviar. Tente novamente ou contacte por telefone.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-navy to-navy-dark px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-xl hover:shadow-navy/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {status === "loading" ? (
                  <>
                    <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="relative">A enviar...</span>
                  </>
                ) : (
                  <>
                    <Send className="relative h-4 w-4" />
                    <span className="relative">Enviar mensagem</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                Os seus dados são usados exclusivamente para responder ao seu pedido.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
