import type { Metadata } from "next";
import { Bot, LockKeyhole } from "lucide-react";
import { DocumentAnalyzer } from "@/components/analysis/DocumentAnalyzer";

export const metadata: Metadata = { title: "Analizar documento", description: "Demostración de análisis ciudadano de documentos de obra con Gemma." };

export default function AnalizarPage() {
  return <div className="container-shell py-12 sm:py-16"><div className="max-w-3xl"><span className="eyebrow"><Bot size={14}/> Demostración con Gemma 4</span><h1 className="mt-4 text-3xl font-bold tracking-tight text-[#123B63] sm:text-4xl">Analiza un documento de obra</h1><p className="mt-4 text-lg leading-8 text-slate-600">Pega un fragmento técnico y obtén una explicación estructurada, comprensible y vinculada a la evidencia textual.</p><p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><LockKeyhole size={16}/> Las claves de Gemma permanecen exclusivamente en el backend.</p></div><div className="mt-9"><DocumentAnalyzer/></div></div>;
}
