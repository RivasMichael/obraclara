"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: location.href });
      else await navigator.clipboard.writeText(location.href);
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    } catch { /* El usuario puede cancelar el panel nativo. */ }
  };
  return <button onClick={share} className="btn-secondary">{copied ? <Check size={16} /> : <Share2 size={16} />}{copied ? "Enlace copiado" : "Compartir"}</button>;
}
