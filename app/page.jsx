import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import TrialBanner from '@/components/layout/TrialBanner'
import PageHead from '@/components/layout/PageHead'
import KpiCards from '@/components/dashboard/KpiCards'
import ProtocolCompliance from '@/components/dashboard/ProtocolCompliance'
import AiInsights from '@/components/dashboard/AiInsights'
import ScoreTrend from '@/components/dashboard/ScoreTrend'
import ChannelBreakdown from '@/components/dashboard/ChannelBreakdown'
import InteractionsTable from '@/components/dashboard/InteractionsTable'
import CtaStrip from '@/components/dashboard/CtaStrip'
import { protocolData, insightsData, channelMix, interactions } from '@/lib/data'

const demoKpis = {
  qualityScore:      6.2,
  responseRatePct:   64,
  responseMins:      8,
  responseSecs:      32,
  closePct:          18,
  totalInteractions: 217,
}

export default function Home() {
  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '232px 1fr' }}>
      <Sidebar />
      <main className="flex flex-col min-w-0">
        <Topbar />
        <TrialBanner />
        <section className="px-8 pt-6 pb-12 flex flex-col gap-[22px]">
          <PageHead />
          <KpiCards data={demoKpis} />

          <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
            <ProtocolCompliance data={protocolData} />
            <AiInsights data={insightsData} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScoreTrend />
            <ChannelBreakdown data={channelMix} />
          </div>

          <InteractionsTable data={interactions} />
          <CtaStrip />
        </section>
      </main>
    </div>
  )
}
