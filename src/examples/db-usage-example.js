import { query, insert, update, remove } from '../lib/db';

// Example of using the unified database interface

// Get users
async function getUsers() {
  try {
    const users = await query('users', {
      select: 'id, name, email, created_at',
      orderBy: 'created_at',
      ascending: false
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Create a user
async function createUser(userData) {
  try {
    const result = await insert('users', {
      ...userData,
      created_at: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update a user
async function updateUser(userId, userData) {
  try {
    const result = await update('users', {
      ...userData,
      updated_at: new Date()
    }, { id: userId });
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete a user
async function deleteUser(userId) {
  try {
    const result = await remove('users', { id: userId });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};