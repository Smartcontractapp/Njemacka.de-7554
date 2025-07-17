import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://bbwpxmquzrrkonyjfngj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJid3B4bXF1enJya29ueWpmbmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjM1MDIsImV4cCI6MjA2ODMzOTUwMn0.sBSgNYdCYWO1vM4is7ZkA91AobpwjfuU0i6ztaGwhTM';

// Validate credentials
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase credentials');
}

// Create Supabase client with error handling
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: { 'x-application-name': 'njemacka-blog' }
  }
});

// Add error handling for failed requests
const handleError = (error) => {
  console.error('Supabase Error:', error);
  throw new Error('Failed to connect to database');
};

// Wrap Supabase client with error handling
const supabaseWithErrorHandling = {
  from: (...args) => {
    try {
      return supabase.from(...args);
    } catch (error) {
      handleError(error);
    }
  },
  auth: supabase.auth,
  storage: supabase.storage,
  // Add other needed Supabase features
};

export default supabaseWithErrorHandling;