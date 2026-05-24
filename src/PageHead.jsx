import { useState } from 'react'
import { Verdict, Seg } from './ui'

export default function PageHead() {
  const [tab, setTab] = useState('Detalle');
  return (
    <div className="flex items-end justify-between gap-6 pt-1.5">
      <div>
        <h1 className="m-0 text-[26px] font-semibold tracking-[-0.02em] leading-[1.15]">
          El 82% de tus vendedores no está cerrando la venta.
        </h1>
        <div className="mt-1.5 text-muted text-[14px]">
          Auditoría sobre <b className="text-ink-2 font-medium">217 interacciones</b> en los últimos 30 días ·
          Generado por IA el <b className="text-ink-2 font-medium">22 mayo 2026 · 14:08</b>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Verdict tone="bad">Atención requerida</Verdict>
        <Seg options={['Resumen','Detalle','Comparar']} value={tab} onChange={setTab} />
      </div>
    </div>
  );
}
