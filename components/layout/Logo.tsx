import Link from "next/link";
import { Building2 } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
      <span className="grid size-10 place-items-center rounded-xl bg-[#123B63] text-white">
        <Building2 size={21} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-lg font-bold leading-5 tracking-tight text-[#123B63]">Obra<span className="text-blue-600">Clara</span></span>
        {!compact && <span className="hidden text-[10px] font-medium text-slate-500 sm:block">Información pública que sí se entiende</span>}
      </span>
    </Link>
  );
}
