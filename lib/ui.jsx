export const cx = (...xs) => xs.filter(Boolean).join(' ');

export const Card = ({ className, children, ...rest }) => (
  <div className={cx("bg-paper-elev border border-line rounded-lg2 shadow-card", className)} {...rest}>
    {children}
  </div>
);

export const CardHead = ({ title, sub, right, className }) => (
  <div className={cx("flex items-center justify-between px-[18px] pt-4 pb-3", className)}>
    <div className="min-w-0">
      <h3 className="m-0 text-[14px] font-medium text-ink tracking-[-0.005em]">{title}</h3>
      {sub && <div className="mt-1 mono text-[12px] text-muted">{sub}</div>}
    </div>
    {right}
  </div>
);

export const Seg = ({ options, value, onChange }) => (
  <div className="inline-flex bg-paper-warm border border-line rounded-md p-[2px]">
    {options.map((o, i) => (
      <button key={i}
              onClick={() => onChange && onChange(o)}
              className={cx(
                "text-[12px] font-medium px-2 py-[3px] rounded transition-colors",
                value === o ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.04)]" : "text-muted hover:text-ink-2"
              )}>{o}</button>
    ))}
  </div>
);

export const Pill = ({ children, className, dot }) => (
  <div className={cx("inline-flex items-center gap-2 h-8 px-3 bg-paper-elev border border-line-strong rounded-lg text-[13px] text-ink-2 cursor-pointer", className)}>
    {dot && <span className={cx("w-1.5 h-1.5 rounded-full", dot)} style={{boxShadow: '0 0 0 3px rgba(4,120,87,.15)'}} />}
    {children}
  </div>
);

export const Btn = ({ variant = 'primary', className, children, icon, iconRight, ...rest }) => {
  const base = "inline-flex items-center gap-2 h-8 px-3 rounded-lg text-[13px] font-medium cursor-pointer border transition-colors";
  const map = {
    primary:   "bg-ink border-ink text-white hover:bg-black",
    secondary: "bg-paper-elev border-line-strong text-ink hover:bg-paper",
    accent:    "bg-brand border-brand text-white hover:bg-brand-ink",
    ghost:     "bg-transparent border-transparent text-ink-2 hover:bg-paper-warm",
  };
  return (
    <button className={cx(base, map[variant], className)} {...rest}>
      {icon}{children}{iconRight}
    </button>
  );
};

export const IconBtn = ({ children, title, className, ...rest }) => (
  <button title={title} className={cx("w-8 h-8 grid place-items-center bg-paper-elev border border-line-strong rounded-lg text-ink-2 hover:bg-paper", className)} {...rest}>
    {children}
  </button>
);

export const Verdict = ({ tone = 'bad', children }) => {
  const m = {
    bad:  'bg-bad-tint text-bad',
    warn: 'bg-warn-tint text-warn',
    good: 'bg-good-tint text-good',
  };
  return (
    <span className={cx("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wide", m[tone])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
};

export const Delta = ({ tone = 'bad', children }) => {
  const m = {
    bad:  'text-bad bg-bad-tint',
    warn: 'text-warn bg-warn-tint',
    good: 'text-good bg-good-tint',
  };
  return (
    <span className={cx("inline-flex items-center gap-1 px-1.5 py-0.5 rounded mono text-[11.5px] font-medium", m[tone])}>
      {children}
    </span>
  );
};

export const Tag = ({ tone, children }) => (
  <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded bg-paper-warm border border-line text-[11.5px] text-ink-2">
    {tone && <span className={cx("w-1.5 h-1.5 rounded-full", tone === 'good' ? 'bg-good' : tone === 'warn' ? 'bg-warn' : 'bg-bad')} />}
    {children}
  </span>
);
