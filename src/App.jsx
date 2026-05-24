function App() {
  const {
    Sidebar, Topbar, TrialBanner, PageHead, KpiCards,
    ProtocolCompliance, AiInsights, ScoreTrend, ChannelBreakdown,
    AgentRanking, InteractionsTable, CtaStrip,
  } = window;

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

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
