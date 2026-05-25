import { Card, CardHead, cx } from '@/lib/ui'
import { channelMix as defaultData } from '@/lib/data'

export default function ChannelBreakdown({ data }) {
  const channelMix = data ?? defaultData
  return (
    <Card>
      <CardHead title="Resultado por canal" sub="distribución de status (217 contactos)" />
      <div className="px-[18px] pt-1 pb-[18px]">
        <div className="flex flex-col gap-3.5">
          {channelMix.map(ch => (
            <div key={ch.key} className="grid items-center gap-3.5" style={{gridTemplateColumns:'110px 1fr 80px'}}>
              <div className="flex items-center gap-2 text-[13.5px] text-ink-2">
                <div className={cx("w-6 h-6 rounded-md grid place-items-center text-[11px] font-semibold", ch.iconClass)}>{ch.icon}</div>
                {ch.label}
              </div>
              <div className="flex h-3 rounded bg-paper-warm overflow-hidden">
                <i className="block h-full bg-good" style={{width: `${ch.good}%`}} />
                <i className="block h-full bg-warn" style={{width: `${ch.warn}%`}} />
                <i className="block h-full bg-bad"  style={{width: `${ch.bad}%`}} />
                <i className="block h-full"         style={{width: `${ch.no}%`, background: '#D9D8CF'}} />
              </div>
              <div className="text-right mono text-[13px] text-ink font-medium">{ch.evals} evals</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3.5 mt-2.5 mono text-[10.5px] text-muted">
          {[['good','Respondió bien'],['warn','Respondió regular'],['bad','Respondió mal'],[null,'No respondió']].map(([k,t],i) => (
            <span key={i}>
              <i className={cx("inline-block w-2 h-2 rounded-sm mr-1.5 align-middle",
                k === 'good' ? 'bg-good' : k === 'warn' ? 'bg-warn' : k === 'bad' ? 'bg-bad' : '')}
                 style={!k ? {background:'#D9D8CF'} : {}} />
              {t}
            </span>
          ))}
        </div>

        <hr className="dash" />

        <div className="grid grid-cols-2 gap-3.5 pt-1">
          <div>
            <div className="mono text-[10.5px] text-muted tracking-wider uppercase">Persona más usada</div>
            <div className="flex items-center gap-2.5 mt-2">
              <div className="w-[26px] h-[26px] rounded-full grid place-items-center text-white text-[11px] font-semibold"
                   style={{background:'linear-gradient(135deg,#FFB17A,#C04D2E)'}}>CI</div>
              <div>
                <b className="font-medium text-[13px]">Cliente Inversor</b>
                <div className="mono text-[11px] text-muted">87 interacciones · score 5.8</div>
              </div>
            </div>
          </div>
          <div>
            <div className="mono text-[10.5px] text-muted tracking-wider uppercase">Horario crítico</div>
            <div className="flex items-center gap-2.5 mt-2">
              <div className="w-8 h-8 rounded-full bg-bad-tint text-bad grid place-items-center font-semibold mono">19h</div>
              <div>
                <b className="font-medium text-[13px]">19:00 – 21:00</b>
                <div className="mono text-[11px] text-muted">tasa respuesta 38%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
