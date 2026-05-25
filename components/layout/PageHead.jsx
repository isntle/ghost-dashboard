'use client'

import { useState } from 'react'
import { Verdict, Seg } from '@/lib/ui'

export default function PageHead({ report, totalInteractions }) {
  const [tab, setTab] = useState('Detalle');

  const headline   = report?.findings?.veredicto
    ?? 'El 82% de tus vendedores no está cerrando la venta.'
  const count      = totalInteractions ?? 217
  const generatedAt = report?.generated_at
    ? new Date(report.generated_at).toLocaleString('es-MX', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '22 mayo 2026 · 14:08'
  const grade      = report?.metrics?.calificacion
  const verdictTone = grade === 'A' || grade === 'B' ? 'good' : grade === 'C' ? 'warn' : 'bad'
  const verdictLabel = grade ? `Calificación ${grade}` : 'Atención requerida'

  return (
    <div className="flex items-end justify-between gap-6 pt-1.5">
      <div>
        <h1 className="m-0 text-[26px] font-semibold tracking-[-0.02em] leading-[1.15]">
          {headline}
        </h1>
        <div className="mt-1.5 text-muted text-[14px]">
          Auditoría sobre <b className="text-ink-2 font-medium">{count} interacciones</b> en los últimos 30 días ·
          Generado por IA el <b className="text-ink-2 font-medium">{generatedAt}</b>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Verdict tone={verdictTone}>{verdictLabel}</Verdict>
        <Seg options={['Resumen','Detalle','Comparar']} value={tab} onChange={setTab} />
      </div>
    </div>
  );
}
