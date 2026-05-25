import { notFound } from 'next/navigation'
import { api } from '@/lib/api'
import { toKpiData, toProtocolData, toInsightsData, toChannelData, toTableRows } from '@/lib/transforms'
import { protocolData as fallbackProtocol, insightsData as fallbackInsights, channelMix as fallbackChannels } from '@/lib/data'
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

export default async function CompanyDashboard({ params }) {
  const { company_id } = await params

  // Company + campaigns
  let company
  try {
    company = await api.company(company_id)
  } catch {
    notFound()
  }

  const activeCampaign =
    company.campaigns?.find(c => c.status === 'active') ??
    company.campaigns?.[0] ??
    null

  // Parallel fetches — fail silently so page always renders
  let summary = null
  let interactions = []
  let report = null

  const fetches = [api.summary().then(d => { summary = d }).catch(() => {})]

  if (activeCampaign) {
    fetches.push(
      api.interactions(activeCampaign.id).then(d => { interactions = d }).catch(() => {}),
      api.reports(activeCampaign.id).then(d => { report = d?.[0] ?? null }).catch(() => {}),
    )
  }

  await Promise.all(fetches)

  // Transform to component shapes
  const kpiData       = toKpiData(summary, interactions, report)
  const protocolItems = toProtocolData(interactions, fallbackProtocol)
  const insightsItems = toInsightsData(report) ?? fallbackInsights
  const channelItems  = interactions.length ? toChannelData(interactions) : fallbackChannels
  const tableRows     = toTableRows(interactions)

  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '232px 1fr' }}>
      <Sidebar />
      <main className="flex flex-col min-w-0">
        <Topbar campaign={activeCampaign} />
        <TrialBanner />
        <section className="px-8 pt-6 pb-12 flex flex-col gap-[22px]">
          <PageHead report={report} totalInteractions={kpiData.totalInteractions} />
          <KpiCards data={kpiData} />

          <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
            <ProtocolCompliance data={protocolItems} />
            <AiInsights data={insightsItems} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScoreTrend />
            <ChannelBreakdown data={channelItems} />
          </div>

          <InteractionsTable data={tableRows} campaignId={activeCampaign?.id} />
          <CtaStrip />
        </section>
      </main>
    </div>
  )
}
