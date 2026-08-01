import { analizarConGemma, GemmaServiceError } from "@/lib/gemma";

const MAX_TEXT_LENGTH = 8_000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { texto?: unknown };
    if (typeof body.texto !== "string" || body.texto.trim().length < 30) {
      return Response.json(
        { error: "Ingresa un texto de al menos 30 caracteres." },
        { status: 400 },
      );
    }
    if (body.texto.length > MAX_TEXT_LENGTH) {
      return Response.json(
        { error: `El texto no puede superar ${MAX_TEXT_LENGTH.toLocaleString("es-PE")} caracteres.` },
        { status: 400 },
      );
    }

    return Response.json(await analizarConGemma(body.texto.trim()));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "La solicitud no contiene JSON válido." }, { status: 400 });
    }
    if (error instanceof GemmaServiceError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("Error inesperado al solicitar un análisis a Gemma.");
    return Response.json({ error: "No se pudo completar el análisis." }, { status: 500 });
  }
}
