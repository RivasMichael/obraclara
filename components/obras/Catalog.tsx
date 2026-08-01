"use client";

import { RotateCcw, SearchX, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { obras, regiones } from "@/data/obras";
import { normalizeText } from "@/lib/formatters";
import type { EstadoObra } from "@/types/obra";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProjectCard } from "./ProjectCard";

type Sort = "retraso" | "presupuesto" | "avance" | "nombre";

export function Catalog({ initialSearch = "", initialStatus = "", initialRegion = "", initialSort = "retraso" }: { initialSearch?: string; initialStatus?: string; initialRegion?: string; initialSort?: Sort }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [region, setRegion] = useState(initialRegion);
  const [sort, setSort] = useState<Sort>(initialSort);

  const update = (nextStatus: string, nextRegion: string, nextSort: Sort) => {
    setStatus(nextStatus); setRegion(nextRegion); setSort(nextSort);
    const params = new URLSearchParams();
    if (initialSearch) params.set("buscar", initialSearch);
    if (nextStatus) params.set("estado", nextStatus);
    if (nextRegion) params.set("region", nextRegion);
    if (nextSort !== "retraso") params.set("orden", nextSort);
    router.replace(`/obras${params.size ? `?${params}` : ""}`, { scroll: false });
  };

  const results = useMemo(() => {
    const query = normalizeText(initialSearch);
    return obras.filter((obra) => {
      const haystack = normalizeText([obra.nombre, obra.codigo, obra.region, obra.provincia, obra.distrito].join(" "));
      return (!query || haystack.includes(query)) && (!status || obra.estado === status) && (!region || obra.region === region);
    }).sort((a, b) => sort === "presupuesto" ? b.presupuestoActualizado - a.presupuestoActualizado : sort === "avance" ? b.avanceEjecutado - a.avanceEjecutado : sort === "nombre" ? a.nombre.localeCompare(b.nombre) : b.diasRetraso - a.diasRetraso);
  }, [initialSearch, region, sort, status]);

  const clear = () => { setStatus(""); setRegion(""); setSort("retraso"); router.replace("/obras"); };
  return (
    <>
      <SearchBar initialValue={initialSearch} compact />
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#123B63]"><SlidersHorizontal size={18} /> Filtrar y ordenar</div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="field-label">Estado<select value={status} onChange={(e) => update(e.target.value, region, sort)} className="field"><option value="">Todas</option>{(["En ejecución", "Retrasada", "Paralizada", "Finalizada"] satisfies EstadoObra[]).map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="field-label">Región<select value={region} onChange={(e) => update(status, e.target.value, sort)} className="field"><option value="">Todas las regiones</option>{regiones.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="field-label">Ordenar por<select value={sort} onChange={(e) => update(status, region, e.target.value as Sort)} className="field"><option value="retraso">Mayor retraso</option><option value="presupuesto">Mayor presupuesto</option><option value="avance">Mayor avance</option><option value="nombre">Nombre</option></select></label>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-between gap-4"><p className="text-sm text-slate-600"><strong className="text-[#123B63]">{results.length}</strong> {results.length === 1 ? "obra encontrada" : "obras encontradas"}</p><button onClick={clear} className="btn-ghost text-sm"><RotateCcw size={15} /> Limpiar filtros</button></div>
      {results.length ? <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.map((obra) => <ProjectCard obra={obra} key={obra.id} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><SearchX className="mx-auto text-slate-400" size={36} /><h2 className="mt-4 text-lg font-bold text-[#123B63]">No encontramos coincidencias</h2><p className="mt-2 text-sm text-slate-600">Prueba con otro nombre, código o elimina alguno de los filtros.</p><button onClick={clear} className="btn-secondary mt-5">Limpiar filtros</button></div>}
    </>
  );
}
