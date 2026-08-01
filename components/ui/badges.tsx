import type { EstadoObra, NivelAlerta } from "@/types/obra";

const statusStyles: Record<EstadoObra, string> = {
  "En ejecución": "bg-blue-50 text-blue-700 ring-blue-200",
  Retrasada: "bg-amber-50 text-amber-800 ring-amber-200",
  Paralizada: "bg-red-50 text-red-700 ring-red-200",
  Finalizada: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const alertStyles: Record<NivelAlerta, string> = {
  Bajo: "bg-emerald-50 text-emerald-700",
  Medio: "bg-amber-50 text-amber-800",
  Alto: "bg-orange-50 text-orange-700",
  Crítico: "bg-red-50 text-red-700",
};

export function StatusBadge({ status }: { status: EstadoObra }) {
  return <span className={`badge ring-1 ring-inset ${statusStyles[status]}`}>{status}</span>;
}

export function AlertBadge({ level }: { level: NivelAlerta }) {
  return <span className={`badge ${alertStyles[level]}`}>Alerta {level.toLowerCase()}</span>;
}
