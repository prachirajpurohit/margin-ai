'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import slugify from 'slugify'

export default function Composer() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const [saving, setSaving] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto'
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px'
    }
  }, [title])

  const wordCount = (body + ' ' + title).trim().split(/\s+/).filter(Boolean).length

  const publish = async () => {
    if (!title.trim() && !body.trim()) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }

    const baseSlug = slugify(title || 'untitled', { lower: true, strict: true })
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const { error } = await supabase.from('writings').insert({
      title: title.trim() || 'untitled',
      body: body.trim(),
      tag: tag.trim().toLowerCase() || null,
      slug,
      user_id: user.id,
      published: true,
    })

    if (!error) {
      router.push(`/writings/${slug}`)
    } else {
      console.error(error)
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 61px)' }}>
      {/* toolbar */}
      <div style={{
        padding: '16px 32px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 16, background: 'var(--paper)'
      }}>
        <input
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder="tag (e.g. tech, life, fiction)"
          style={{
            fontFamily: 'DM Mono, monospace', fontSize: 12, padding: '6px 12px',
            border: '1px solid var(--border)', borderRadius: 4, background: 'var(--cream)',
            color: 'var(--ink)', outline: 'none', width: 220
          }}
        />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
          {wordCount} words
        </span>
        <button
          onClick={publish}
          disabled={saving || (!title.trim() && !body.trim())}
          style={{
            fontFamily: 'DM Mono, monospace', fontSize: 12, padding: '7px 18px',
            background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4,
            cursor: 'pointer', marginLeft: 'auto', letterSpacing: '0.03em',
            opacity: (saving || (!title.trim() && !body.trim())) ? 0.4 : 1
          }}
        >
          {saving ? 'publishing...' : 'publish →'}
        </button>
      </div>

      {/* editor */}
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1 }}>
        <textarea
          ref={titleRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title."
          rows={1}
          style={{
            fontFamily: 'Syne, sans-serif', fontSize: 52, fontWeight: 800,
            letterSpacing: -2, lineHeight: 1.05, border: 'none', outline: 'none',
            background: 'transparent', color: 'var(--ink)', padding: '40px 64px 16px',
            width: '100%', resize: 'none', overflow: 'hidden'
          }}
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Start writing... the margins are yours."
          style={{
            fontFamily: 'Lora, Georgia, serif', fontSize: 18, lineHeight: 1.75,
            border: 'none', outline: 'none', background: 'transparent', color: '#2a2620',
            padding: '0 64px 40px', width: '100%', flex: 1, resize: 'none', minHeight: 400
          }}
        />
      </div>
    </div>
  )
}
