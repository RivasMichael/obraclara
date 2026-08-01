"use client";

import { CornerDownLeft, LoaderCircle, MessageSquareText, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Obra } from "@/types/obra";

const suggestions = ["¿Por qué está retrasada?", "¿Qué entidad debe responder?", "¿Cuál fue el último acontecimiento?", "¿Qué evidencia respalda el estado?"];

export function QuestionBox({ obra }: { obra: Obra }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = async (event?: FormEvent, preset?: string) => {
    event?.preventDefault();
    const current = preset ?? question;
    if (!current.trim()) return;
    setQuestion(current); setLoading(true); setAnswer("");
    await new Promise((resolve) => setTimeout(resolve, 900));
    const lower = current.toLowerCase();
    const response = lower.includes("entidad") ? `La entidad responsable registrada es ${obra.entidad}.` : lower.includes("último") ? `El último acontecimiento registrado es: ${obra.timeline.at(-1)?.descripcion}` : lower.includes("evidencia") ? `El estado se sustenta en ${obra.evidencias[0].tipo} ${obra.evidencias[0].numero}, del ${obra.evidencias[0].fecha}.` : `${obra.causa} La acción registrada como pendiente es: ${obra.accionesPendientes[0]}`;
    setAnswer(response); setLoading(false);
  };
  return (
    <section className="card overflow-hidden">
      <div className="border-b border-slate-100 bg-[#123B63] p-5 text-white sm:p-6"><div className="flex items-center gap-2"><MessageSquareText size={22} /><h2 className="text-xl font-bold">Pregúntale a ObraClara</h2></div><p className="mt-2 text-sm text-blue-100">Responde únicamente con la información disponible de esta obra.</p></div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">{suggestions.map((item) => <button key={item} onClick={() => void ask(undefined, item)} className="rounded-full border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700">{item}</button>)}</div>
        <form onSubmit={ask} className="mt-5 flex gap-2"><label htmlFor="question" className="sr-only">Pregunta sobre esta obra</label><input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="field min-w-0 flex-1" placeholder="Escribe una pregunta sobre esta obra" /><button disabled={loading || !question.trim()} className="icon-button bg-blue-600 text-white disabled:opacity-50" aria-label="Enviar pregunta"><CornerDownLeft size={18} /></button></form>
        {loading && <div className="mt-5 flex items-center gap-2 text-sm text-slate-500"><LoaderCircle className="animate-spin" size={18} /> Revisando la información de la obra…</div>}
        {answer && <div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="flex gap-3"><ShieldCheck className="shrink-0 text-emerald-600" size={20} /><p className="text-sm leading-6 text-slate-700">{answer}</p></div></div>}
      </div>
    </section>
  );
}
