import type { Metadata } from "next";
import { Catalog } from "@/components/obras/Catalog";

export const metadata: Metadata = { title: "Explorar obras públicas", description: "Busca y filtra obras públicas por estado, región, avance y presupuesto." };

type Params = { buscar?: string | string[]; estado?: string | string[]; region?: string | string[]; orden?: string | string[] };
const single = (value?: string | string[]) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export default async function ObrasPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const sort = single(params.orden);
  return <div className="container-shell py-12 sm:py-16"><span className="eyebrow">Catálogo nacional · Demo</span><h1 className="mt-4 text-3xl font-bold tracking-tight text-[#123B63] sm:text-4xl">Explorar obras públicas</h1><p className="mb-8 mt-3 max-w-2xl text-slate-600">Consulta por nombre, código o ubicación. Todos los registros mostrados son datos simulados.</p><Catalog initialSearch={single(params.buscar)} initialStatus={single(params.estado)} initialRegion={single(params.region)} initialSort={["presupuesto","avance","nombre"].includes(sort) ? sort as "presupuesto"|"avance"|"nombre" : "retraso"} /></div>;
}
