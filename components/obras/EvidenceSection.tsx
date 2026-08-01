"use client";

import { ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Evidencia } from "@/types/obra";
import { formatDate } from "@/lib/formatters";

export function EvidenceSection({ evidencias }: { evidencias: Evidencia[] }) {
  const [selected, setSelected] = useState<Evidencia | null>(null);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [selected]);
  return (
    <>
      <div className="space-y-3">
        {evidencias.map((evidence) => (
          <article key={evidence.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2"><FileText size={17} className="text-blue-600" /><p className="font-bold text-[#123B63]">{evidence.tipo} {evidence.numero}</p>{evidence.simulada && <span className="badge bg-slate-100 text-slate-600">Dato simulado</span>}</div>
                <p className="mt-2 text-xs text-slate-500">{formatDate(evidence.fecha)} · {evidence.fuente}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">“{evidence.fragmento}”</p>
              </div>
              <button onClick={() => setSelected(evidence)} className="btn-secondary shrink-0 self-start">Ver evidencia <ExternalLink size={15} /></button>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40" role="presentation" onMouseDown={() => setSelected(null)}>
          <section role="dialog" aria-modal="true" aria-labelledby="evidence-title" onMouseDown={(e) => e.stopPropagation()} className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><span className="eyebrow">Evidencia documental</span><h2 id="evidence-title" className="mt-2 text-xl font-bold text-[#123B63]">{selected.tipo} {selected.numero}</h2></div><button autoFocus onClick={() => setSelected(null)} className="icon-button" aria-label="Cerrar evidencia"><X /></button></div>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-slate-500">Fecha</dt><dd className="mt-1 font-semibold">{formatDate(selected.fecha)}</dd></div><div><dt className="text-slate-500">Fuente</dt><dd className="mt-1 font-semibold">{selected.fuente}</dd></div></dl>
            <div className="mt-7 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Fragmento citado</p><p className="mt-3 leading-7 text-slate-700">“{selected.fragmento}”</p></div>
            <div className="mt-6"><p className="text-sm font-bold text-[#123B63]">Relación con la conclusión</p><p className="mt-2 text-sm leading-6 text-slate-600">{selected.relacion}</p></div>
            <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Esta evidencia es simulada para fines de demostración. En producción se enlazará al documento público original.</div>
          </section>
        </div>
      )}
    </>
  );
}
