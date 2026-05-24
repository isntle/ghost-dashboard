function InteractionsTable() {
  const { Card, IconBtn, cx } = window.UI;
  const I = window.Icons;
  const rows = window.GS_DATA.interactions;
  const [filter, setFilter] = React.useState('Todas');
  const filters = ['Todas','Llamada','WhatsApp','Email','Score < 5'];

  const ChannelBadge = ({ ch }) => {
    if (ch === 'wa')   return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[12px] font-medium bg-[#DCFCE7] text-[#146C43]"><span className="text-[11px]">●</span> WhatsApp</span>;
    if (ch === 'call') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[12px] font-medium bg-brand-tint text-brand-ink">📞 Llamada</span>;
    return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[12px] font-medium bg-[#F1F0E9] text-ink-2">@ Email</span>;
  };

  const Status = ({ s, sub }) => {
    const map = {
      answered:    'bg-good-tint text-good',
      'no-answer': 'bg-bad-tint text-bad',
      pending:     'bg-warn-tint text-warn',
    };
    const label = s === 'answered' ? `Respondió${sub ? ` ${sub}`:''}` : s === 'no-answer' ? 'No respondió' : 'Pendiente';
    return (
      <span className={cx("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11.5px] font-medium", map[s])}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
    );
  };

  const Checks = ({ list }) => {
    const labels = ['$','↻','✓','@'];
    return (
      <div className="flex gap-1">
        {list.map((v, i) => (
          <div key={i} className={cx(
            "w-[22px] h-[22px] rounded grid place-items-center mono text-[10px] font-semibold border",
            v ? "bg-good-tint text-good border-[#B7E4CE]"
              : "bg-bad-tint text-bad border-[#F5C4C1]"
          )}>{labels[i]}</div>
        ))}
      </div>
    );
  };

  const Score = ({ v, level }) => (
    <span className={cx("mono text-[15px] font-semibold tabular-nums",
      level === 'bad' && 'text-bad', level === 'warn' && 'text-warn', level === 'good' && 'text-good')}>
      {v}<span className="text-muted-2 font-medium text-[12px]">/10</span>
    </span>
  );

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center gap-3 px-[18px] py-3.5 border-b border-line">
        <h3 className="m-0 text-[14px] font-medium">Interacciones recientes</h3>
        <span className="mono text-[11px] text-muted px-1.5 py-0.5 bg-paper-warm rounded">217 registros</span>
        <div className="flex-1" />
        <div className="inline-flex items-center gap-2 h-7 px-2.5 border border-line-strong rounded bg-paper-elev text-muted text-[12.5px] min-w-[220px]">
          <I.Search w={14} />
          <input placeholder="Buscar por vendedor, persona, transcripción…" className="border-none outline-none bg-transparent flex-1 font-inherit text-ink" />
          <span className="mono text-[10.5px] px-1 border border-line-strong border-b-2 rounded text-muted">⌘ K</span>
        </div>
        <div className="flex gap-1.5">
          {filters.map(f => {
            const isBad = f === 'Score < 5';
            return (
              <button key={f}
                onClick={() => setFilter(f)}
                className={cx(
                  "h-6 px-2.5 inline-flex items-center gap-1.5 rounded border text-[12px] cursor-pointer",
                  filter === f
                    ? "bg-ink text-white border-ink"
                    : isBad
                      ? "bg-paper-elev text-bad border-[#F5C4C1]"
                      : "bg-paper-elev text-ink-2 border-line-strong"
                )}>
                {isBad && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Fecha','Canal','Persona falsa','Vendedor','Status','Protocolo','Score','Acciones'].map((h,i) => (
              <th key={i} className={cx(
                "text-left text-[11px] font-medium text-muted uppercase tracking-wider px-3.5 py-2.5 bg-[#F8F7F1] border-b border-line",
                i === 7 && 'text-right'
              )}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className={cx("hover:bg-paper-soft", r.highlight && "bg-[#FFFBF4]")}>
              <td className="px-3.5 py-3.5 border-b border-line align-middle">
                <div className="flex flex-col leading-tight">
                  <b className="text-ink font-medium text-[13.5px]">{r.when}</b>
                  <span className="text-muted text-[11.5px] mono">{r.date}</span>
                </div>
              </td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle"><ChannelBadge ch={r.channel} /></td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle">
                <div className="flex items-center gap-2.5">
                  <div className={cx("w-[26px] h-[26px] rounded-full text-white grid place-items-center text-[11px] font-semibold bg-gradient-to-br", r.av)}>{r.inits}</div>
                  <div>
                    <b className="block leading-tight font-medium text-ink text-[13px]">{r.persona}</b>
                    <span className="text-muted text-[11px] mono">{r.pseudo}</span>
                  </div>
                </div>
              </td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle text-[13.5px] text-ink-2">{r.agent}</td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle"><Status s={r.status} sub={r.subStatus} /></td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle"><Checks list={r.checks} /></td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle"><Score v={r.score} level={r.level} /></td>
              <td className="px-3.5 py-3.5 border-b border-line align-middle">
                <div className="flex gap-1.5 justify-end">
                  <IconBtn title="Escuchar"><I.Play w={14} /></IconBtn>
                  <IconBtn title="Transcripción"><I.Lines w={14} /></IconBtn>
                  <IconBtn title="Detalle"><I.ChevR w={14} /></IconBtn>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DetailPanel />
    </Card>
  );
}
window.InteractionsTable = InteractionsTable;
