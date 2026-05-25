'use client'

import { useState } from 'react'
import { Tag, cx } from '@/lib/ui'
import { Icons } from '@/lib/icons'

function fmtTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const heights = [4,7,11,15,9,18,22,14,8,20,25,17,11,7,15,22,28,21,14,9,12,18,24,30,26,18,12,9,15,21,28,33,29,21,15,10,8,14,20,27,31,25,18,12,9,7,12,18,24,29,26,20,14,10,8,11,16,22,27,24,18,13,9,7,10,15,20,25,22,17,12,9,7,10,14,18,21,24,19,13]

export default function DetailPanel({ interaction, callDetail, loading }) {
  const I = Icons
  const [expanded, setExpanded] = useState(false)

  // Build transcript lines from API data
  const lines = callDetail?.transcript?.map(t => ({
    t:    fmtTime(t.time_in_call_secs),
    who:  t.role === 'agent' ? 'bot' : 'vendor',   // agent = our bot, user = their salesperson
    name: t.role === 'agent' ? 'BOT' : 'VENDEDOR',
    text: t.message,
  })) ?? null

  const durationSec = callDetail?.duration_sec ?? null
  const convId      = interaction?.externalId ?? null
  const [gavePrice, didFollowup, attemptedClose, usedName] = interaction?.checks ?? []

  const tags = interaction ? [
    { label: gavePrice      ? 'Dio el precio'    : 'No dio el precio',    tone: gavePrice      ? 'good' : 'bad' },
    { label: usedName       ? 'Usó el nombre'    : 'No usó el nombre',    tone: usedName       ? 'good' : 'bad' },
    { label: didFollowup    ? 'Hizo follow-up'   : 'No hizo follow-up',   tone: didFollowup    ? 'good' : 'bad' },
    { label: attemptedClose ? 'Intentó cierre'   : 'No intentó cierre',   tone: attemptedClose ? 'good' : 'bad' },
  ] : [
    { label: 'Saludo: cumplió',      tone: 'good' },
    { label: 'Usó el nombre',        tone: 'good' },
    { label: 'Dio el precio',        tone: 'good' },
    { label: 'No hizo follow-up',    tone: 'bad'  },
    { label: 'No intentó cierre',    tone: 'bad'  },
    { label: 'Objeción no resuelta', tone: 'warn' },
  ]

  return (
    <div className="mx-[18px] mb-[18px] border border-line rounded-md2 embed-bg p-3.5 grid gap-5" style={{gridTemplateColumns:'1fr 1.1fr'}}>
      {/* Left — player + quality breakdown */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-[11.5px] font-medium text-muted tracking-wide uppercase">
          <I.Mic w={12} />
          Grabación · interacción seleccionada
          <span className="ml-auto text-ink-2 font-medium normal-case tracking-normal text-[12px]">
            {interaction ? `${interaction.when}` : 'Carlos R. ⨯ Familia Primeriza · Hoy 12:14'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-[38px] h-[38px] bg-ink text-white rounded-full grid place-items-center cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <div className="flex-1 h-[38px] flex items-center gap-[2px]">
            {heights.map((h, i) => (
              <i key={i} className={cx("block w-[3px] rounded-sm")}
                 style={{
                   height: `${h + 4}px`,
                   background: i < 22 ? 'linear-gradient(180deg, #5B3DF5, #B4A2FF)' : '#D9D8CF'
                 }} />
            ))}
          </div>
        </div>
        <div className="flex justify-between mono text-[11px] text-muted mt-1.5">
          <span>{durationSec ? `00:00 / ${fmtTime(durationSec)}` : '00:47 / 03:21'}</span>
          <span>elevenlabs{convId ? ` · ${convId.slice(0, 12)}…` : ' · conv_8f3a2…'}</span>
        </div>

        <div className="mt-3.5">
          <div className="text-[11.5px] font-medium text-muted tracking-wide uppercase mb-2">Quality breakdown</div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t, i) => <Tag key={i} tone={t.tone}>{t.label}</Tag>)}
          </div>
        </div>
      </div>

      {/* Right — transcript */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-[11.5px] font-medium text-muted tracking-wide uppercase">
          <I.Lines w={12} />
          Transcripción + análisis IA
          <span className="ml-auto mono text-[11px] normal-case tracking-normal">
            {durationSec ? `${fmtTime(durationSec)} min · es-MX` : '3:21 min · es-MX'}
          </span>
        </div>

        <div className={cx("text-[13px] leading-relaxed text-ink-2 relative", expanded ? "overflow-y-auto max-h-[340px]" : "max-h-[160px] overflow-hidden transcript-fade")}>
          {loading && (
            <p className="text-muted text-[13px]">Cargando transcripción…</p>
          )}
          {!loading && lines && lines.map((row, i) => (
            <div key={i} className={i > 0 ? 'mt-1.5' : ''}>
              <span className={cx("font-semibold mr-1.5", row.who === 'bot' ? 'text-ink' : 'text-brand-ink')}>
                [{row.name} {row.t}]
              </span>
              {row.text}
            </div>
          ))}
          {!loading && !lines && (
            <p className="text-muted text-[13px]">No hay transcripción disponible para esta interacción.</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-2.5">
          <span className="mono text-[11px] text-muted">
            {interaction?.reasoning
              ? `IA: ${interaction.reasoning.slice(0, 80)}${interaction.reasoning.length > 80 ? '…' : ''}`
              : '⚠ IA detectó: precio dado, pero objeción no resuelta y sin cierre.'}
          </span>
          <button onClick={() => setExpanded(e => !e)} className="text-brand font-medium text-[12.5px] cursor-pointer bg-transparent border-none p-0">
            {expanded ? '← Colapsar' : 'Ver transcripción completa →'}
          </button>
        </div>
      </div>
    </div>
  )
}
