import { createClient } from '@supabase/supabase-js'
import WritingCard from '@/components/WritingCard'
import type { Writing } from '@/lib/types'

async function getWritings(tag?: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  let query = supabase.from('writings').select('*').eq('published', true).order('created_at', { ascending: false })
  if (tag) query = query.eq('tag', tag)
  const { data } = await query
  return data as Writing[]
}

async function getTags() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('writings').select('tag').eq('published', true)
  const tags = [...new Set((data || []).map((w: any) => w.tag).filter(Boolean))]
  return tags as string[]
}

export default async function WritingsPage({ searchParams }: { searchParams: { tag?: string } }) {
  const [writings, tags] = await Promise.all([getWritings(searchParams.tag), getTags()])

  return (
    <div style={{ padding: '40px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
          margin<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, fontStyle: 'italic' }}>
          {writings?.length ?? 0} writings in the margins
        </p>
      </div>

      {/* tag filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
        {['all', ...tags].map(t => (
          <a key={t} href={t === 'all' ? '/writings' : `/writings?tag=${t}`} style={{
            fontFamily: 'DM Mono, monospace', fontSize: 11, padding: '5px 12px',
            border: '1px solid var(--border)', borderRadius: 20, cursor: 'pointer',
            textDecoration: 'none', letterSpacing: '0.04em',
            background: (searchParams.tag === t || (!searchParams.tag && t === 'all')) ? 'var(--ink)' : 'none',
            color: (searchParams.tag === t || (!searchParams.tag && t === 'all')) ? 'var(--paper)' : 'var(--muted)',
            borderColor: (searchParams.tag === t || (!searchParams.tag && t === 'all')) ? 'var(--ink)' : 'var(--border)',
          }}>
            {t}
          </a>
        ))}
      </div>

      {/* grid */}
      {writings?.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {writings.map(w => <WritingCard key={w.id} writing={w} />)}
        </div>
      ) : (
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--muted)', marginBottom: 12 }}>nothing here yet.</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic' }}>hit compose to put something in the margins.</p>
        </div>
      )}
    </div>
  )
}
