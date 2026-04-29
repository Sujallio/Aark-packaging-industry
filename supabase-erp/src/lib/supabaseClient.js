import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL')
  if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY')
  
  console.error('❌ Missing Supabase Configuration')
  console.error('Missing environment variables:', missingVars.join(', '))
  console.error('')
  console.error('📋 Setup Instructions:')
  console.error('1. Go to https://supabase.com and create/access your project')
  console.error('2. Get your Project URL and Anon Key from Settings > API')
  console.error('3. Add to .env.local (local) or Vercel Environment Variables:')
  console.error('   - VITE_SUPABASE_URL = your_project_url')
  console.error('   - VITE_SUPABASE_ANON_KEY = your_anon_key')
  console.error('')
  
  throw new Error(`Missing Supabase configuration: ${missingVars.join(', ')}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
