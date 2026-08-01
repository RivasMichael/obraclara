import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return <div className="container-shell grid min-h-[65vh] place-items-center py-16 text-center"><div><span className="mx-auto grid size-20 place-items-center rounded-3xl bg-blue-50 text-blue-700"><SearchX size={38}/></span><p className="mt-6 text-sm font-bold text-blue-600">ERROR 404</p><h1 className="mt-2 text-3xl font-bold text-[#123B63]">No encontramos esta página</h1><p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">La obra o sección que buscas no existe, cambió de dirección o todavía no está disponible.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-secondary"><ArrowLeft size={16}/> Volver al inicio</Link><Link href="/obras" className="btn-primary">Explorar obras</Link></div></div></div>;
}
