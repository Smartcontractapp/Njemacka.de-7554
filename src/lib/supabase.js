import { createClient } from '@supabase/supabase-js'

// Project ID will be auto-injected during deployment
const SUPABASE_URL = 'https://bbwpxmquzrrkonyjfngj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJid3B4bXF1enJya29ueWpmbmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjM1MDIsImV4cCI6MjA2ODMzOTUwMn0.sBSgNYdCYWO1vM4is7ZkA91AobpwjfuU0i6ztaGwhTM'

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