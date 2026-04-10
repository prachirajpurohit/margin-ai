'use client'
import Link from 'next/link'
import type { Writing } from '@/lib/types'

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function WritingCard({ writing }: { writing: Writing }) {
  return (
    <Link href={`/writings/${writing.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'var(--paper)', padding: '28px 24px', cursor: 'pointer',
        transition: 'background 0.15s', position: 'relative', height: '100%'
      }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--paper)')}
      >
        {writing.tag && (
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            {writing.tag}
          </div>
        )}
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, lineHeight: 1.2, marginBottom: 8, letterSpacing: -0.3 }}>
          {writing.title}
        </div>
        <div style={{
          fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {writing.body}
        </div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'var(--muted)', marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <span>{formatDate(writing.created_at)}</span>
          <span>{wordCount(writing.body)} words</span>
        </div>
      </div>
    </Link>
  )
}
