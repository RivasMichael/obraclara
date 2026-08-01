export interface DatasetObra {
  id: string;
  nombre: string;
  codigoInfobras: string;
  cui: string;
  entidad: string;
  estado: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  presupuesto: number | null;
  avanceProgramado: number | null;
  avanceEjecutado: number | null;
  diasRetraso: number | null;
  causa: string;
  comentarios: string;
  ultimaActualizacion: string;
  latitud: number;
  longitud: number;
  coordenadasSimuladas: true;
  fuente: "INFOBRAS (dataset.xlsx)";
}
