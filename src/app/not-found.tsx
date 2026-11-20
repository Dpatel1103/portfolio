import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="folio-container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
      <span className="editorial-badge">✦ Page Dissolved ✦</span>
      <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        404 · Uncharted Territory
      </h1>
      <p className="section-subtitle" style={{ maxWidth: '540px', margin: '0 auto 2rem' }}>
        This corridor appears to have vanished from the Marauder&apos;s Map. The ink has faded into the parchment.
      </p>
      <Link href="/" className="wax-btn" style={{ display: 'inline-block' }}>
        Return to the Common Room
      </Link>
    </div>
  );
}
