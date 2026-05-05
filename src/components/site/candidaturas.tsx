"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Check,
  Shield,
  Upload,
  FileText,
  X,
  HardHat,
  Award,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";

const MAX_FILE_MB = 5;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  city: z.string().min(2, "Cidade obrigatória"),
  message: z.string().optional(),
  _hp: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

const bullets = [
  { icon: Award, text: "Percurso sólido e trabalho exigente" },
  { icon: HardHat, text: "Trabalho de campo e aprendizagem contínua" },
  { icon: Users, text: "Ambiente de trabalho sério e próximo" },
  { icon: Clock, text: "Estabilidade e progressão profissional" },
];

export function Candidaturas() {
  const [status, setStatus] = useState<Status>("idle");
  const [notRobot, setNotRobot] = useState(false);
  const [notRobotError, setNotRobotError] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setCvError(`Ficheiro demasiado grande. Máximo ${MAX_FILE_MB}MB.`);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvError(null);
    setCvFile(file);
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormData) => {
    if (data._hp) return;
    if (!notRobot) { setNotRobotError(true); return; }
    setNotRobotError(false);
    setStatus("loading");

    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("phone", data.phone);
      fd.append("city", data.city);
      fd.append("message", data.message ?? "");
      if (cvFile) fd.append("cv", cvFile);

      const res = await fetch("/api/candidatura", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
      setCvFile(null);
      setNotRobot(false);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/25 focus:border-navy/40 transition-all duration-200";

  const errClass = "mt-1.5 text-xs text-red-500";

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* ── Left: motivational panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative order-2 flex flex-col justify-start overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-dark px-6 pt-12 pb-16 sm:px-8 sm:pt-14 lg:order-1 lg:px-16 lg:pt-20 lg:pb-24"
      >
        {/* Decorations */}
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
        {/* Watermark */}
        <div className="pointer-events-none absolute bottom-0 right-0 hidden select-none lg:block">
          <HardHat className="h-72 w-72 text-white/[0.03] xl:h-96 xl:w-96" strokeWidth={0.5} />
        </div>

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="h-3 w-3" />
            Trabalha connosco
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 h-px w-16 origin-left bg-gradient-to-r from-gold to-gold/0 lg:w-24"
          />

          <h1 className="mb-6 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
            Candidate-<span className="italic">se</span>
          </h1>

          <p className="mb-10 max-w-md text-[0.95rem] leading-relaxed text-white/70 sm:text-base lg:text-[1.05rem] lg:leading-[1.7]">
            Procuramos pessoas responsáveis, com vontade de aprender e gosto por
            trabalho bem feito. Valorizamos pontualidade, cuidado e atitude em obra.
          </p>

          <ul className="mb-10 flex flex-col gap-3.5">
            {bullets.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="group flex items-center gap-3.5"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-gold/20 transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-4.5 w-4.5 text-gold" />
                </div>
                <span className="text-[14px] text-white/75 sm:text-sm lg:text-[15px]">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="border-t border-white/10 pt-6 text-[12px] leading-relaxed text-white/40">
            Candidaturas analisadas com discrição e resposta individual.
          </div>
        </div>
      </motion.div>

      {/* ── Right: form ── */}
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
              <h2 className="mb-2 text-2xl font-bold text-graphite">Candidatura enviada</h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-500">
                Recebemos os seus dados. Vamos analisar o perfil e responder se
                houver enquadramento com as necessidades atuais.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark hover:shadow-md"
              >
                Nova candidatura
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex w-full max-w-md flex-col gap-4 lg:mx-0"
            >
              <div className="mb-2">
                <h2 className="mb-1.5 text-xl font-bold text-graphite lg:text-2xl">
                  Envie a sua candidatura
                </h2>
                <p className="text-[13px] text-slate-500">
                  Envie os seus dados e, se possível, anexe o currículo.
                </p>
              </div>

              {/* Honeypot */}
              <input
                {...register("_hp")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Nome <span className="text-gold-dark">*</span>
                </label>
                <input {...register("name")} placeholder="Nome completo" className={inputClass} />
                {errors.name && <p className={errClass}>{errors.name.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Email <span className="text-gold-dark">*</span>
                  </label>
                  <input {...register("email")} type="email" placeholder="email@exemplo.pt" className={inputClass} />
                  {errors.email && <p className={errClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Telemóvel <span className="text-gold-dark">*</span>
                  </label>
                  <input {...register("phone")} type="tel" placeholder="+351 000 000 000" className={inputClass} />
                  {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Cidade <span className="text-gold-dark">*</span>
                </label>
                <input {...register("city")} placeholder="Ex: Lisboa, Setúbal, Almada..." className={inputClass} />
                {errors.city && <p className={errClass}>{errors.city.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Mensagem <span className="font-normal normal-case tracking-normal text-slate-400">(opcional)</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="Apresentação breve, tipo de função pretendida, disponibilidade..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Currículo{" "}
                  <span className="font-normal normal-case tracking-normal text-slate-400">
                    (máx. {MAX_FILE_MB}MB · PDF, DOC, DOCX)
                  </span>
                </label>

                {cvFile ? (
                  <div className="flex items-center gap-3 rounded-xl border border-navy/20 bg-navy/5 px-4 py-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="flex-1 truncate text-sm font-medium text-navy">{cvFile.name}</span>
                    <span className="flex-shrink-0 text-xs text-slate-400">
                      {(cvFile.size / 1024 / 1024).toFixed(1)}MB
                    </span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex-shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-6 text-center transition-all duration-200 hover:border-navy/40 hover:bg-navy/3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-colors group-hover:bg-navy/10 group-hover:text-navy">
                      <Upload className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      Clique para selecionar ficheiro
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PDF, DOC ou DOCX · Máximo {MAX_FILE_MB}MB
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                {cvError && <p className={errClass}>{cvError}</p>}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => { setNotRobot(!notRobot); setNotRobotError(false); }}
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
                {notRobotError && <p className={errClass}>Por favor confirme que não é um robô</p>}
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  Erro ao enviar candidatura. Tente novamente ou envie-nos um email.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-navy to-navy-dark px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-xl hover:shadow-navy/25 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <span className="relative">Enviar candidatura</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                Os seus dados são utilizados exclusivamente para o processo de candidatura.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
