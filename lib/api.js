const BASE = process.env.API_URL ?? 'http://127.0.0.1:8000'

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { cache: 'no-store' })
  const json = await res.json()
  if (!json.success) throw new Error(json.error ?? `HTTP ${res.status}`)
  return json.data
}

export const api = {
  summary:      ()   => get('/dashboard/summary'),
  company:      (id) => get(`/companies/${id}`),
  interactions: (id) => get(`/interactions/campaign/${id}`),
  reports:      (id) => get(`/reports/campaign/${id}`),
}
