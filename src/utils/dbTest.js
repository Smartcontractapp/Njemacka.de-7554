// This utility is for server-side testing only

async function runDatabaseTests() {
  if (typeof window !== 'undefined') {
    console.error('Database tests can only be run in server-side environments');
    return;
  }
  
  console.log('Testing database connection...');
  
  try {
    // Dynamic import for server-side only
    const { testConnection, ensureUsersTable } = await import('../examples/postgres-example.js');
    
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

export default runDatabaseTests;