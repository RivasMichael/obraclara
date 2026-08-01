import type { Obra } from "@/types/obra";

const progress = (finalProgramado: number, finalEjecutado: number) =>
  ["Feb", "Mar", "Abr", "May", "Jun", "Jul"].map((mes, index) => ({
    mes,
    programado: Math.round((finalProgramado / 6) * (index + 1)),
    ejecutado: Math.round((finalEjecutado / 6) * (index + 1)),
  }));

function createObra(
  base: Omit<Obra, "puntosAvance" | "evidencias" | "timeline" | "analisis" | "detalleTecnico" | "accionesPendientes" | "coordenadasSimuladas" | "datosSimulados">,
): Obra {
  const evidenciaId = `${base.id}-e1`;
  return {
    ...base,
    coordenadasSimuladas: true,
    datosSimulados: true,
    accionesPendientes: [
      base.estado === "Finalizada"
        ? "Completar la liquidación y el cierre documental."
        : "La entidad debe emitir una respuesta sobre el expediente presentado.",
      "Actualizar el cronograma de ejecución y comunicarlo a la supervisión.",
    ],
    detalleTecnico: {
      asiento: "Asiento de obra N.º 23",
      documento: "Informe de supervisión N.º 014-2026",
      incidencia: "Afectación de ruta crítica",
      descripcion: base.causa,
    },
    puntosAvance: progress(base.avanceProgramado, base.avanceEjecutado),
    evidencias: [
      {
        id: evidenciaId,
        tipo: "Asiento de obra",
        numero: "N.º 23",
        fecha: "2026-07-15",
        fragmento: `${base.causa} Se deja constancia de que la respuesta de la entidad se encuentra pendiente.`,
        fuente: "Cuaderno de obra digital",
        relacion: "Sustenta la causa registrada y la acción pendiente indicada en el resumen.",
        simulada: true,
      },
      {
        id: `${base.id}-e2`,
        tipo: "Informe de supervisión",
        numero: "N.º 014-2026",
        fecha: "2026-07-22",
        fragmento: `El avance ejecutado es ${base.avanceEjecutado}%, frente al ${base.avanceProgramado}% programado.`,
        fuente: "Supervisión de obra",
        relacion: "Sustenta la diferencia entre el avance programado y el ejecutado.",
        simulada: true,
      },
    ],
    timeline: [
      { id: "t1", fecha: "2026-02-03", tipo: "Inicio", descripcion: "Inicio contractual de la ejecución de obra." },
      { id: "t2", fecha: "2026-03-10", tipo: "Valorización", descripcion: "Primera valorización aprobada." },
      { id: "t3", fecha: "2026-05-28", tipo: "Solicitud", descripcion: "Solicitud de expediente técnico adicional.", evidenciaId },
      { id: "t4", fecha: "2026-06-18", tipo: "Incidencia", descripcion: "Se registra afectación del cronograma.", evidenciaId },
      { id: "t5", fecha: "2026-07-15", tipo: "Pendiente", descripcion: "Respuesta de la entidad pendiente.", evidenciaId },
      { id: "t6", fecha: base.ultimaActualizacion, tipo: "Actualización", descripcion: "Última actualización del seguimiento." },
    ],
    analisis: {
      estado: base.estado,
      causa: base.causa,
      accionPendiente:
        base.estado === "Finalizada"
          ? "Completar el cierre documental."
          : "La entidad debe emitir una respuesta sobre el expediente presentado.",
      evidenciaTextual: `Asiento de obra N.º 23, registrado el 15/07/2026.`,
      resumenCiudadano:
        base.estado === "Finalizada"
          ? "La obra alcanzó el avance físico previsto. Aún corresponde completar su cierre documental."
          : `La obra tiene ${base.avanceEjecutado}% de avance real frente al ${base.avanceProgramado}% previsto. El documento revisado registra una demora vinculada a una decisión técnica pendiente.`,
      confianza: "Media",
      fechaAnalisis: "2026-07-25",
    },
  };
}

export const obras: Obra[] = [
  createObra({
    id: "ie-san-martin-cusco", nombre: "Mejoramiento del servicio educativo de la I.E. San Martín",
    codigo: "2458127", region: "Cusco", provincia: "Cusco", distrito: "San Sebastián",
    entidad: "Municipalidad Distrital de San Sebastián", contratista: "Consorcio Educativo Andino",
    estado: "Retrasada", alerta: "Alto", presupuestoInicial: 12800000, presupuestoActualizado: 13950000,
    avanceProgramado: 70, avanceEjecutado: 48, diasRetraso: 45, ultimaActualizacion: "2026-07-24",
    causa: "Demora en la aprobación del expediente técnico adicional.",
    latitud: -13.5300, longitud: -71.9360,
  }),
  createObra({
    id: "centro-salud-piura", nombre: "Ampliación del centro de salud de Castilla",
    codigo: "2519074", region: "Piura", provincia: "Piura", distrito: "Castilla",
    entidad: "Gobierno Regional de Piura", contratista: "Consorcio Salud Norte",
    estado: "Paralizada", alerta: "Crítico", presupuestoInicial: 22400000, presupuestoActualizado: 25700000,
    avanceProgramado: 62, avanceEjecutado: 31, diasRetraso: 92, ultimaActualizacion: "2026-07-20",
    causa: "Suspensión temporal por interferencias de redes sanitarias no previstas.",
    latitud: -5.2016, longitud: -80.6225,
  }),
  createObra({
    id: "puente-mantaro", nombre: "Rehabilitación del puente vial sobre el río Mantaro",
    codigo: "2496331", region: "Junín", provincia: "Huancayo", distrito: "Pilcomayo",
    entidad: "Provías Descentralizado", contratista: "Infraestructura Centro S.A.C.",
    estado: "En ejecución", alerta: "Medio", presupuestoInicial: 18400000, presupuestoActualizado: 19100000,
    avanceProgramado: 58, avanceEjecutado: 54, diasRetraso: 8, ultimaActualizacion: "2026-07-26",
    causa: "Reprogramación preventiva por incremento temporal del caudal.",
    latitud: -12.0470, longitud: -75.2500,
  }),
  createObra({
    id: "agua-la-esperanza", nombre: "Mejoramiento del sistema de agua potable de La Esperanza",
    codigo: "2471059", region: "La Libertad", provincia: "Trujillo", distrito: "La Esperanza",
    entidad: "Municipalidad Distrital de La Esperanza", contratista: "Consorcio Agua Segura",
    estado: "Retrasada", alerta: "Alto", presupuestoInicial: 31600000, presupuestoActualizado: 34200000,
    avanceProgramado: 81, avanceEjecutado: 63, diasRetraso: 38, ultimaActualizacion: "2026-07-21",
    causa: "Liberación incompleta de áreas para el tendido de redes.",
    latitud: -8.0794, longitud: -79.0452,
  }),
  createObra({
    id: "colegio-villa-el-salvador", nombre: "Reconstrucción de la I.E. República del Perú",
    codigo: "2534820", region: "Lima", provincia: "Lima", distrito: "Villa El Salvador",
    entidad: "Programa Nacional de Infraestructura Educativa", contratista: "Constructora Horizonte",
    estado: "Finalizada", alerta: "Bajo", presupuestoInicial: 9800000, presupuestoActualizado: 10200000,
    avanceProgramado: 100, avanceEjecutado: 100, diasRetraso: 0, ultimaActualizacion: "2026-07-18",
    causa: "Ejecución física concluida; liquidación contractual en trámite.",
    latitud: -12.2133, longitud: -76.9370,
  }),
  createObra({
    id: "via-characato", nombre: "Mejoramiento de la vía vecinal Characato–Mollebaya",
    codigo: "2507742", region: "Arequipa", provincia: "Arequipa", distrito: "Characato",
    entidad: "Gobierno Regional de Arequipa", contratista: "Vías del Sur S.A.C.",
    estado: "En ejecución", alerta: "Bajo", presupuestoInicial: 15600000, presupuestoActualizado: 15950000,
    avanceProgramado: 46, avanceEjecutado: 44, diasRetraso: 3, ultimaActualizacion: "2026-07-27",
    causa: "Ajuste menor del calendario por mantenimiento de maquinaria.",
    latitud: -16.4686, longitud: -71.4843,
  }),
];

export const regiones = [...new Set(obras.map((obra) => obra.region))].sort();
export const obraPrincipal = obras[0];
