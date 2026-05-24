function Topbar() {
  const { Pill, Btn, IconBtn } = window.UI;
  const I = window.Icons;
  return (
    <div className="topbar-glass flex items-center gap-3.5 px-8 py-[18px] border-b border-line sticky top-0 z-10">
      <div className="flex items-center gap-2 text-muted text-[13px]">
        <span>Reportes</span>
        <I.ChevR w={12} className="opacity-50" />
        <b className="text-ink font-medium">Executive Report</b>
      </div>
      <div className="flex-1" />

      <Pill dot="bg-good">
        <span>Campaña: <b className="text-ink font-medium">Q2'26 — Polanco · Activa</b></span>
        <I.ChevD w={12} className="text-muted" />
      </Pill>
      <Pill>
        <I.Cal w={14} className="text-muted" />
        Últimos 30 días
        <I.ChevD w={12} className="text-muted" />
      </Pill>
      <IconBtn title="Notificaciones"><I.Bell w={14} /></IconBtn>
      <Btn variant="secondary" icon={<I.Down w={14} />}>Exportar PDF</Btn>
      <Btn icon={<I.Plus w={14} />}>Nueva campaña</Btn>
    </div>
  );
}
window.Topbar = Topbar;
