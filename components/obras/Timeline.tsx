import { CalendarDays } from "lucide-react";
import type { EventoLineaTiempo } from "@/types/obra";
import { formatDate } from "@/lib/formatters";

export function Timeline({ events }: { events: EventoLineaTiempo[] }) {
  return <ol className="relative ml-3 border-l border-slate-200">{events.map((event) => <li key={event.id} className="relative ml-6 pb-7 last:pb-0"><span className="absolute -left-[2.15rem] grid size-4 place-items-center rounded-full border-4 border-white bg-blue-600" /><div className="flex flex-wrap items-center gap-2"><span className="badge bg-blue-50 text-blue-700">{event.tipo}</span><time className="flex items-center gap-1 text-xs text-slate-500"><CalendarDays size={13} />{formatDate(event.fecha)}</time>{event.evidenciaId && <span className="text-xs font-semibold text-emerald-700">Con evidencia</span>}</div><p className="mt-2 text-sm leading-6 text-slate-600">{event.descripcion}</p></li>)}</ol>;
}
