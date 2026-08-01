import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Obra } from "@/types/obra";
import { formatCurrency } from "@/lib/formatters";
import { AlertBadge, StatusBadge } from "@/components/ui/badges";

export function ProjectCard({ obra }: { obra: Obra }) {
  const difference = obra.avanceEjecutado - obra.avanceProgramado;
  return (
    <article className="card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2"><StatusBadge status={obra.estado} /><AlertBadge level={obra.alerta} /></div>
      <p className="mt-5 text-xs font-semibold tracking-wide text-slate-500">CUI {obra.codigo}</p>
      <h3 className="mt-1 text-lg font-bold leading-6 text-[#123B63]">{obra.nombre}</h3>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-600"><MapPin size={15} /> {obra.region} · {obra.distrito}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-sm">
        <div><p className="text-xs text-slate-500">Avance real</p><p className="mt-1 text-xl font-bold text-[#123B63]">{obra.avanceEjecutado}%</p></div>
        <div><p className="text-xs text-slate-500">Presupuesto</p><p className="mt-1 font-bold text-slate-800">{formatCurrency(obra.presupuestoActualizado)}</p></div>
      </div>
      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0F9D78]" style={{ width: `${obra.avanceEjecutado}%` }} /></div>
        <p className={`mt-2 text-xs font-semibold ${difference < -10 ? "text-red-600" : difference < 0 ? "text-amber-700" : "text-emerald-700"}`}>
          {difference >= 0 ? "+" : ""}{difference} puntos frente a lo programado
        </p>
      </div>
      <Link className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800" href={`/obras/${obra.id}`}>Ver detalle <ArrowRight size={16} /></Link>
    </article>
  );
}
