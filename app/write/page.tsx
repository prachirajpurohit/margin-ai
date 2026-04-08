import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Composer from '@/components/Composer'

export default function WritePage() {
  return <Composer />
}
