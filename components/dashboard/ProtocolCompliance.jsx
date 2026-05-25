'use client'

import { useState } from 'react'
import { Card, CardHead, Seg, cx } from '@/lib/ui'
import { Icons } from '@/lib/icons'
import { protocolData as defaultData } from '@/lib/data'

export default function ProtocolCompliance({ data }) {
  const I = Icons;
  const [tab, setTab] = useState('Total');
  const rows = data ?? defaultData

  return (
    <Card>
      <CardHead title="Cumplimiento de protocolo comercial"
                sub="% de interacciones donde el vendedor cumplió cada paso · línea negra = benchmark sector"
                right={<Seg options={['Total','Llamada','WhatsApp','Email']} value={tab} onChange={setTab} />} />
      <div className="px-[18px] pt-1 pb-[18px]">
        <div className="flex flex-col gap-3.5">
          {rows.map(row => {
            const Ico = I[row.iconKey];
            const fillCls = row.level === 'bad' ? 'bar-bad' : row.level === 'warn' ? 'bar-warn' : 'bar-good';
            const pctCls  = row.level === 'bad' ? 'text-bad' : row.level === 'warn' ? 'text-warn' : 'text-good';
            return (
              <div key={row.key} className="grid items-center gap-3.5"
                   style={{gridTemplateColumns:'200px 1fr 56px 70px'}}>
                <div className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
                  <div className="w-[26px] h-[26px] rounded-md grid place-items-center bg-paper-warm text-ink-2"><Ico w={14} /></div>
                  {row.label}
                </div>
                <div className="relative h-[26px] bg-paper-warm rounded-md overflow-visible">
                  <div className={cx("h-full rounded-md", fillCls)} style={{width: `${row.pct}%`}} />
                  <div className="absolute -top-[3px] -bottom-[3px] w-0.5 bg-ink opacity-55 rounded"
                       style={{left: `${row.target}%`}}>
                    <span className="absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 mono text-[9.5px] text-ink bg-paper px-1 whitespace-nowrap">
                      {row.target}%
                    </span>
                  </div>
                </div>
                <div className={cx("text-right mono text-[14px] font-semibold tabular-nums", pctCls)}>{row.pct}%</div>
                <div className="mono text-[11px] text-muted-2 text-right">{row.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
