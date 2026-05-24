import { Delta, cx } from '@/lib/ui'
import { Icons } from '@/lib/icons'

export default function KpiCards() {
  const I = Icons;

  const Spark = ({ d, stroke, fillId, withArea }) => (
    <svg className="absolute right-0 bottom-0 h-16 w-full pointer-events-none opacity-90" viewBox="0 0 400 80" preserveAspectRatio="none">
      {withArea && (
        <>
          <defs>
            <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity=".18" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${d} L400,80 L0,80 Z`} fill={`url(#${fillId})`} />
        </>
      )}
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );

  const KpiCard = ({ hero, label, icon, children, delta, deltaTone, deltaSub, spark }) => (
    <div className={cx(
      "relative overflow-hidden bg-paper-elev border border-line rounded-lg2 shadow-card p-[18px_20px]",
      hero && "kpi-hero border-line-strong"
    )}>
      <div className="flex items-center gap-2 text-muted text-[12px] font-medium tracking-wide uppercase">
        <span className="text-muted-2">{icon}</span>
        {label}
      </div>
      {children}
      {delta !== undefined && (
        <div className="inline-flex items-center gap-1 mt-3 text-[12.5px] text-muted">
          <Delta tone={deltaTone}>{delta}</Delta>
          <span className="ml-2">{deltaSub}</span>
        </div>
      )}
      {spark}
    </div>
  );

  return (
    <div className="grid gap-4" style={{gridTemplateColumns:'1.3fr 1fr 1fr 1fr'}}>
      <KpiCard hero label="Quality Score promedio" icon={<I.Star w={14} />}
        delta="▼ 1.4" deltaTone="bad"
        deltaSub="vs mes pasado · debajo del benchmark del sector (8.1)"
        spark={
          <Spark withArea fillId="hg" stroke="#DC2626"
            d="M0,28 L40,22 L80,34 L120,30 L160,42 L200,38 L240,50 L280,54 L320,58 L360,62 L400,66" />
        }>
        <div className="mt-3.5 flex items-baseline gap-1.5 leading-none">
          <span className="num text-[56px] font-semibold tracking-[-0.03em]">6.2</span>
          <span className="text-[22px] text-muted-2 font-medium">/ 10</span>
        </div>
        <div className="mt-4 h-2 w-full rounded-lg relative score-meter-bg">
          <div className="absolute -top-1 w-1 h-4 bg-ink rounded-sm" style={{left:'62%'}} />
        </div>
        <div className="flex justify-between mt-1.5 mono text-[10.5px] text-muted-2">
          <span>0</span><span>3</span><span>5</span><span>7</span><span>10</span>
        </div>
      </KpiCard>

      <KpiCard label="Tiempo de respuesta" icon={<I.Clock w={14} />}
        delta="▲ 41%" deltaTone="bad" deltaSub="objetivo: < 5 min"
        spark={<Spark stroke="#D97706" d="M0,55 L33,52 L66,48 L99,50 L132,42 L165,40 L198,32 L231,30 L264,24 L297,28 L330,20 L363,18 L400,12" />}>
        <div className="mt-3.5 flex items-baseline gap-1.5 leading-none">
          <span className="num text-[38px] font-semibold tracking-[-0.03em]">8</span>
          <span className="text-[16px] text-muted font-medium">m</span>
          <span className="num text-[38px] font-semibold tracking-[-0.03em] ml-1.5">32</span>
          <span className="text-[16px] text-muted font-medium">s</span>
        </div>
      </KpiCard>

      <KpiCard label="Tasa de respuesta" icon={<I.Plane w={14} />}
        delta="▼ 8 pts" deltaTone="warn" deltaSub="139 de 217 contactos"
        spark={<Spark stroke="#D97706" d="M0,30 L40,28 L80,36 L120,30 L160,40 L200,38 L240,46 L280,40 L320,48 L360,42 L400,50" />}>
        <div className="mt-3.5 flex items-baseline gap-1.5 leading-none">
          <span className="num text-[38px] font-semibold tracking-[-0.03em]">64</span>
          <span className="text-[16px] text-muted font-medium">%</span>
        </div>
      </KpiCard>

      <KpiCard label="Intento de cierre" icon={<I.Tick w={14} />}
        delta="▼ 12 pts" deltaTone="bad" deltaSub="solo 39 de 217"
        spark={<Spark stroke="#DC2626" d="M0,22 L40,30 L80,28 L120,38 L160,34 L200,46 L240,48 L280,56 L320,54 L360,62 L400,68" />}>
        <div className="mt-3.5 flex items-baseline gap-1.5 leading-none">
          <span className="num text-[38px] font-semibold tracking-[-0.03em]">18</span>
          <span className="text-[16px] text-muted font-medium">%</span>
        </div>
      </KpiCard>
    </div>
  );
}
