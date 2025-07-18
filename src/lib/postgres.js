// Note: This file is only for server-side usage
// Client-side should use Supabase client instead

const createPostgresClient = () => {
  // Only import postgres on server-side
  if (typeof window === 'undefined') {
    try {
      const postgres = require('postgres');
      const connectionString = process.env.DATABASE_URL;
      
      if (!connectionString) {
        console.warn('DATABASE_URL not found, postgres client not initialized');
        return null;
      }
      
      return postgres(connectionString, {
        ssl: { rejectUnauthorized: false },
        max: 10,
        idle_timeout: 30,
      });
    } catch (error) {
      console.warn('Postgres not available in client environment');
      return null;
    }
  }
  return null;
};

const sql = createPostgresClient();

export default sql;