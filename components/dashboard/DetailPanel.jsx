import { Tag, cx } from '@/lib/ui'
import { Icons } from '@/lib/icons'
import { transcript } from '@/lib/data'

export default function DetailPanel() {
  const I = Icons;
  const heights = [4,7,11,15,9,18,22,14,8,20,25,17,11,7,15,22,28,21,14,9,12,18,24,30,26,18,12,9,15,21,28,33,29,21,15,10,8,14,20,27,31,25,18,12,9,7,12,18,24,29,26,20,14,10,8,11,16,22,27,24,18,13,9,7,10,15,20,25,22,17,12,9,7,10,14,18,21,24,19,13];
  const playedTo = 22;

  return (
    <div className="mx-[18px] mb-[18px] border border-line rounded-md2 embed-bg p-3.5 grid gap-5" style={{gridTemplateColumns:'1fr 1.1fr'}}>
      <div>
        <div className="flex items-center gap-2 mb-2 text-[11.5px] font-medium text-muted tracking-wide uppercase">
          <I.Mic w={12} />
          Grabación · interacción seleccionada
          <span className="ml-auto text-ink-2 font-medium normal-case tracking-normal text-[12px]">
            Carlos R. ⨯ Familia Primeriza · Hoy 12:14
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-[38px] h-[38px] bg-ink text-white rounded-full grid place-items-center cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <div className="flex-1 h-[38px] flex items-center gap-[2px]">
            {heights.map((h, i) => (
              <i key={i} className={cx("block w-[3px] rounded-sm",
                i >= playedTo ? "bg-[#D9D8CF]" : "")}
                 style={{
                   height: `${h + 4}px`,
                   background: i < playedTo ? 'linear-gradient(180deg, #5B3DF5, #B4A2FF)' : undefined
                 }} />
            ))}
          </div>
        </div>
        <div className="flex justify-between mono text-[11px] text-muted mt-1.5">
          <span>00:47 / 03:21</span>
          <span>elevenlabs · conv_8f3a2…</span>
        </div>

        <div className="mt-3.5">
          <div className="text-[11.5px] font-medium text-muted tracking-wide uppercase mb-2">Quality breakdown</div>
          <div className="flex gap-2 flex-wrap">
            <Tag tone="good">Saludo: cumplió</Tag>
            <Tag tone="good">Usó el nombre</Tag>
            <Tag tone="good">Dio el precio</Tag>
            <Tag tone="bad">No hizo follow-up</Tag>
            <Tag tone="bad">No intentó cierre</Tag>
            <Tag tone="warn">Objeción no resuelta</Tag>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-[11.5px] font-medium text-muted tracking-wide uppercase">
          <I.Lines w={12} />
          Transcripción + análisis IA
          <span className="ml-auto mono text-[11px] normal-case tracking-normal">3:21 min · es-MX</span>
        </div>
        <div className="text-[13px] leading-relaxed text-ink-2 max-h-[160px] overflow-hidden relative transcript-fade">
          {transcript.map((row, i) => (
            <div key={i} className={i > 0 ? 'mt-1.5' : ''}>
              <span className={cx("font-semibold mr-1.5", row.who === 'agent' ? 'text-brand-ink' : 'text-ink')}>
                [{row.name} {row.t}]
              </span>
              {row.text}
              {row.hl && <span className="bg-[#FFEFC4] px-0.5 rounded-sm">{row.hl}</span>}
              {row.hlBad && <span className="bg-bad-tint px-0.5 rounded-sm">{row.hlBad}</span>}
              {row.tail}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <span className="mono text-[11px] text-muted">
            ⚠ IA detectó: precio dado, pero <b className="text-bad">objeción no resuelta</b> y <b className="text-bad">sin cierre</b>.
          </span>
          <a href="#" className="text-brand font-medium text-[12.5px] no-underline">Ver transcripción completa →</a>
        </div>
      </div>
    </div>
  );
}
