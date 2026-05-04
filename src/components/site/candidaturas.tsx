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
  { icon: Award, text: "Mais de 50 anos de experiência no setor" },
  { icon: HardHat, text: "Equipa técnica qualificada e certificada" },
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
        className="bg-navy flex flex-col justify-start px-8 pt-10 pb-16 sm:pt-12 lg:px-16 lg:pt-14 lg:pb-20 order-2 lg:order-1"
      >
        <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">
          Trabalha connosco
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Candidate-se
        </h1>

        <p className="text-white/65 leading-relaxed mb-10 max-w-md text-base">
          Procuramos profissionais com rigor, vontade de crescer e gosto pelo trabalho
          bem feito. Junte-se a uma empresa com{" "}
          <span className="text-gold font-semibold">mais de 50 anos</span> de
          experiência no setor elétrico em Portugal.
        </p>

        <ul className="flex flex-col gap-4 mb-12">
          {bullets.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <span className="text-white/70 text-sm">{text}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 pt-6 text-xs text-white/35 leading-relaxed">
          Empresa constituída em 2002 · Desde 1974 no setor elétrico
        </div>
      </motion.div>

      {/* ── Right: form ── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-slate-50 flex flex-col justify-start px-6 pt-10 pb-12 sm:pt-12 lg:px-14 lg:pt-14 lg:pb-20 order-1 lg:order-2"
      >
        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-8 max-w-sm mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-graphite mb-2">Candidatura enviada!</h2>
            <p className="text-slate-500 text-sm mb-6">
              Recebemos a sua candidatura. Analisamos com atenção e entramos em contacto
              se o perfil corresponder às nossas necessidades.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-dark transition-colors"
            >
              Nova candidatura
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md w-full mx-auto lg:mx-0">
            <h2 className="text-xl font-bold text-graphite mb-1">Envie a sua candidatura</h2>
            <p className="text-slate-500 text-xs mb-2">
              Preencha o formulário e anexe o seu currículo.
            </p>

            {/* Honeypot */}
            <input
              {...register("_hp")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              aria-hidden="true"
            />

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Nome *</label>
              <input {...register("name")} placeholder="Nome completo" className={inputClass} />
              {errors.name && <p className={errClass}>{errors.name.message}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Email *</label>
                <input {...register("email")} type="email" placeholder="email@exemplo.pt" className={inputClass} />
                {errors.email && <p className={errClass}>{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Telemóvel *</label>
                <input {...register("phone")} type="tel" placeholder="+351 000 000 000" className={inputClass} />
                {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Cidade *</label>
              <input {...register("city")} placeholder="Ex: Lisboa, Setúbal, Almada..." className={inputClass} />
              {errors.city && <p className={errClass}>{errors.city.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Mensagem <span className="text-slate-400">(opcional)</span>
              </label>
              <textarea
                {...register("message")}
                rows={3}
                placeholder="Apresentação breve, tipo de função pretendida, disponibilidade..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Currículo <span className="text-slate-400">(máx. {MAX_FILE_MB}MB · PDF, DOC, DOCX)</span>
              </label>

              {cvFile ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-navy/5 border border-navy/20 rounded-xl">
                  <FileText className="w-4 h-4 text-navy flex-shrink-0" />
                  <span className="text-sm text-navy font-medium flex-1 truncate">{cvFile.name}</span>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {(cvFile.size / 1024 / 1024).toFixed(1)}MB
                  </span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 px-4 py-5 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-navy/30 hover:bg-navy/3 transition-all duration-200 text-center">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-500 font-medium">Clique para selecionar ficheiro</span>
                  <span className="text-xs text-slate-400">PDF, DOC ou DOCX · Máximo {MAX_FILE_MB}MB</span>
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

            {/* Anti-bot */}
            <div>
              <button
                type="button"
                onClick={() => { setNotRobot(!notRobot); setNotRobotError(false); }}
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
                <span className="text-sm text-slate-700 flex-1">Não sou um robô</span>
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <Shield className="w-5 h-5 text-slate-300" />
                  <span className="text-[9px] text-slate-300 leading-none">Proteção</span>
                </div>
              </button>
              {notRobotError && <p className={errClass}>Por favor confirme que não é um robô</p>}
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Erro ao enviar candidatura. Tente novamente ou envie-nos um email.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-navy/20 text-sm mt-1"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A enviar...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar candidatura
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Os seus dados são utilizados exclusivamente para o processo de candidatura.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
