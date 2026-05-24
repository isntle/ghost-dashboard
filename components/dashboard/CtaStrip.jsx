import { Btn } from '@/lib/ui'
import { Icons } from '@/lib/icons'

export default function CtaStrip() {
  const I = Icons;
  return (
    <>
      <div className="cta-strip border border-[#D9CFFF] rounded-lg2 shadow-card">
        <div className="flex items-center gap-6 px-5 py-[18px]">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] tracking-[0.14em] uppercase text-brand-ink px-1.5 py-0.5 bg-white border border-[#D9CFFF] rounded">Próximo paso</span>
              <span className="mono text-[11px] text-muted">premium · desde $4,990 MXN / mes</span>
            </div>
            <h3 className="m-0 mt-2 mb-1 text-[18px] font-semibold tracking-[-0.015em]">Convierte estos hallazgos en cambios reales.</h3>
            <p className="m-0 text-ink-2 text-[13.5px] max-w-[680px]" style={{textWrap:'pretty'}}>
              Monitoreo continuo, capacitación automática para tus vendedores con peor score y reportes mensuales firmados.
              {' '}<b>Pasa de &#34;saber&#34; a <i>resolver</i>.</b>
            </p>
          </div>
          <Btn variant="secondary">Agendar demo</Btn>
          <Btn variant="accent" iconRight={<I.ChevR w={14} />}>Activar Premium</Btn>
        </div>
      </div>
      <div className="flex justify-between text-muted text-[12px] py-1.5 px-1">
        <span>© 2026 Ghost Shopper · reporte generado automáticamente</span>
        <span className="mono text-muted-2">company_id: cv_8f3a2 · report_id: rep_2026-05-22</span>
      </div>
    </>
  );
}
