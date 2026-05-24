function TrialBanner() {
  const { Btn } = window.UI;
  const I = window.Icons;
  return (
    <div className="trial-bg mx-8 mt-4 flex items-center gap-[18px] px-4 py-3.5 rounded-lg2 border border-[#1F2229] text-sidebar-ink">
      <span className="mono text-[10px] tracking-[0.14em] uppercase text-brand-light px-2 py-1 border border-[#2D2257] rounded relative z-10"
            style={{background: 'rgba(91,61,245,.18)'}}>
        Trial gratuito
      </span>
      <div className="flex-1 leading-snug text-[14px] relative z-10">
        <b className="font-medium text-white">Estás viendo tu reporte de auditoría de cortesía.</b>{' '}
        <span className="text-[#B9BDC4]">Tus bots seguirán evaluando a tu equipo después de la prueba sólo si activas tu plan.</span>
      </div>
      <div className="w-[140px] h-1 rounded bg-white/10 overflow-hidden relative z-10">
        <div className="h-full" style={{width: '75%', background: 'linear-gradient(90deg,#B4A2FF,#5B3DF5)'}} />
      </div>
      <div className="flex items-baseline gap-1.5 text-white num relative z-10">
        <b className="text-[22px] font-semibold tracking-[-0.02em]">15</b>
        <span className="text-[12px] text-[#B9BDC4]">de 60 días restantes</span>
      </div>
      <Btn variant="accent" className="relative z-10" iconRight={<I.ChevR w={14} />}>Activar Premium</Btn>
    </div>
  );
}
window.TrialBanner = TrialBanner;
