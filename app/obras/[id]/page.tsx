import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, Bot, Building, CalendarClock, CircleDollarSign, FileCheck2, Gauge, MapPin, Scale, TimerReset, UserRoundCog } from "lucide-react";
import { obras } from "@/data/obras";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { StatusBadge, AlertBadge } from "@/components/ui/badges";
import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressChart } from "@/components/obras/ProgressChart";
import { CitizenTechnicalTabs } from "@/components/obras/CitizenTechnicalTabs";
import { EvidenceSection } from "@/components/obras/EvidenceSection";
import { Timeline } from "@/components/obras/Timeline";
import { QuestionBox } from "@/components/obras/QuestionBox";
import { ShareButton } from "@/components/obras/ShareButton";

export function generateStaticParams() { return obras.map((obra) => ({ id: obra.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const obra = obras.find((item) => item.id === id);
  return obra ? { title: obra.nombre, description: `Avance y evidencia de la obra ${obra.codigo}. Datos de demostración.` } : {};
}

export default async function ObraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const obra = obras.find((item) => item.id === id);
  if (!obra) notFound();
  const difference = obra.avanceEjecutado - obra.avanceProgramado;

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-shell py-8 sm:py-10">
          <Link href="/obras" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft size={16}/> Volver al catálogo</Link>
          <div className="mt-6 flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
            <div className="max-w-4xl"><div className="flex flex-wrap gap-2"><StatusBadge status={obra.estado}/><AlertBadge level={obra.alerta}/><span className="badge bg-slate-100 text-slate-600">Dato de demostración</span></div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">CUI {obra.codigo}</p><h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#123B63] sm:text-4xl">{obra.nombre}</h1><p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><MapPin size={16}/> {obra.region}, {obra.provincia}, {obra.distrito}</p></div>
            <div className="flex flex-wrap gap-2"><ShareButton/><Link href="/analizar" className="btn-primary"><Bot size={17}/> Analizar actualización</Link></div>
          </div>
          <dl className="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="detail-label flex items-center gap-1.5"><Building size={15}/> Entidad responsable</dt><dd className="detail-value">{obra.entidad}</dd></div><div><dt className="detail-label flex items-center gap-1.5"><UserRoundCog size={15}/> Contratista</dt><dd className="detail-value">{obra.contratista}</dd></div><div><dt className="detail-label flex items-center gap-1.5"><CalendarClock size={15}/> Última actualización</dt><dd className="detail-value">{formatDate(obra.ultimaActualizacion)}</dd></div><div><dt className="detail-label flex items-center gap-1.5"><Scale size={15}/> Nivel de alerta</dt><dd className="detail-value">{obra.alerta}</dd></div></dl>
        </div>
      </section>

      <div className="container-shell py-10">
        <section aria-labelledby="metrics-title"><h2 id="metrics-title" className="sr-only">Métricas de la obra</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><MetricCard label="Presupuesto inicial" value={formatCurrency(obra.presupuestoInicial)} icon={CircleDollarSign}/><MetricCard label="Presupuesto actual" value={formatCurrency(obra.presupuestoActualizado)} icon={CircleDollarSign}/><MetricCard label="Avance programado" value={`${obra.avanceProgramado}%`} icon={Gauge}/><MetricCard label="Avance ejecutado" value={`${obra.avanceEjecutado}%`} icon={Gauge} tone="green"/><MetricCard label="Diferencia" value={`${difference > 0 ? "+" : ""}${difference} pp.`} icon={AlertTriangle} tone={difference < -10 ? "red" : "amber"}/><MetricCard label="Días de retraso" value={`${obra.diasRetraso}`} icon={TimerReset} tone={obra.diasRetraso > 30 ? "red" : "amber"}/></div></section>

        <div className="mt-7 grid gap-7 xl:grid-cols-[1.45fr_.55fr]">
          <section className="card p-5 sm:p-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><span className="eyebrow">Evolución mensual</span><h2 className="section-title mt-2 text-xl">Avance programado vs. ejecutado</h2></div><span className="text-sm font-bold text-red-600">{Math.abs(difference)} pp. de brecha</span></div><div className="mt-5"><ProgressChart data={obra.puntosAvance}/></div></section>

          <section className="card overflow-hidden border-blue-200">
            <div className="bg-[#123B63] p-5 text-white"><p className="flex items-center gap-2 text-sm font-bold text-blue-100"><Bot size={18}/> Explicación generada con Gemma 4</p><p className="mt-4 text-sm leading-6 text-white">{obra.analisis.resumenCiudadano}</p></div>
            <dl className="space-y-4 p-5 text-sm"><div><dt className="detail-label">Estado identificado</dt><dd className="detail-value">{obra.analisis.estado}</dd></div><div><dt className="detail-label">Causa registrada</dt><dd className="detail-value">{obra.analisis.causa}</dd></div><div><dt className="detail-label">Acción pendiente</dt><dd className="detail-value">{obra.analisis.accionPendiente}</dd></div><div className="flex justify-between gap-3 border-t border-slate-100 pt-4"><span className="text-xs text-slate-500">Confianza: {obra.analisis.confianza}</span><span className="text-xs text-slate-500">{formatDate(obra.analisis.fechaAnalisis)}</span></div><a href="#evidencias" className="btn-secondary w-full">Ver evidencia <FileCheck2 size={16}/></a><p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">Este resumen fue generado automáticamente a partir de documentos públicos. Verifica la evidencia original.</p></dl>
          </section>
        </div>

        <div className="mt-7"><CitizenTechnicalTabs obra={obra}/></div>

        <section className="mt-7 grid gap-5 md:grid-cols-2">
          <article className="card p-5 sm:p-6"><h2 className="flex items-center gap-2 text-xl font-bold text-[#123B63]"><AlertTriangle className="text-amber-600"/> ¿Por qué presenta retraso?</h2><p className="mt-4 leading-7 text-slate-600">{obra.causa}</p><a href="#evidencias" className="mt-4 inline-flex text-sm font-bold text-blue-600">Ver evidencia relacionada →</a></article>
          <article className="card p-5 sm:p-6"><h2 className="flex items-center gap-2 text-xl font-bold text-[#123B63]"><FileCheck2 className="text-blue-600"/> ¿Qué falta resolver?</h2><ul className="mt-4 space-y-3">{obra.accionesPendientes.map((action)=><li key={action} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600"/>{action}</li>)}</ul><a href="#evidencias" className="mt-4 inline-flex text-sm font-bold text-blue-600">Ver sustento documental →</a></article>
        </section>

        <section id="evidencias" className="mt-7 scroll-mt-24 card p-5 sm:p-6"><span className="eyebrow">Fuentes utilizadas</span><h2 className="section-title mt-2">Evidencias documentales</h2><p className="mb-6 mt-2 text-sm text-slate-600">Fragmentos simulados que permiten revisar cómo se sustentó cada conclusión.</p><EvidenceSection evidencias={obra.evidencias}/></section>

        <div className="mt-7 grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><section className="card p-5 sm:p-6"><span className="eyebrow">Historial</span><h2 className="section-title mb-7 mt-2">Línea de tiempo</h2><Timeline events={obra.timeline}/></section><QuestionBox obra={obra}/></div>
      </div>
    </>
  );
}
