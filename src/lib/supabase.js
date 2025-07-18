import { createClient } from '@supabase/supabase-js'

// Project ID will be auto-injected during deployment
const SUPABASE_URL = 'https://zetrxaqonasnflosckog.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldHJ4YXFvbmFzbmZsb3Nja29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODQ5MDUsImV4cCI6MjA2ODM2MDkwNX0.t5IkDMdhS6kgwY95ZMk0-7PBIzdo0JlNbJzNhiyCAUc'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase