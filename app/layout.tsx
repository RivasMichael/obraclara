import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ObraClara | Obras públicas que sí se entienden", template: "%s | ObraClara" },
  description: "Consulta el avance de obras públicas del Perú con explicaciones claras y evidencia verificable.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col"><Header /><main className="flex-1">{children}</main><Footer /></body>
    </html>
  );
}
