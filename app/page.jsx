import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import TrialBanner from '@/components/layout/TrialBanner'
import PageHead from '@/components/layout/PageHead'
import KpiCards from '@/components/dashboard/KpiCards'
import ProtocolCompliance from '@/components/dashboard/ProtocolCompliance'
import AiInsights from '@/components/dashboard/AiInsights'
import ScoreTrend from '@/components/dashboard/ScoreTrend'
import ChannelBreakdown from '@/components/dashboard/ChannelBreakdown'
import AgentRanking from '@/components/dashboard/AgentRanking'
import InteractionsTable from '@/components/dashboard/InteractionsTable'
import CtaStrip from '@/components/dashboard/CtaStrip'

export default function Home() {
  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '232px 1fr' }}>
      <Sidebar />
      <main className="flex flex-col min-w-0">
        <Topbar />
        <TrialBanner />
        <section className="px-8 pt-6 pb-12 flex flex-col gap-[22px]">
          <PageHead />
          <KpiCards />

          <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
            <ProtocolCompliance />
            <AiInsights />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ScoreTrend />
            <ChannelBreakdown />
            <AgentRanking />
          </div>

          <InteractionsTable />
          <CtaStrip />
        </section>
      </main>
    </div>
  )
}
