"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeMagicLinkSignIn } from "@/lib/firebase";
import { Zap } from "lucide-react";

export default function MagicLinkPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    completeMagicLinkSignIn(window.location.href)
      .then(() => router.push("/dashboard"))
      .catch((err: any) => setError(err.message ?? "Link inválido o expirado."));
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-electric/10 border border-blue-electric/20 flex items-center justify-center mx-auto">
          <Zap className={`w-7 h-7 text-blue-electric ${!error ? "animate-pulse" : ""}`}/>
        </div>
        {!error ? <p className="text-sm text-text-secondary">Verificando tu link...</p> : (
          <><p className="text-sm text-red-400">{error}</p><a href="/login" className="text-xs text-blue-electric hover:underline">Volver al login</a></>
        )}
      </div>
    </div>
  );
}