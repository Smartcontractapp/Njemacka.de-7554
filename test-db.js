// Simple script to test database connection
import { testConnection, ensureUsersTable } from './src/examples/postgres-example.js';

async function runTests() {
  console.log('Testing Supabase PostgreSQL connection...');
  
  try {
    // Test the connection
    const connectionResult = await testConnection();
    console.log('✅ Connection successful!');
    console.log(`Connected to database: ${connectionResult.database}`);
    console.log(`Server time: ${connectionResult.time}`);
    
    // Ensure the users table exists
    const tableResult = await ensureUsersTable();
    console.log('✅ Table check successful:', tableResult.message);
    
    console.log('\nAll database tests passed! Your connection is working properly.');
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Please check your database credentials and connection.');
  }
}

runTests();