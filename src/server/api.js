import express from 'express';
import sql from '../lib/postgres';

// Create an API router
const router = express.Router();

// Example API endpoints using postgres

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await sql`
      SELECT id, name, email, created_at FROM users
      ORDER BY created_at DESC
    `;
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await sql`
      SELECT id, name, email, created_at FROM users
      WHERE id = ${id}
    `;
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    
    const newUser = await sql`
      INSERT INTO users (name, email, password_hash, created_at)
      VALUES (${name}, ${email}, ${password}, ${new Date()})
      RETURNING id, name, email, created_at
    `;
    
    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    if (!name && !email) {
      return res.status(400).json({ error: 'Name or email is required' });
    }
    
    let query = sql`UPDATE users SET updated_at = ${new Date()}`;
    
    if (name) query = sql`${query}, name = ${name}`;
    if (email) query = sql`${query}, email = ${email}`;
    
    query = sql`${query} WHERE id = ${id} RETURNING id, name, email, updated_at`;
    
    const updatedUser = await query;
    
    if (updatedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id
    `;
    
    if (deletedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;