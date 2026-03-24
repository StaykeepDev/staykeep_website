'use client';

const APP_STORE_URL = 'https://apps.apple.com/app/staykeep/YOUR_APP_STORE_ID';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.staykeep.app';

export default function DeepLinkFallback({ type, id }: { type: string; id?: string }) {
  const titles: Record<string, string> = {
    property: 'View this property on StayKeep',
    booking: 'Manage your booking on StayKeep',
    profile: 'View your profile on StayKeep',
    inbox: 'Check your messages on StayKeep',
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', padding: '24px',
      fontFamily: 'system-ui, sans-serif', textAlign: 'center',
      background: '#fafafa',
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px', padding: '48px 32px',
        maxWidth: '420px', width: '100%',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
        <h1 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 700 }}>
          {titles[type] || 'Open StayKeep'}
        </h1>
        <p style={{ color: '#666', marginBottom: '32px', lineHeight: 1.5 }}>
          Download the StayKeep app to view details, check availability, and book your stay.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <a href={APP_STORE_URL} style={{
            background: '#000', color: '#fff', padding: '14px 28px',
            borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
            display: 'block',
          }}>
            Download on App Store
          </a>
          <a href={PLAY_STORE_URL} style={{
            background: '#000', color: '#fff', padding: '14px 28px',
            borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
            display: 'block',
          }}>
            Get it on Google Play
          </a>
        </div>
      </div>
    </div>
  );
}
