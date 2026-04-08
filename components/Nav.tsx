'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/write` }
  })

  const signOut = () => supabase.auth.signOut()

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 32px', borderBottom: '1px solid var(--border)',
      background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: 'var(--ink)', textDecoration: 'none' }}>
        margin<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href="/writings" style={tabStyle}>writings</Link>
        {user && <Link href="/write" style={tabStyle}>compose</Link>}
        {user
          ? <button onClick={signOut} style={mutedBtnStyle}>sign out</button>
          : <button onClick={signIn} style={accentBtnStyle}>sign in with google →</button>
        }
      </div>
    </nav>
  )
}

const tabStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace', fontSize: 12, padding: '6px 14px',
  border: '1px solid var(--border)', borderRadius: 4, color: 'var(--muted)',
  textDecoration: 'none', letterSpacing: '0.03em', background: 'var(--cream)'
}
const accentBtnStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace', fontSize: 12, padding: '7px 16px',
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4,
  cursor: 'pointer', letterSpacing: '0.03em'
}
const mutedBtnStyle: React.CSSProperties = {
  fontFamily: 'DM Mono, monospace', fontSize: 12, padding: '7px 16px',
  background: 'none', color: 'var(--muted)', border: '1px solid var(--border)',
  borderRadius: 4, cursor: 'pointer', letterSpacing: '0.03em'
}
