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
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-navy flex flex-col justify-start px-8 pt-10 pb-16 sm:pt-12 lg:px-16 lg:pt-14 lg:pb-20 order-2 lg:order-1"
      >
        <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">
          Contactos
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Fale connosco
        </h1>

        <p className="text-white/65 leading-relaxed mb-10 max-w-md text-base">
          Conte-nos o que pretende fazer, em que tipo de espaço e com que
          prioridade. Assim conseguimos responder de forma mais útil.
        </p>

        <ul className="flex flex-col gap-4 mb-12">
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-[11px] text-white/35 mb-0.5">{label}</div>
                  <div className="text-sm font-medium text-white/75 leading-relaxed">
                    {value}
                  </div>
                </div>
              </>
            );

            return (
              <li key={label}>
                {href ? (
                  <a href={href} className="flex items-start gap-3 group">
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-3">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="border-t border-white/10 pt-6 text-xs text-white/35 leading-relaxed">
          Para assuntos simples, o telefone ou email pode ser o caminho mais direto.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-slate-50 flex flex-col justify-start px-6 pt-10 pb-12 sm:pt-12 lg:px-14 lg:pt-14 lg:pb-20 order-1 lg:order-2"
      >
        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-8 max-w-sm mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-graphite mb-2">
              Mensagem enviada!
            </h2>
            <p className="text-slate-500 text-sm mb-6">
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md w-full mx-auto lg:mx-0">
            <h2 className="text-xl font-bold text-graphite mb-1">
              Envie a sua mensagem
            </h2>
            <p className="text-slate-500 text-xs mb-2">
              Indique o essencial e voltamos ao contacto assim que possível.
            </p>

            <input
              {...register("_hp")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              aria-hidden="true"
            />

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
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Email *
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
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Assunto *
              </label>
              <input
                {...register("subject")}
                placeholder="Ex: Quadro elétrico para moradia"
                className={inputClass}
              />
              {errors.subject && (
                <p className={errorClass}>{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
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
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Mensagem *
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Descreva o espaço, o trabalho pretendido e a localização..."
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setNotRobot(!notRobot);
                  setNotRobotError(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 border rounded-xl transition-all duration-200 text-left ${
                  notRobotError
                    ? "border-red-300 bg-red-50"
                    : notRobot
                    ? "border-navy/30 bg-navy/4"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    notRobot ? "bg-navy border-navy" : "border-slate-300 bg-white"
                  }`}
                >
                  {notRobot && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm text-slate-700 flex-1">
                  Não sou um robô
                </span>
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <Shield className="w-5 h-5 text-slate-300" />
                  <span className="text-[9px] text-slate-300 leading-none">
                    Proteção
                  </span>
                </div>
              </button>
              {notRobotError && (
                <p className={errorClass}>Por favor confirme que não é um robô</p>
              )}
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Erro ao enviar. Tente novamente ou contacte por telefone.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-navy/20 text-sm"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A enviar...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar mensagem
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Os seus dados são usados exclusivamente para responder ao seu pedido.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
