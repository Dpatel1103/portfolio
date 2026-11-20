import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import CastleBackdrop from '@/components/CastleBackdrop';
import CandleGlow from '@/components/CandleGlow';
import AmbientMotes from '@/components/AmbientMotes';
import MaraudersFootsteps from '@/components/MaraudersFootsteps';
import BroomstickSilhouettes from '@/components/BroomstickSilhouettes';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import { MischiefProvider } from '@/context/MischiefContext';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IM+Fell+English:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <MischiefProvider>
          <CastleBackdrop />
          <CandleGlow />
          <AmbientMotes />
          <MaraudersFootsteps />
          <BroomstickSilhouettes />
          <Header />
          {children}
          <ScrollRevealInit />
        </MischiefProvider>
      </body>
    </html>
  );
}
