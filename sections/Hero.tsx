"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-electric/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-glow/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] rounded-full bg-violet-deep/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <Badge variant="cyan" className="gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                Diagnóstico inteligente OBD2
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Tu vehículo,{" "}
              <span className="relative">
                <span className="gradient-text">sin secretos.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-electric to-cyan-glow origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
            >
              MecaGuard conecta tu smartphone con el cerebro de tu auto.
              Diagnóstico profesional, lectura de fallas y monitoreo en tiempo
              real desde la palma de tu mano.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/planes"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200"
              >
                Comenzar gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/funciones"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-text-secondary border border-border hover:border-border-light hover:text-text-primary hover:bg-surface-2 transition-all duration-200"
              >
                Ver funciones
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { label: "Vehículos compatibles", value: "+10,000" },
                { label: "Códigos DTC", value: "+3,500" },
                { label: "Satisfacción", value: "98%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative animate-float">
              {/* Phone mockup */}
              <div className="relative w-[280px] sm:w-[320px]">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-blue-electric/20 blur-[60px] rounded-full scale-75" />

                {/* Phone frame */}
                <div className="relative glass-card rounded-[40px] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(45,127,255,0.15)]">
                  {/* Screen */}
                  <div className="relative bg-surface rounded-[32px] overflow-hidden aspect-[9/19]">
                    {/* Status bar */}
                    <div className="px-6 pt-3 pb-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-text-muted">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-1.5 rounded-sm border border-text-muted/40">
                          <div className="w-2/3 h-full bg-cyan-glow/80 rounded-sm" />
                        </div>
                      </div>
                    </div>

                    {/* App UI */}
                    <div className="px-4 pb-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-[10px] text-text-muted font-mono">DIAGNÓSTICO</div>
                          <div className="font-display text-sm font-bold gradient-text-blue">
                            MecaGuard
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-electric to-cyan-glow flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Status card */}
                      <div className="bg-surface-2 rounded-2xl p-3 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wide">
                            Estado del motor
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] text-emerald-400 font-mono">OK</span>
                          </div>
                        </div>

                        {/* Gauge */}
                        <div className="relative flex items-center justify-center py-3">
                          <svg viewBox="0 0 100 60" className="w-full max-w-[140px]">
                            <path
                              d="M 10 55 A 40 40 0 0 1 90 55"
                              fill="none"
                              stroke="#1E2235"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 10 55 A 40 40 0 0 1 90 55"
                              fill="none"
                              stroke="url(#gaugeGrad)"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray="125"
                              strokeDashoffset="35"
                            />
                            <defs>
                              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2D7FFF" />
                                <stop offset="100%" stopColor="#00D4FF" />
                              </linearGradient>
                            </defs>
                            <text x="50" y="52" textAnchor="middle" fill="#F0F2FF" fontSize="12" fontWeight="700">
                              94%
                            </text>
                          </svg>
                        </div>
                      </div>

                      {/* Sensor pills */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "RPM", value: "850", unit: "", color: "blue" },
                          { label: "Temp.", value: "92°", unit: "C", color: "cyan" },
                          { label: "O2", value: "0.45", unit: "V", color: "violet" },
                          { label: "MAP", value: "101", unit: "kPa", color: "blue" },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="bg-surface-2/80 border border-border rounded-xl p-2"
                          >
                            <div className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">
                              {s.label}
                            </div>
                            <div className="font-mono text-xs font-bold text-text-primary">
                              {s.value}
                              <span className="text-text-muted font-normal ml-0.5 text-[9px]">
                                {s.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Scan line effect */}
                      <div className="relative bg-surface-2/50 border border-emerald-500/20 rounded-xl p-2 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent scan-line" />
                        <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-emerald-400" />
                          <span className="text-[9px] font-mono text-emerald-400">
                            Sin códigos de falla activos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="flex items-center justify-center pt-2 pb-1">
                    <div className="w-20 h-1 rounded-full bg-text-muted/30" />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-20 glass-card rounded-2xl p-3 shadow-card border border-blue-electric/20 hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-electric/15 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-bright" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-text-primary">P0420</div>
                    <div className="text-[9px] text-text-muted">Catalítico banco 1</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-10 bottom-24 glass-card rounded-2xl p-3 shadow-card border border-cyan-glow/20 hidden sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-text-primary">
                    Conectado · OBD2
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-blue-electric/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
