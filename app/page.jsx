import { redirect } from 'next/navigation'

const DEMO_COMPANY_ID = 'a37ae6ad-3967-4835-82aa-dd8d7072da22'

export default function Home() {
  redirect(`/${DEMO_COMPANY_ID}`)
}
