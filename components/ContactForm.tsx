"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { sendContactMessage } from "@/lib/contact-action";
import { cn } from "@/utils/cn";

type FieldErrors = Partial<Record<keyof ContactFormData | "root", string>>;

const inputClass = cn(
  "w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-text-primary",
  "placeholder-text-muted/60",
  "focus:outline-none focus:border-blue-electric/60 focus:ring-1 focus:ring-blue-electric/20",
  "transition-all duration-150"
);

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as keyof ContactFormData] = i.message;
      });
      setErrors(errs);
      return;
    }

    setLoading(true);
    const result = await sendContactMessage(form);
    setLoading(false);

    if (result.success) {
      setSuccessMsg(result.message);
      setSuccess(true);
    } else {
      setErrors(result.errors);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-text-secondary text-sm">{successMsg}</p>
      </motion.div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-7 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Tu nombre completo"
            className={cn(inputClass, errors.name && "border-red-500/50 focus:border-red-400/60")}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="tu@correo.com"
            className={cn(inputClass, errors.email && "border-red-500/50 focus:border-red-400/60")}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">
          Asunto
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="¿Cómo podemos ayudarte?"
          className={cn(inputClass, errors.subject && "border-red-500/50")}
        />
        {errors.subject && (
          <p className="text-xs text-red-400 mt-1.5">{errors.subject}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">
          Mensaje
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Cuéntanos más sobre tu consulta..."
          className={cn(
            inputClass,
            "resize-none",
            errors.message && "border-red-500/50"
          )}
        />
        {errors.message && (
          <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-xs text-red-400">{errors.root}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensaje
          </>
        )}
      </button>
    </div>
  );
}
