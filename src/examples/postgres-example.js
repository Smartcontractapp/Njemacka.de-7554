// This file contains server-side examples only
// For client-side database operations, use src/lib/db.js

/**
 * Example function to test the Supabase PostgreSQL connection
 * This should only be used in server-side environments
 */
async function testConnection() {
  if (typeof window !== 'undefined') {
    throw new Error('This function is only available in server-side environments');
  }
  
  try {
    // Dynamic import for server-side only
    const { default: sql } = await import('../lib/postgres.js');
    
    if (!sql) {
      throw new Error('Postgres client not available');
    }
    
    const result = await sql`SELECT current_timestamp as time, current_database() as database`;
    console.log('Connection successful!', result[0]);
    return result[0];
  } catch (error) {
    console.error('Connection failed:', error);
    throw error;
  }
}

// Example function to create a table if it doesn't exist
async function ensureUsersTable() {
  if (typeof window !== 'undefined') {
    throw new Error('This function is only available in server-side environments');
  }
  
  try {
    const { default: sql } = await import('../lib/postgres.js');
    
    if (!sql) {
      throw new Error('Postgres client not available');
    }
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `;
    return { success: true, message: 'Users table ready' };
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

// Export all functions
export {
  testConnection,
  ensureUsersTable
};