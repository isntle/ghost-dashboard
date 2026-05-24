'use client'

import { useState } from 'react'
import { Card, CardHead, Seg, cx } from '@/lib/ui'
import { agentRanking } from '@/lib/data'

export default function AgentRanking() {
  const [tab, setTab] = useState('Top');

  const TrendSpark = ({ trend }) => {
    if (!trend) return null;
    const paths = {
      up:   {d:'M0,14 L8,12 L16,10 L24,8 L32,7 L40,5 L48,4 L56,3',   c:'#047857'},
      flat: {d:'M0,8 L8,10 L16,9 L24,11 L32,10 L40,12 L48,11 L56,13',c:'#D97706'},
      down: {d:'M0,4 L8,6 L16,7 L24,9 L32,11 L40,13 L48,14 L56,16',  c:'#DC2626'},
    };
    const p = paths[trend];
    return <svg width="56" height="20" viewBox="0 0 56 20"><path d={p.d} fill="none" stroke={p.c} strokeWidth="1.5" /></svg>;
  };

  return (
    <Card>
      <CardHead title="Vendedores · ranking" sub="por quality score (mín. 8 interacciones)"
                right={<Seg options={['Top','Bottom']} value={tab} onChange={setTab} />} />
      <div className="px-[18px] pb-[18px] pt-0">
        <div className="flex flex-col">
          {agentRanking.map((a, i) => (
            <div key={i} className={cx("grid items-center gap-3 py-2.5",
                                       i < agentRanking.length - 1 && "border-b border-dashed border-line")}
                 style={{gridTemplateColumns:'26px 1fr auto auto'}}>
              <div className="mono text-[11px] text-muted-2 text-center">{a.rank}</div>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cx(
                  "w-7 h-7 rounded-full text-white grid place-items-center text-[11px] font-semibold flex-none",
                  a.av ? `bg-gradient-to-br ${a.av}` : ''
                )} style={!a.av ? {background:'#F4F2EB', color:'#6B7280', fontWeight:500} : {}}>
                  {a.initials}
                </div>
                <div>
                  <b className={cx("text-[13.5px] font-medium", a.level === 'mid' ? "text-muted font-normal" : "text-ink")}>{a.name}</b>
                  {a.evals !== null && (
                    <span className="block text-[11.5px] text-muted">{a.evals} evals · {a.comply}% cumple</span>
                  )}
                  {a.level === 'mid' && <span className="block text-[11.5px] text-muted">scores aceptables</span>}
                </div>
              </div>
              <div className={cx("mono text-[14px] font-semibold",
                a.level === 'good' && 'text-good',
                a.level === 'warn' && 'text-warn',
                a.level === 'bad'  && 'text-bad',
                a.level === 'mid'  && 'text-warn')}>
                {a.score ?? '—'}
              </div>
              <div><TrendSpark trend={a.trend} /></div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
