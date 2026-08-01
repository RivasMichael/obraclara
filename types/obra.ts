export type EstadoObra = "En ejecución" | "Retrasada" | "Paralizada" | "Finalizada";
export type NivelAlerta = "Bajo" | "Medio" | "Alto" | "Crítico";

export interface Evidencia {
  id: string;
  tipo: string;
  numero: string;
  fecha: string;
  fragmento: string;
  fuente: string;
  relacion: string;
  simulada: boolean;
}

export interface EventoLineaTiempo {
  id: string;
  fecha: string;
  tipo: string;
  descripcion: string;
  evidenciaId?: string;
}

export interface PuntoAvance {
  mes: string;
  programado: number;
  ejecutado: number;
}

export interface AnalisisGemma {
  estado: EstadoObra;
  causa: string;
  accionPendiente: string;
  evidenciaTextual: string;
  resumenCiudadano: string;
  confianza: "Alta" | "Media" | "Requiere verificación";
  fechaAnalisis: string;
}

export interface Obra {
  id: string;
  nombre: string;
  codigo: string;
  region: string;
  provincia: string;
  distrito: string;
  entidad: string;
  contratista: string;
  estado: EstadoObra;
  alerta: NivelAlerta;
  presupuestoInicial: number;
  presupuestoActualizado: number;
  avanceProgramado: number;
  avanceEjecutado: number;
  diasRetraso: number;
  ultimaActualizacion: string;
  causa: string;
  latitud: number;
  longitud: number;
  coordenadasSimuladas: boolean;
  datosSimulados: boolean;
  accionesPendientes: string[];
  detalleTecnico: {
    asiento: string;
    documento: string;
    incidencia: string;
    descripcion: string;
  };
  puntosAvance: PuntoAvance[];
  evidencias: Evidencia[];
  timeline: EventoLineaTiempo[];
  analisis: AnalisisGemma;
}

export interface ResultadoAnalisis {
  estado: string;
  causa: string;
  accion_pendiente: string;
  evidencia_textual: string;
  resumen_ciudadano: string;
  es_simulado?: boolean;
  modelo?: string;
}
