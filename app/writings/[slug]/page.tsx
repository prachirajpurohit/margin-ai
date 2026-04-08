import { createClient } from '@supabase/supabase-js'
import type { Writing } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}
function readTime(text: string) {
  return Math.ceil(wordCount(text) / 200)
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function getWriting(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase.from('writings').select('*').eq('slug', slug).eq('published', true).single()
  return data as Writing | null
}

export default async function WritingPage({ params }: { params: { slug: string } }) {
  const writing = await getWriting(params.slug)
  if (!writing) notFound()

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>
      <Link href="/writings" style={{
        fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)',
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40
      }}>
        ← back
      </Link>

      {writing.tag && (
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          {writing.tag}
        </div>
      )}

      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 52, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 24 }}>
        {writing.title}
      </h1>

      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--muted)', paddingBottom: 32, borderBottom: '1px solid var(--border)', marginBottom: 40 }}>
        {formatDate(writing.created_at)} · {wordCount(writing.body)} words · {readTime(writing.body)} min read
      </div>

      <div style={{ fontSize: 18, lineHeight: 1.75, color: '#2a2620' }}>
        {writing.body.split('\n\n').map((para, i) => (
          <p key={i} style={{ marginBottom: '1.4em' }}>{para}</p>
        ))}
      </div>
    </div>
  )
}
