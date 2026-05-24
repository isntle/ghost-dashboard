function AiInsights() {
  const { Card, cx } = window.UI;
  const data = window.GS_DATA.insightsData;

  const sevClass = (s) => s === 'crit' ? 'ins-crit' : s === 'warn' ? 'ins-warn' : 'ins-good';
  const sevSev = (s) => s === 'crit'
    ? 'bg-bad-tint text-bad'
    : s === 'warn'
      ? 'bg-warn-tint text-warn'
      : 'bg-good-tint text-good';

  return (
    <Card>
      <div className="flex items-center justify-between px-[18px] pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <h3 className="m-0 text-[14px] font-medium">Hallazgos &amp; recomendaciones</h3>
          <span className="mono text-[10px] bg-brand-tint text-brand-ink px-1.5 py-0.5 rounded uppercase tracking-wider">Groq · IA</span>
        </div>
        <span className="mono text-[12px] text-muted">12 hallazgos</span>
      </div>
      <div className="px-4 pb-4 flex flex-col gap-2.5">
        {data.map((ins, i) => (
          <div key={i} className={cx("border border-line rounded-md2 p-3.5 flex gap-3", sevClass(ins.sev))}>
            <div className={cx("flex-none w-7 h-7 rounded-md grid place-items-center font-semibold mono text-[14px]", sevSev(ins.sev))}>
              {ins.mark}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="m-0 mb-1 text-[13.5px] font-medium text-ink tracking-[-0.005em]">{ins.title}</h4>
              <p className="m-0 text-[13px] text-ink-2 leading-relaxed" style={{textWrap: 'pretty'}}>{ins.body}</p>
              <div className="mt-2 flex items-center gap-2.5 mono text-[11px] text-muted">
                {ins.meta.map((m, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && <span>·</span>}
                    <span>{m.label}: <b className={cx(
                      m.tone === 'bad' ? 'text-bad' : m.tone === 'warn' ? 'text-warn' : ''
                    )}>{m.value}</b></span>
                  </React.Fragment>
                ))}
                {ins.meta.length > 0 && ins.cta && <span>·</span>}
                {ins.cta && <a href="#" className="text-brand font-medium no-underline">{ins.cta}</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
window.AiInsights = AiInsights;
