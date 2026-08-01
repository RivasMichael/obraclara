"use client";

import { AlertCircle, CheckCircle2, FileSearch, LoaderCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { analizarDocumento } from "@/lib/api";
import type { ResultadoAnalisis } from "@/types/obra";

const example = "ASIENTO DE OBRA N.º 23 — 15/07/2026. La supervisión deja constancia de la demora en la aprobación del expediente técnico adicional. La entidad aún no emite respuesta sobre la documentación presentada, lo que afecta la ruta crítica del cronograma. Se solicita pronunciamiento para continuar con las partidas relacionadas.";

export function DocumentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ResultadoAnalisis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async () => {
    if (!text.trim()) { setError("Pega un fragmento del documento antes de analizar."); return; }
    if (text.trim().length < 30) { setError("Ingresa al menos 30 caracteres para obtener un análisis útil."); return; }
    setLoading(true); setError(""); setResult(null);
    try { setResult(await analizarDocumento(text)); } catch (cause) { setError(cause instanceof Error ? cause.message : "No pudimos completar el análisis. Inténtalo nuevamente."); } finally { setLoading(false); }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
      <section className="card p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold text-[#123B63]">Contenido del documento</h2><p className="mt-1 text-sm text-slate-500">No incluyas información personal sensible.</p></div><button onClick={() => { setText(example); setError(""); }} className="btn-ghost shrink-0 text-sm">Cargar ejemplo</button></div>
        <label htmlFor="document-text" className="sr-only">Texto del documento</label>
        <textarea id="document-text" value={text} maxLength={8000} onChange={(e) => setText(e.target.value)} className="mt-5 min-h-80 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" placeholder="Pega aquí un asiento de obra, informe de supervisión u otro fragmento técnico…" />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500"><span>Texto en español</span><span>{text.length.toLocaleString("es-PE")} / 8,000 caracteres</span></div>
        {error && <p role="alert" className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={17} />{error}</p>}
        <button onClick={() => void submit()} disabled={loading} className="btn-primary mt-5 w-full disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={18} /> : <Sparkles size={18} />}{loading ? "Gemma está revisando el texto…" : "Analizar con Gemma"}</button>
      </section>
      <section className="card min-h-96 p-5 sm:p-7" aria-live="polite">
        {!result && !loading && <div className="grid h-full min-h-96 place-items-center text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-600"><FileSearch size={30} /></span><h2 className="mt-5 text-lg font-bold text-[#123B63]">El resultado aparecerá aquí</h2><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">Identificaremos el estado, causa, acción pendiente y evidencia citada.</p></div></div>}
        {loading && <div className="space-y-5" aria-label="Analizando documento"><div className="skeleton h-8 w-2/3" /><div className="skeleton h-20 w-full" /><div className="skeleton h-24 w-full" /><div className="skeleton h-16 w-full" /></div>}
        {result && <div><div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 size={20} /><span className="text-sm font-bold">Análisis completado {result.es_simulado && "· Modo demostración"}</span></div><h2 className="mt-4 text-xl font-bold text-[#123B63]">Resultado estructurado</h2><dl className="mt-6 space-y-5"><div><dt className="detail-label">Estado identificado</dt><dd className="mt-2"><span className="badge bg-amber-50 text-amber-800">{result.estado}</span></dd></div><div><dt className="detail-label">Causa registrada</dt><dd className="detail-value">{result.causa}</dd></div><div><dt className="detail-label">Acción pendiente</dt><dd className="detail-value">{result.accion_pendiente}</dd></div><div className="rounded-xl bg-blue-50 p-4"><dt className="detail-label text-blue-700">Evidencia textual</dt><dd className="mt-2 text-sm italic leading-6 text-slate-700">“{result.evidencia_textual}”</dd></div><div><dt className="detail-label">Resumen ciudadano</dt><dd className="detail-value">{result.resumen_ciudadano}</dd></div></dl><p className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">Resultado automático de demostración. Debe verificarse siempre contra el documento público original.</p></div>}
      </section>
    </div>
  );
}
