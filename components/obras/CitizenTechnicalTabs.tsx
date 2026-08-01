"use client";

import { useState } from "react";
import type { Obra } from "@/types/obra";

export function CitizenTechnicalTabs({ obra }: { obra: Obra }) {
  const [tab, setTab] = useState<"citizen" | "technical">("citizen");
  return (
    <section className="card p-5 sm:p-6">
      <div role="tablist" aria-label="Tipo de explicación" className="flex rounded-xl bg-slate-100 p-1">
        <button role="tab" aria-selected={tab === "citizen"} onClick={() => setTab("citizen")} className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${tab === "citizen" ? "bg-white text-[#123B63] shadow-sm" : "text-slate-600"}`}>Explicación ciudadana</button>
        <button role="tab" aria-selected={tab === "technical"} onClick={() => setTab("technical")} className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${tab === "technical" ? "bg-white text-[#123B63] shadow-sm" : "text-slate-600"}`}>Vista técnica</button>
      </div>
      <div className="mt-6" role="tabpanel">
        {tab === "citizen" ? <><h2 className="section-title text-xl">En palabras sencillas</h2><p className="mt-3 leading-7 text-slate-600">{obra.analisis.resumenCiudadano}</p></> :
          <dl className="grid gap-5 sm:grid-cols-2"><div><dt className="detail-label">Asiento</dt><dd className="detail-value">{obra.detalleTecnico.asiento}</dd></div><div><dt className="detail-label">Documento</dt><dd className="detail-value">{obra.detalleTecnico.documento}</dd></div><div><dt className="detail-label">Tipo de incidencia</dt><dd className="detail-value">{obra.detalleTecnico.incidencia}</dd></div><div><dt className="detail-label">Descripción original</dt><dd className="detail-value">{obra.detalleTecnico.descripcion}</dd></div></dl>}
      </div>
    </section>
  );
}
