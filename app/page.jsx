import { redirect } from 'next/navigation'

export default async function Home() {
  try {
    const res  = await fetch('https://ghost-shopper-production.up.railway.app/companies/', { cache: 'no-store' })
    const json = await res.json()
    const companies = json?.data?.items ?? []

    if (companies.length > 0) {
      // Most recently created company
      const latest = companies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
      redirect(`/${latest.id}`)
    }
  } catch {}

  // Fallback si el backend no responde
  redirect('/a37ae6ad-3967-4835-82aa-dd8d7072da22')
}
