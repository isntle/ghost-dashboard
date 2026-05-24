/* Dummy data — would come from API in production */

const protocolData = [
  { key: 'price',      label: 'Dio el precio',            iconKey: 'Dollar', pct: 42, target: 85, count: '91 / 217',  level: 'bad'  },
  { key: 'followup',   label: 'Hizo seguimiento',         iconKey: 'Chat',   pct: 28, target: 70, count: '61 / 217',  level: 'bad'  },
  { key: 'close',      label: 'Intentó cerrar la venta',  iconKey: 'Tick',   pct: 18, target: 60, count: '39 / 217',  level: 'bad'  },
  { key: 'name',       label: 'Usó el nombre del cliente',iconKey: 'Users',  pct: 71, target: 80, count: '154 / 217', level: 'warn' },
  { key: 'visit',      label: 'Agendó visita / cita',     iconKey: 'Home',   pct: 54, target: 70, count: '117 / 217', level: 'warn' },
  { key: 'greeting',   label: 'Saludo en < 60s',          iconKey: 'Clock',  pct: 88, target: 90, count: '191 / 217', level: 'good' },
  { key: 'objections', label: 'Resolvió objeciones',      iconKey: 'Speech', pct: 35, target: 65, count: '76 / 217',  level: 'bad'  },
];

const insightsData = [
  { sev: 'crit', mark: '!', title: 'Estás perdiendo el 40% de tus leads de WhatsApp',
    body: <>Tus agentes tardan en promedio <b>8m 32s</b> en responder por WhatsApp. Después de 5 minutos, el <b>78%</b> de los prospectos ya no contesta. <b>Pérdida estimada: $1.2M MXN/mes en pipeline.</b></>,
    meta: [{label: 'Impacto', value: 'CRÍTICO', tone: 'bad'}, {label: 'Confianza', value: '94%'}],
    cta: 'Habilitar bot de primer contacto →' },
  { sev: 'crit', mark: '!', title: 'Sólo 1 de cada 5 vendedores intenta cerrar la venta',
    body: <>El 82% de las interacciones termina sin un <i>call to action</i> claro. Tus agentes informan, pero no venden. <b>Carlos R.</b> y <b>Mariana T.</b> son los que más fallan en este punto (0 cierres en 38 interacciones).</>,
    meta: [{label: 'Impacto', value: 'CRÍTICO', tone: 'bad'}],
    cta: 'Ver script sugerido →' },
  { sev: 'warn', mark: '▲', title: 'Sólo el 42% comparte el precio cuando se le pregunta',
    body: <>Cuando la persona pregunta directamente por el precio, el vendedor responde con evasivas (<i>"déjame revisar"</i>) en el 58% de los casos, generando fricción medible en el score de calidad.</>,
    meta: [{label: 'Impacto', value: 'ALTO', tone: 'warn'}],
    cta: 'Capacitación express →' },
  { sev: 'good', mark: '✓', title: 'Maite Rodríguez es tu top performer (8.4/10)',
    body: <>Maite cumple el protocolo el <b>92%</b> de las veces y cierra el <b>61%</b> de sus interacciones. Considera replicar su script con el resto del equipo.</>,
    meta: [],
    cta: 'Clonar su script al equipo →' },
];

const agentRanking = [
  { rank: 1,  name: 'Maite Rodríguez',  initials: 'MR', evals: 24, comply: 92, score: 8.4, level: 'good', trend: 'up',   av: 'from-emerald-400 to-emerald-700' },
  { rank: 2,  name: 'Jorge Salinas',    initials: 'JS', evals: 19, comply: 78, score: 7.6, level: 'good', trend: 'up',   av: 'from-blue-400 to-blue-800' },
  { rank: 3,  name: 'Paola Vega',       initials: 'PV', evals: 22, comply: 61, score: 6.8, level: 'warn', trend: 'flat', av: 'from-pink-400 to-pink-900' },
  { rank: '…',name: '5 vendedores entre 5.0 — 6.5', initials: '+5', evals: null, comply: null, score: null, level: 'mid' },
  { rank: 9,  name: 'Carlos Rentería',  initials: 'CR', evals: 18, comply: 22, score: 3.9, level: 'bad',  trend: 'down', av: 'from-red-300 to-red-800' },
  { rank: 10, name: 'Mariana Tovar',    initials: 'MT', evals: 20, comply: 18, score: 3.4, level: 'bad',  trend: 'down', av: 'from-red-400 to-red-900' },
];

const channelMix = [
  { key: 'call', label: 'Llamada',  icon: '📞', iconClass: 'bg-gradient-to-br from-brand-light to-brand-ink text-white', good: 48, warn: 14, bad: 8,  no: 30, evals: 82 },
  { key: 'wa',   label: 'WhatsApp', icon: 'WA', iconClass: 'bg-gradient-to-br from-emerald-400 to-emerald-700 text-white', good: 31, warn: 18, bad: 11, no: 40, evals: 98 },
  { key: 'em',   label: 'Email',    icon: '@',  iconClass: 'bg-gradient-to-br from-gray-500 to-gray-800 text-white', good: 14, warn: 9,  bad: 6,  no: 71, evals: 37 },
];

const interactions = [
  { id: 'r1', when: 'Hoy, 13:42', date: '2026-05-22', channel: 'wa',  persona: 'Cliente Inversor',  pseudo: '"Andrea Mendoza"',   av: 'from-orange-300 to-orange-700', inits: 'CI', agent: 'Mariana Tovar',    status: 'no-answer', checks: [false,false,false,false], score: 2.1, level: 'bad',  highlight: false },
  { id: 'r2', when: 'Hoy, 12:14', date: '2026-05-22', channel: 'call',persona: 'Familia Primeriza', pseudo: '"Ricardo & Sofía Vélez"', av: 'from-indigo-300 to-indigo-800', inits: 'FP', agent: 'Carlos Rentería',  status: 'answered',  checks: [true,false,false,true], score: 3.4, level: 'bad',  highlight: true },
  { id: 'r3', when: 'Hoy, 10:08', date: '2026-05-22', channel: 'wa',  persona: 'Expat Comprador',   pseudo: '"James O\'Connor"',  av: 'from-amber-300 to-amber-800', inits: 'EX', agent: 'Maite Rodríguez',  status: 'answered',  checks: [true,true,true,true], score: 9.1, level: 'good' },
  { id: 'r4', when: 'Ayer, 18:51',date: '2026-05-21', channel: 'em',  persona: 'Empresa Mediana',   pseudo: '"Pablo Hinojosa"',   av: 'from-emerald-300 to-emerald-700', inits: 'EM', agent: 'Paola Vega',       status: 'pending',   checks: [false,false,false,true], score: 5.7, level: 'warn' },
  { id: 'r5', when: 'Ayer, 16:33',date: '2026-05-21', channel: 'call',persona: 'Cliente Inversor',  pseudo: '"Andrea Mendoza"',   av: 'from-orange-300 to-orange-700', inits: 'CI', agent: 'Jorge Salinas',    status: 'answered',  checks: [true,true,false,true], score: 7.8, level: 'good' },
  { id: 'r6', when: 'Ayer, 11:02',date: '2026-05-21', channel: 'wa',  persona: 'Familia Primeriza', pseudo: '"Daniela Ortega"',   av: 'from-indigo-300 to-indigo-800', inits: 'FP', agent: 'Mariana Tovar',    status: 'answered',  checks: [false,false,false,false], score: 2.8, level: 'bad', subStatus: '(8m 14s)' },
  { id: 'r7', when: '20 may, 17:20', date: '2026-05-20', channel: 'call', persona: 'Expat Comprador', pseudo: '"Sarah Whitman"',  av: 'from-amber-300 to-amber-800', inits: 'EX', agent: 'Maite Rodríguez', status: 'answered',  checks: [true,true,true,true], score: 8.6, level: 'good' },
];

const transcript = [
  { t: '00:03', who: 'bot',   name: 'BOT',    text: 'Hola, buenas tardes. Vi su anuncio del departamento en Polanco. ¿Sigue disponible?' },
  { t: '00:09', who: 'agent', name: 'CARLOS', text: 'Sí, claro, dígame su nombre por favor.' },
  { t: '00:14', who: 'bot',   name: 'BOT',    text: 'Soy Ricardo Vélez. Me interesa saber el precio y si manejan crédito infonavit.' },
  { t: '00:22', who: 'agent', name: 'CARLOS', text: 'Mucho gusto Ricardo. ', hl: 'El depa está en 4.8 millones', tail: ', sí aceptamos infonavit.' },
  { t: '00:31', who: 'bot',   name: 'BOT',    text: 'Es un poco alto, ¿hay flexibilidad? Mi presupuesto está cerca de 4.3.' },
  { t: '00:38', who: 'agent', name: 'CARLOS', text: '', hlBad: 'Mmm pues está difícil, así está el precio. Si gusta lo pensamos.' },
  { t: '00:46', who: 'bot',   name: 'BOT',    text: 'Ok, gracias. ¿Me agendaría una visita?' },
  { t: '00:51', who: 'agent', name: 'CARLOS', text: 'Cuando quiera, ahí me avisa…' },
];

window.GS_DATA = { protocolData, insightsData, agentRanking, channelMix, interactions, transcript };
