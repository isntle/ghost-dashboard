import { redirect } from 'next/navigation'

const FALLBACK_ID = 'a37ae6ad-3967-4835-82aa-dd8d7072da22'

export default async function Home() {
  let targetId = FALLBACK_ID

  try {
    const res      = await fetch('https://ghost-shopper-production.up.railway.app/companies/', { cache: 'no-store' })
    const json     = await res.json()
    const companies = json?.data?.items ?? []

    if (companies.length > 0) {
      const latest = companies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
      targetId = latest.id
    }
  } catch {}

  redirect(`/${targetId}`)
}
