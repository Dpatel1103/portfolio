import { Spell } from '@/types';

export const SPELLS_DATA: Spell[] = [
  {
    id: 'lumos',
    name: 'Lumos',
    type: 'Illumination Charm',
    skills: 'React, Next.js, HTML/CSS',
    desc: 'Illuminates responsive, component-driven user interfaces with reactive state hierarchies, server-side rendering pipelines, and semantic CSS architecture built for speed and accessibility.',
    tags: ['React.js', 'Next.js', 'HTML5', 'CSS3']
  },
  {
    id: 'accio',
    name: 'Accio',
    type: 'Summoning Charm',
    skills: 'REST APIs, Webhooks, Airtable',
    desc: 'Summons live data streams and payloads across third-party endpoints, orchestrating webhooks, asynchronous data routing, and structured cloud database tables.',
    tags: ['REST APIs', 'Webhooks', 'Airtable', 'JSON']
  },
  {
    id: 'reparo',
    name: 'Reparo',
    type: 'Mending Charm',
    skills: 'Frontend/API Debugging, Postman',
    desc: 'Diagnoses, troubleshoots, and mends fractured network calls, session synchronization errors, and frontend regressions across test and live production environments.',
    tags: ['Debugging', 'Postman', 'DevTools', 'Issue Triage']
  },
  {
    id: 'protego',
    name: 'Protego',
    type: 'Shield Charm',
    skills: 'Auth Flows, Session Tokens, HIPAA Security',
    desc: 'Casts an impenetrable defensive ward over client web apps; implements secure browser session token storage, authenticated access gates, and HIPAA-compliant privacy safeguards.',
    tags: ['Auth Flows', 'Session Tokens', 'HIPAA', 'Security']
  },
  {
    id: 'alohomora',
    name: 'Alohomora',
    type: 'Unlocking Charm',
    skills: 'MySQL, MongoDB, SQL',
    desc: 'Unlocks relational and document-based data vaults; architects normalized database schemas, crafts optimized SQL queries, and guarantees persistent, structured record storage.',
    tags: ['MySQL', 'MongoDB', 'SQL', 'Data Modeling'],
    colSpanFull: true
  }
];
