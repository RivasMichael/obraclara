import type { ResultadoAnalisis } from "@/types/obra";

export async function analizarDocumento(texto: string): Promise<ResultadoAnalisis> {
  const response = await fetch("/api/analizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  const body = (await response.json().catch(() => null)) as
    | ResultadoAnalisis
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      body && "error" in body && body.error
        ? body.error
        : "Gemma no pudo completar el análisis.",
    );
  }

  return body as ResultadoAnalisis;
}
