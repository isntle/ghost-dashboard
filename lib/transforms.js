// interaction_scores viene como objeto o array según el endpoint — normalizar siempre
function getScore(raw) {
  if (!raw) return null
  if (Array.isArray(raw)) return raw[0] ?? null
  return raw
}

// Pure functions — used in server components (page.jsx) and client components (polling)

export function toTableRows(interactions) {
  return interactions.map(ix => {
    const score = getScore(ix.interaction_scores)
    const dt    = new Date(ix.initiated_at)
    const diffDays = Math.floor((Date.now() - dt) / 86400000)
    const timeStr  = dt.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })

    const when =
      diffDays === 0 ? `Hoy, ${timeStr}` :
      diffDays === 1 ? `Ayer, ${timeStr}` :
      dt.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })

    const channelMap = { call: 'call', whatsapp: 'wa', email: 'em' }
    const statusMap  = { answered: 'answered', no_answer: 'no-answer', sent: 'pending' }
    const q     = score?.quality_score ?? null
    const level = q == null ? 'mid' : q >= 70 ? 'good' : q >= 40 ? 'warn' : 'bad'

    return {
      id:      ix.id,
      when,
      date:    dt.toLocaleDateString('es-MX'),
      channel: channelMap[ix.channel] ?? ix.channel,
      persona: 'Ghost Shopper',
      pseudo:  '—',
      av:      'from-violet-400 to-violet-800',
      inits:   ix.channel === 'call' ? '📞' : ix.channel === 'whatsapp' ? 'WA' : '@',
      agent:   '—',
      status:  statusMap[ix.status] ?? 'pending',
      checks:  score
        ? [score.gave_price, score.did_followup, score.attempted_close, score.used_name]
        : [false, false, false, false],
      score:      q != null ? (q / 10).toFixed(1) : null,
      level,
      highlight:  false,
      reasoning:  score?.reasoning ?? null,
      externalId: ix.external_id ?? null,
    }
  })
}

export function toKpiData(summary, interactions, report) {
  const withTime  = interactions.filter(i => i.response_time_sec)
  const avgSec    = withTime.length
    ? Math.round(withTime.reduce((s, i) => s + i.response_time_sec, 0) / withTime.length)
    : null

  // Compute quality score from interactions directly (more accurate than summary)
  const scores = interactions.map(i => getScore(i.interaction_scores)).filter(Boolean)
  const avgQ   = scores.length
    ? +(scores.reduce((s, sc) => s + sc.quality_score, 0) / scores.length / 10).toFixed(1)
    : summary ? +(summary.avg_quality_score / 10).toFixed(1) : null

  const answered = interactions.filter(i => i.status === 'answered').length
  const total    = interactions.length || summary?.total_interactions || 0

  return {
    qualityScore:      avgQ,
    responseRatePct:   total ? Math.round(answered / total * 100) : summary?.response_rate_pct ?? null,
    responseMins:      avgSec != null ? Math.floor(avgSec / 60) : null,
    responseSecs:      avgSec != null ? avgSec % 60 : null,
    closePct:          report?.metrics?.attempted_close_pct ?? null,
    totalInteractions: total,
  }
}

export function toProtocolData(interactions, fallback) {
  const scores = interactions.map(i => getScore(i.interaction_scores)).filter(Boolean)

  // If no scored interactions yet, keep fallback
  if (!scores.length) return fallback

  const total = interactions.length
  const levelFor = (pct, target) =>
    pct >= target * 0.9 ? 'good' :
    pct >= target * 0.6 ? 'warn' : 'bad'

  const scored = scores.length
  const pct = (field) => Math.round(scores.filter(s => s[field]).length / scored * 100)
  const fmt = (field) => `${scores.filter(s => s[field]).length} / ${scored}`

  return [
    { key: 'price',    label: 'Dio el precio',            iconKey: 'Dollar', pct: pct('gave_price'),      target: 85, count: fmt('gave_price'),      level: levelFor(pct('gave_price'), 85)      },
    { key: 'followup', label: 'Hizo seguimiento',         iconKey: 'Chat',   pct: pct('did_followup'),    target: 70, count: fmt('did_followup'),     level: levelFor(pct('did_followup'), 70)    },
    { key: 'close',    label: 'Intentó cerrar la venta',  iconKey: 'Tick',   pct: pct('attempted_close'), target: 60, count: fmt('attempted_close'),  level: levelFor(pct('attempted_close'), 60) },
    { key: 'name',     label: 'Usó el nombre del cliente',iconKey: 'Users',  pct: pct('used_name'),       target: 80, count: fmt('used_name'),        level: levelFor(pct('used_name'), 80)       },
    fallback[4], fallback[5], fallback[6],
  ]
}

export function toInsightsData(report) {
  if (!report?.findings) return null

  const { findings, recommendations, metrics } = report
  const items = []

  if (findings.veredicto) {
    items.push({
      sev:  'crit',
      mark: '!',
      title: findings.veredicto,
      body:  findings.resumen || findings.oportunidad_principal || '',
      meta:  metrics?.calificacion
        ? [{ label: 'Calificación', value: metrics.calificacion, tone: 'bad' }]
        : [],
      cta: null,
    })
  }

  recommendations?.prioritarias?.slice(0, 2).forEach(rec => {
    items.push({ sev: 'crit', mark: '!', title: rec, body: '', meta: [{ label: 'Prioridad', value: 'ALTA', tone: 'warn' }], cta: null })
  })

  findings.fortalezas?.slice(0, 1).forEach(fort => {
    items.push({ sev: 'good', mark: '✓', title: fort, body: '', meta: [], cta: null })
  })

  recommendations?.secundarias?.slice(0, 1).forEach(rec => {
    items.push({ sev: 'warn', mark: '▲', title: rec, body: '', meta: [], cta: null })
  })

  return items.slice(0, 4)
}

export function toChannelData(interactions) {
  const defs = [
    { ch: 'call',      key: 'call', label: 'Llamada',  icon: '📞', iconClass: 'bg-gradient-to-br from-brand-light to-brand-ink text-white' },
    { ch: 'whatsapp',  key: 'wa',   label: 'WhatsApp', icon: 'WA', iconClass: 'bg-gradient-to-br from-emerald-400 to-emerald-700 text-white' },
    { ch: 'email',     key: 'em',   label: 'Email',    icon: '@',  iconClass: 'bg-gradient-to-br from-gray-500 to-gray-800 text-white' },
  ]

  return defs.flatMap(({ ch, key, label, icon, iconClass }) => {
    const ixns = interactions.filter(i => i.channel === ch)
    if (!ixns.length) return []

    const total  = ixns.length
    const scored = ixns.map(i => getScore(i.interaction_scores)).filter(Boolean)
    const pct    = (n) => Math.round(n / total * 100)

    return [{
      key, label, icon, iconClass,
      good: pct(scored.filter(s => s.quality_score >= 70).length),
      warn: pct(scored.filter(s => s.quality_score >= 40 && s.quality_score < 70).length),
      bad:  pct(scored.filter(s => s.quality_score  < 40).length),
      no:   pct(ixns.filter(i => i.status === 'no_answer').length),
      evals: total,
    }]
  })
}
