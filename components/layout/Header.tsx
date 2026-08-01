"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/obras", label: "Explorar obras" },
  { href: "/analizar", label: "Analizar documento" },
  { href: "/#como-funciona", label: "Cómo funciona" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-18 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className={`nav-link ${pathname === link.href ? "text-[#123B63]" : ""}`}>{link.label}</Link>
          ))}
        </nav>
        <Link href="/obras" className="btn-primary hidden lg:inline-flex"><Search size={17} /> Buscar obra</Link>
        <button className="icon-button lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden" aria-label="Navegación móvil">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="nav-link">{link.label}</Link>)}
            <Link href="/obras" onClick={() => setOpen(false)} className="btn-primary mt-2"><Search size={17} /> Buscar obra</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
