import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 32px' }}>
      <h1 style={{
        fontFamily: 'Syne, sans-serif', fontSize: 80, fontWeight: 800,
        letterSpacing: -4, lineHeight: 0.95, marginBottom: 32
      }}>
        margin<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <p style={{ fontSize: 20, color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 48, maxWidth: 480 }}>
        a distraction-free space for thoughts that don't quite fit anywhere else.
      </p>
      <Link href="/writings" style={{
        fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--accent)',
        textDecoration: 'none', letterSpacing: '0.04em', borderBottom: '1px solid var(--accent)', paddingBottom: 2
      }}>
        read the writings →
      </Link>
    </div>
  )
}
