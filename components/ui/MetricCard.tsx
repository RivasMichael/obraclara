import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, note, icon: Icon, tone = "blue" }: { label: string; value: string; note?: string; icon: LucideIcon; tone?: "blue" | "green" | "amber" | "red" }) {
  const tones = { blue: "bg-blue-50 text-blue-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", red: "bg-red-50 text-red-700" };
  return <div className="card p-5"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-600">{label}</p><p className="mt-2 text-2xl font-bold text-[#123B63]">{value}</p>{note && <p className="mt-1 text-xs text-slate-500">{note}</p>}</div><span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={20} /></span></div></div>;
}
