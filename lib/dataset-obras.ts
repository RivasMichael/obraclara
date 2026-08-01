import path from "node:path";
import { SaxesParser } from "saxes";
import * as unzipper from "unzipper";
import type { DatasetObra } from "@/types/dataset-obra";

const DATASET_PATH = path.join(process.cwd(), "data", "dataset.xlsx");
const SHEET_PATH = "xl/worksheets/sheet1.xml";

const departmentCenters: Record<string, [number, number]> = {
  AMAZONAS: [-6.23, -77.87], ANCASH: [-9.53, -77.53], APURIMAC: [-13.63, -72.88],
  AREQUIPA: [-16.40, -71.54], AYACUCHO: [-13.16, -74.22], CAJAMARCA: [-7.16, -78.51],
  CALLAO: [-12.06, -77.12], CUSCO: [-13.52, -71.97], HUANCAVELICA: [-12.79, -74.97],
  HUANUCO: [-9.93, -76.24], ICA: [-14.07, -75.73], JUNIN: [-12.07, -75.21],
  "LA LIBERTAD": [-8.11, -79.03], LAMBAYEQUE: [-6.77, -79.84], LIMA: [-12.05, -77.04],
  LORETO: [-3.75, -73.25], "MADRE DE DIOS": [-12.59, -69.19], MOQUEGUA: [-17.19, -70.94],
  PASCO: [-10.68, -76.26], PIURA: [-5.19, -80.63], PUNO: [-15.84, -70.02],
  "SAN MARTIN": [-6.49, -76.36], TACNA: [-18.01, -70.25], TUMBES: [-3.57, -80.46],
  UCAYALI: [-8.38, -74.55],
};

let cachedDataset: Promise<DatasetObra[]> | undefined;

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

function parseNumber(value: string): number | null {
  const normalized = value.trim().replace(/\s+(?=\d{1,2}$)/, ".").replace(/[^\d.-]/g, "");
  if (!normalized) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function simulatedCoordinates(department: string, seed: string): [number, number] {
  const center = departmentCenters[normalize(department).toUpperCase()] ?? [-9.19, -75.02];
  let hash = 2166136261;
  for (const character of seed) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const latitudeOffset = (((hash >>> 0) % 1401) - 700) / 1000;
  const longitudeOffset = ((((hash >>> 11) >>> 0) % 1401) - 700) / 1000;
  return [center[0] + latitudeOffset, center[1] + longitudeOffset];
}

function createRecord(headerIndexes: Map<string, number>, values: string[], index: number): DatasetObra | null {
  const get = (header: string) => {
    const column = headerIndexes.get(normalize(header));
    return column === undefined ? "" : values[column]?.trim() ?? "";
  };
  const nombre = get("Nombre de obra");
  const codigoInfobras = get("Código INFOBRAS");
  if (!nombre || !codigoInfobras) return null;

  const estado = get("Estado de ejecución");
  if (estado !== "En Ejecución" && estado !== "Paralizada") return null;

  const departamento = get("Departamento");
  const provincia = get("Provincia");
  const distrito = get("Distrito");
  const cui = get("Codigo unico de inversión");
  const [latitud, longitud] = simulatedCoordinates(
    departamento,
    `${provincia}|${distrito}|${codigoInfobras}`,
  );
  const causa =
    get("Causal de paralización") ||
    get("Motivo en caso no se llegue al 100%") ||
    get("Comentarios") ||
    "No consta una causa en el registro.";

  return {
    id: `${codigoInfobras}-${index}`,
    nombre,
    codigoInfobras,
    cui: cui || "No registrado",
    entidad: get("Entidad Pública") || "No registrada",
    estado,
    departamento: departamento || "No registrado",
    provincia: provincia || "No registrada",
    distrito: distrito || "No registrado",
    direccion: get("Dirección o información de referencia") || "No registrada",
    presupuesto:
      parseNumber(get("Costo de la obra en soles")) ??
      parseNumber(get("Costo Actualizado de la inversión")) ??
      parseNumber(get("Costo de obra en soles según ET en soles")),
    avanceProgramado: parseNumber(get("Avance Físico Programado Acumulado (%)")),
    avanceEjecutado: parseNumber(get("Avance Físico Real Acumulado (%)")),
    diasRetraso:
      parseNumber(get("Número de dias paralizado")) ??
      parseNumber(get("N° días de modificaciones de plazo")),
    causa,
    comentarios: get("Comentarios") || "Sin comentarios registrados",
    ultimaActualizacion:
      get("Fecha de registro de avance") || get("Fecha de finalización real") || "No registrada",
    latitud,
    longitud,
    coordenadasSimuladas: true,
    fuente: "INFOBRAS (dataset.xlsx)",
  };
}

async function readDataset(): Promise<DatasetObra[]> {
  const archive = await unzipper.Open.file(DATASET_PATH);
  const sheet = archive.files.find((entry) => entry.path === SHEET_PATH);
  if (!sheet) throw new Error("El Excel no contiene la hoja esperada Sheet1.");

  return new Promise((resolve, reject) => {
    const records: DatasetObra[] = [];
    let rowNumber = 0;
    let headerIndexes = new Map<string, number>();
    let currentRow: string[] | null = null;
    let currentValue = "";
    let readingValue = false;
    const parser = new SaxesParser();

    parser.on("opentag", (tag) => {
      if (tag.name === "x:row") currentRow = [];
      if (tag.name === "x:v") {
        readingValue = true;
        currentValue = "";
      }
    });
    parser.on("text", (text) => {
      if (readingValue) currentValue += text;
    });
    parser.on("closetag", (tag) => {
      if (tag.name === "x:v") {
        readingValue = false;
        currentRow?.push(currentValue);
      }
      if (tag.name === "x:row" && currentRow) {
        rowNumber += 1;
        if (rowNumber === 4) {
          headerIndexes = new Map(currentRow.map((header, column) => [normalize(header), column]));
        }
        if (rowNumber > 4) {
          const record = createRecord(headerIndexes, currentRow, rowNumber - 4);
          if (record) records.push(record);
        }
        currentRow = null;
      }
    });
    parser.on("error", reject);

    const stream = sheet.stream();
    stream.setEncoding("utf8");
    stream.on("data", (chunk: string) => parser.write(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      try {
        parser.close();
        resolve(records);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export function loadDatasetObras(): Promise<DatasetObra[]> {
  cachedDataset ??= readDataset().catch((error) => {
    cachedDataset = undefined;
    throw error;
  });
  return cachedDataset;
}
