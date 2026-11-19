import { SyllabusProject } from '@/types';

export const SYLLABUS_DATA: Record<string, SyllabusProject> = {
  potions: {
    id: 'potions',
    discipline: 'Potions',
    disciplineIcon: '⚗️',
    eyebrow: '✦ Potions Syllabus · Advanced Web Brewing ✦',
    title: 'Remedy Success Centre',
    stack: 'Full-Stack Support Platform · Built with Next.js, React, REST API Routes, and Airtable',
    description:
      'A centralized, full-stack customer support and ticketing portal architected for enterprise client satisfaction, real-time communication, and automated back-office workflows.',
    highlights: [
      'Staff authentication login system gating privileged tools, administrative views, and client communication channels.',
      'Persistent live human support chat powered by browser-stored session tokens, featuring automated DOCX transcript generation upon chat conclusion.',
      'Support and feature-request ticketing workflows connected to Airtable cloud database, Resend transactional email alerts, and live Slack webhook notifications.'
    ],
    tags: [
      'Next.js',
      'React',
      'REST APIs',
      'Airtable',
      'Slack Notifications',
      'Resend Alerts',
      'Session Tokens',
      'DOCX Export'
    ]
  },
  charms: {
    id: 'charms',
    discipline: 'Charms',
    disciplineIcon: '✨',
    eyebrow: '✦ Charms Syllabus · Production Platform Widgets ✦',
    title: 'Review Builder & Listing Suite',
    stack: 'Production Duda Platform Widgets · Built with JavaScript and Google Reviews API',
    description:
      'High-performance embeddable client-facing widgets built for Duda platforms, empowering businesses to manage, filter, and showcase customer reviews dynamically.',
    highlights: [
      'Full CRUD review-source manager allowing administrators to add, update, and manage third-party review endpoints.',
      'Rating-based auto-approval logic that automatically publishes verified 4-star and 5-star testimonials while holding critical reviews for staff triage.',
      'Interactive listing dashboard featuring real-time client-side search, multi-filter sorting, responsive pagination, automated Google import sync, and one-click CSV export.'
    ],
    tags: [
      'JavaScript',
      'Duda Platform',
      'Google Reviews API',
      'CRUD Manager',
      'Auto-Approval Logic',
      'Search & Filtering',
      'Pagination',
      'CSV Export'
    ]
  },
  transfiguration: {
    id: 'transfiguration',
    discipline: 'Transfiguration',
    disciplineIcon: '🔮',
    eyebrow: '✦ Transfiguration Syllabus · Campaign Transmutation ✦',
    title: 'Review Collector & Campaign Manager',
    stack: 'Dual-Mode Customer Feedback & Campaign Delivery · Built with JavaScript, RemedyConnect API, Webhooks, and Airtable',
    description:
      'A dual-mode marketing automation system designed to transmute raw customer sentiment into targeted public testimonials or private resolution threads.',
    highlights: [
      'Dual-mode customer feedback collection and routing based on customer ratings: high ratings route to public platforms, while low ratings route privately for resolution.',
      'Automated campaign delivery pipelines integrated with the RemedyConnect API, dispatching targeted SMS and email follow-ups.',
      'Real-time campaign delivery tracking with comprehensive audit logs, asynchronous webhooks, and automatic record synchronization with Airtable.'
    ],
    tags: [
      'JavaScript',
      'RemedyConnect API',
      'Webhooks',
      'Airtable',
      'Feedback Routing',
      'Campaign Delivery',
      'Audit Logs'
    ]
  },
  'dark-arts': {
    id: 'dark-arts',
    discipline: 'Defence Against the Dark Arts',
    disciplineIcon: '🛡️',
    eyebrow: '✦ Defence Against the Dark Arts · Security & Wards ✦',
    title: 'Session & Compliance Hardening',
    stack: 'Security, Auth & Compliance Engineering · Auth Flows, Session Hardening & HIPAA Guidelines',
    description:
      'Defensive web architecture safeguards and compliance protocols shielding healthcare applications from unauthorized access, session hijacking, and regulatory vulnerabilities.',
    highlights: [
      'Production cookie-consent automation tools ensuring strict adherence to global privacy regulations across client sites.',
      'Secure browser session-token management across isolated staging, testing, and live production environments.',
      'HIPAA-compliant data handling workflows enforcing Protected Health Information (PHI) encryption, safe payload transmission, and audit logging.'
    ],
    tags: [
      'Auth Flows',
      'Session Tokens',
      'Cookie Consent',
      'HIPAA Compliance',
      'PHI Security',
      'Sanitization',
      'Environment Isolation'
    ]
  }
};
