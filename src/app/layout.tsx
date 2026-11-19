import type { Metadata } from 'next';
import { IM_Fell_English, Crimson_Pro } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import CandleGlow from '@/components/CandleGlow';
import AmbientMotes from '@/components/AmbientMotes';
import ScrollRevealInit from '@/components/ScrollRevealInit';

const imFellEnglish = IM_Fell_English({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-im-fell',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devanshi Patel · Full-Stack Developer & Software Apprentice',
  description:
    'Full-stack developer portfolio of Devanshi Patel — featuring production React and Next.js applications, custom platform widgets, REST API integrations, and healthcare compliance engineering.',
  keywords: [
    'Devanshi Patel',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Duda Widgets',
    'Covrize IT Solutions',
    'Healthcare Compliance',
    'Airtable',
    'REST APIs'
  ],
  authors: [{ name: 'Devanshi Patel' }],
  creator: 'Devanshi Patel',
  openGraph: {
    title: 'Devanshi Patel · Full-Stack Developer & Software Apprentice',
    description:
      'Harry Potter-inspired editorial developer portfolio of Devanshi Patel — showcasing full-stack applications, interactive platform widgets, and technical disciplines.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Devanshi Patel Portfolio'
  },
  icons: {
    icon: '/icon.svg'
  }
};

const themeInitScript = `(function() {
  try {
    var savedTheme = localStorage.getItem('devanshi_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${imFellEnglish.variable} ${crimsonPro.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <CandleGlow />
        <AmbientMotes />
        <Header />
        {children}
        <ScrollRevealInit />
      </body>
    </html>
  );
}
