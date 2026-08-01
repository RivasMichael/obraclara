import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><Logo /><p className="mt-4 max-w-md text-sm leading-6 text-slate-600">Seguimiento ciudadano de obras públicas con explicaciones claras y evidencia verificable.</p></div>
        <div><p className="text-sm font-semibold text-[#123B63]">Navegación</p><div className="mt-3 flex flex-col gap-2 text-sm text-slate-600"><Link href="/">Inicio</Link><Link href="/obras">Explorar obras</Link><Link href="/analizar">Analizar documento</Link></div></div>
        <div className="text-sm leading-6 text-slate-600"><p>Información de demostración, únicamente referencial.</p><p className="mt-2 font-semibold text-[#123B63]">Desarrollado para Build with Gemma</p></div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} ObraClara. MVP de demostración.</div>
    </footer>
  );
}
