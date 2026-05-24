import Sidebar from './Sidebar'
import Topbar from './Topbar'
import TrialBanner from './TrialBanner'
import PageHead from './PageHead'
import KpiCards from './KpiCards'
import ProtocolCompliance from './ProtocolCompliance'
import AiInsights from './AiInsights'
import ScoreTrend from './ScoreTrend'
import ChannelBreakdown from './ChannelBreakdown'
import AgentRanking from './AgentRanking'
import InteractionsTable from './InteractionsTable'
import CtaStrip from './CtaStrip'

export default function App() {
  return (
    <div className="grid min-h-screen" style={{gridTemplateColumns:'232px 1fr'}}>
      <Sidebar />
      <main className="flex flex-col min-w-0">
        <Topbar />
        <TrialBanner />
        <section className="px-8 pt-6 pb-12 flex flex-col gap-[22px]">
          <PageHead />
          <KpiCards />

          <div className="grid gap-4" style={{gridTemplateColumns:'1.4fr 1fr'}}>
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
  );
}
