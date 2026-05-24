'use client'

import { useState } from 'react'
import { Card, CardHead, Seg } from '@/lib/ui'

export default function ScoreTrend() {
  const [tab, setTab] = useState('30d');
  return (
    <Card>
      <CardHead title="Quality Score · evolución diaria" sub="últimos 30 días · benchmark 8.0"
                right={<Seg options={['30d','90d']} value={tab} onChange={setTab} />} />
      <div className="pl-1.5 pr-1.5 pb-1">
        <svg viewBox="0 0 480 200" width="100%" height="200" preserveAspectRatio="none" className="block px-3.5">
          <defs>
            <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5B3DF5" stopOpacity=".22"/>
              <stop offset="100%" stopColor="#5B3DF5" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <g stroke="#ECECE6" strokeWidth="1">
            <line x1="0" y1="20" x2="480" y2="20"/>
            <line x1="0" y1="70" x2="480" y2="70"/>
            <line x1="0" y1="120" x2="480" y2="120"/>
            <line x1="0" y1="170" x2="480" y2="170"/>
          </g>
          <line x1="0" y1="50" x2="480" y2="50" stroke="#0E1014" strokeDasharray="3 4" strokeWidth="1" opacity=".4"/>
          <text x="478" y="46" textAnchor="end" fontFamily="Geist Mono" fontSize="9" fill="#6B7280">benchmark 8.0</text>
          <g fontFamily="Geist Mono" fontSize="9" fill="#9CA3AF">
            <text x="6" y="24">10</text>
            <text x="6" y="74">7.5</text>
            <text x="6" y="124">5</text>
            <text x="6" y="174">2.5</text>
          </g>
          <path d="M30,90 L60,76 L90,98 L120,84 L150,108 L180,98 L210,118 L240,108 L270,124 L300,116 L330,132 L360,124 L390,138 L420,128 L450,140 L450,180 L30,180 Z" fill="url(#lg1)"/>
          <path d="M30,90 L60,76 L90,98 L120,84 L150,108 L180,98 L210,118 L240,108 L270,124 L300,116 L330,132 L360,124 L390,138 L420,128 L450,140" fill="none" stroke="#5B3DF5" strokeWidth="2"/>
          <circle cx="450" cy="140" r="3.5" fill="#5B3DF5"/>
          <circle cx="450" cy="140" r="6" fill="none" stroke="#5B3DF5" strokeWidth="1.5" opacity=".4"/>
          <text x="455" y="136" fontFamily="Geist" fontSize="10" fontWeight="600" fill="#0E1014">6.2</text>
        </svg>
        <div className="grid grid-cols-8 mono text-[10.5px] text-muted-2 px-3.5 pt-1.5">
          {['23 abr','27','1 may','5','9','13','17','22'].map((x,i) => <span key={i} className="text-center">{x}</span>)}
        </div>
      </div>
    </Card>
  );
}
