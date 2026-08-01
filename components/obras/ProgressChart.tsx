"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PuntoAvance } from "@/types/obra";

export function ProgressChart({ data }: { data: PuntoAvance[] }) {
  return (
    <div className="h-72 w-full" role="img" aria-label="Gráfico de avance programado y ejecutado por mes">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="mes" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => [`${value}%`]} contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Line type="monotone" dataKey="programado" name="Programado" stroke="#2563EB" strokeWidth={3} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="ejecutado" name="Ejecutado" stroke="#0F9D78" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
