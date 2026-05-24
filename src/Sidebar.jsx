function Sidebar() {
  const { cx } = window.UI;
  const I = window.Icons;

  const NavItem = ({ icon, label, active, badge, badgeAlert }) => (
    <a className={cx(
      "flex items-center gap-[11px] px-[10px] py-2 rounded-md2 text-[13.5px] font-normal cursor-pointer no-underline",
      active
        ? "bg-sidebar-line text-white shadow-[inset_0_0_0_1px_#23272F]"
        : "text-[#B9BDC4] hover:bg-sidebar-card hover:text-sidebar-ink"
    )}>
      <span className={cx("flex-none", active ? "text-brand-light" : "text-sidebar-muted")}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={cx("mono text-[10px] px-1.5 py-0.5 rounded",
          badgeAlert ? "bg-bad text-white" : "bg-[#23272F] text-sidebar-ink")}>
          {badge}
        </span>
      )}
    </a>
  );

  return (
    <aside className="bg-sidebar text-sidebar-ink px-[18px] pt-[22px] pb-6 border-r border-sidebar-line flex flex-col gap-[22px] sticky top-0 h-screen">
      {/* brand */}
      <div className="flex items-center gap-2.5 px-1.5">
        <div className="brand-mark-bg w-7 h-7 rounded-lg grid place-items-center text-white font-bold text-[13px]">G</div>
        <div className="flex flex-col leading-none">
          <b className="font-semibold text-[15px] tracking-[-0.01em]">Ghost Shopper</b>
          <span className="text-[11px] text-sidebar-muted mt-1 tracking-[0.04em] uppercase">Mystery Shopping AI</span>
        </div>
      </div>

      {/* org switcher */}
      <div className="mt-1 flex items-center gap-2.5 p-2.5 rounded-md2 bg-sidebar-card border border-[#1F2229] cursor-pointer">
        <div className="w-[26px] h-[26px] rounded-md grid place-items-center text-white font-semibold text-[11px]"
             style={{background: 'linear-gradient(135deg, #B4A2FF, #5B3DF5)'}}>CV</div>
        <div className="flex flex-col flex-1 min-w-0 leading-tight">
          <b className="font-medium text-[13px] text-sidebar-ink truncate">Grupo Casas del Valle</b>
          <span className="text-[11px] text-sidebar-muted">Inmobiliaria · CDMX</span>
        </div>
        <I.ChevD w={14} className="text-sidebar-muted" />
      </div>

      {/* Auditoría */}
      <div className="flex flex-col gap-0.5">
        <div className="text-[11px] text-[#4B5057] tracking-[0.08em] uppercase pl-2.5 pb-2">Auditoría</div>
        <NavItem icon={<I.Grid />}   label="Executive Report" active />
        <NavItem icon={<I.Check2 />} label="Campañas" badge="3" />
        <NavItem icon={<I.Clock />}  label="Interacciones" badge="217" />
        <NavItem icon={<I.Users />}  label="Vendedores" />
        <NavItem icon={<I.Trend />}  label="Tendencias" />
      </div>

      {/* Configuración */}
      <div className="flex flex-col gap-0.5">
        <div className="text-[11px] text-[#4B5057] tracking-[0.08em] uppercase pl-2.5 pb-2">Configuración</div>
        <NavItem icon={<I.Gear />}   label="Personas / Bots" />
        <NavItem icon={<I.Chat />}   label="Scripts" />
        <NavItem icon={<I.Shield />} label="Billing" badge="Trial" badgeAlert />
      </div>

      {/* user */}
      <div className="mt-auto border-t border-sidebar-line pt-3.5 flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full grid place-items-center text-white font-semibold text-[12px]"
             style={{background:'linear-gradient(135deg,#FFB17A,#C04D2E)'}}>RA</div>
        <div className="flex-1 min-w-0 leading-tight">
          <b className="block font-medium text-[13px] text-sidebar-ink">Roberto Aguirre</b>
          <span className="text-[11px] text-sidebar-muted">Director Comercial</span>
        </div>
        <I.Dots w={14} className="text-sidebar-muted" />
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
