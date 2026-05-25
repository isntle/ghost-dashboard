# 👻 Ghost Shopper — Dashboard

> **LatAm GTM Hackathon — CDMX, Mayo 2026**

El dashboard de auditoría comercial de Ghost Shopper. Muestra en tiempo real cómo está atendiendo a sus clientes el equipo de ventas de una empresa — scores, transcripciones, cumplimiento de protocolo y recomendaciones generadas por IA.

---

## ¿Qué muestra?

Cada empresa auditada recibe un link personalizado con su propio reporte:

```
https://ghost-dashboard.up.railway.app/{company_id}
```

Dentro del dashboard el director comercial ve:

- **Quality Score promedio** — calificación 0–10 de todas las interacciones
- **Tasa de respuesta** — qué porcentaje de contactos fueron atendidos
- **Tiempo de respuesta** — cuánto tardaron en contestar en promedio
- **Intento de cierre** — qué porcentaje de interacciones incluyó un intento de venta
- **Cumplimiento de protocolo** — barra por barra: dio precio, hizo seguimiento, usó el nombre, intentó cerrar
- **Hallazgos y recomendaciones** — generados por IA con prioridad y veredicto
- **Resultado por canal** — llamada vs WhatsApp, qué canal responde mejor
- **Tabla de interacciones** — cada llamada o mensaje con su score, protocolo y transcripción completa

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Estilos | Tailwind CSS |
| Datos | API REST de Ghost Shopper (FastAPI + Supabase) |
| Deploy | Railway |

---

## Correr localmente

```bash
git clone https://github.com/isntle/ghost-dashboard
cd ghost-dashboard
npm install
cp .env.example .env.local   # llenar la URL del backend
npm run dev
```

Abrir `http://localhost:3000/{company_id}`.

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz:

```
API_URL=https://ghost-shopper-production.up.railway.app
NEXT_PUBLIC_API_URL=https://ghost-shopper-production.up.railway.app
```

`API_URL` la usa el servidor (Server Components). `NEXT_PUBLIC_API_URL` la usa el cliente para el polling en tiempo real de la tabla de interacciones.

---

## Estructura del proyecto

```
app/
  page.jsx              → redirige al company_id de demo
  [company_id]/
    page.jsx            → dashboard por empresa (Server Component)

components/
  dashboard/
    KpiCards            → 4 KPIs principales
    ProtocolCompliance  → barras de cumplimiento por criterio
    AiInsights          → hallazgos y recomendaciones de IA
    ChannelBreakdown    → resultado por canal
    ScoreTrend          → evolución del score en el tiempo
    InteractionsTable   → tabla con polling cada 30s
    DetailPanel         → transcripción y quality breakdown por interacción
  layout/
    Sidebar / Topbar / PageHead / TrialBanner

lib/
  api.js          → cliente del backend (fetch wrapper)
  transforms.js   → transforma respuestas de la API al formato de los componentes
  data.jsx        → datos de demo / fallback
```

---

## Cómo se conecta con el backend

El dashboard consume la API de Ghost Shopper:

| Pantalla | Endpoint |
|---|---|
| KPIs globales | `GET /dashboard/summary` |
| Datos de la empresa | `GET /companies/{company_id}` |
| Tabla de interacciones | `GET /interactions/campaign/{id}` |
| Reporte y hallazgos | `GET /reports/campaign/{id}` |
| Transcripción de llamada | `GET /call-details/interaction/{id}` |
| Mensajes de WhatsApp | `GET /messages/interaction/{id}` |

La tabla de interacciones hace polling cada 30 segundos para reflejar nuevas evaluaciones sin recargar la página.

---

## El equipo

Construido en 24 horas en el **LatAm GTM Hackathon — CDMX 2026**

| Nombre | Rol |
|---|---|
| Luis Ernesto Merida de Leon | Frontend & producto |
| Hector Said Ferreira Rodríguez | AI Voice |
| Tlahuel Mendez Samuel Oswaldo | GTM & diseño |
| Peña Pedraza David | Infraestructura de datos |
| Paolo Flores | Backend & APIs |

---

## Agradecimientos

Gracias a todos los que hicieron posible este hackathon en CDMX.

**Organizadores**  
[LatamBuilds](https://www.latambuilds.com) · [Makers Fellowship](https://makersfellowship.com) · [30X](https://30x.com) · Hack0 Community by Crafter Station

**Sede**  
[Tuhabi México](https://tuhabi.mx) — Paseo de la Reforma 333, CDMX

**Stack que nos dieron para construir esto**  
[ElevenLabs](https://elevenlabs.io) · [Supabase](https://supabase.com) · [Make](https://make.com) · [Groq](https://groq.com) · [Anthropic](https://anthropic.com) · [Cursor](https://cursor.com)
