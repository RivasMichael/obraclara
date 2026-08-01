"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({ initialValue = "", compact = false }: { initialValue?: string; compact?: boolean }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("buscar", value.trim());
    router.push(`/obras${params.size ? `?${params.toString()}` : ""}`);
  };
  return (
    <form onSubmit={submit} role="search" className={`flex w-full gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm ${compact ? "" : "max-w-2xl"}`}>
      <label htmlFor={compact ? "catalog-search" : "hero-search"} className="sr-only">Buscar por nombre, código o ubicación</label>
      <Search className="ml-2 self-center text-slate-400" size={20} aria-hidden="true" />
      <input id={compact ? "catalog-search" : "hero-search"} value={value} onChange={(e) => setValue(e.target.value)} className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-slate-400 sm:text-base" placeholder="Nombre, código, región o distrito" />
      <button className="btn-primary shrink-0" type="submit"><Search size={17} className="sm:hidden" /><span className="hidden sm:inline">Buscar</span></button>
    </form>
  );
}
