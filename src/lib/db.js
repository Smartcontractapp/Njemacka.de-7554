// This file provides a unified database interface
// that can use either Supabase or direct Postgres

import supabase from './supabase';

// For client-side, we'll primarily use Supabase
const useSupabase = true;

/**
 * Execute a query using the configured database
 * @param {string} table - The table to query
 * @param {Object} options - Query options
 * @returns {Promise} - Query results
 */
export async function query(table, options = {}) {
  if (useSupabase) {
    const { data, error } = await supabase
      .from(table)
      .select(options.select || '*')
      .order(options.orderBy || 'id', { ascending: options.ascending !== false });
      
    if (error) throw error;
    return data;
  } else {
    throw new Error('Direct postgres queries not available in client environment');
  }
}

/**
 * Insert data into a table
 * @param {string} table - The table to insert into
 * @param {Object} data - The data to insert
 * @returns {Promise} - Inserted data
 */
export async function insert(table, data) {
  if (useSupabase) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();
      
    if (error) throw error;
    return result;
  } else {
    throw new Error('Direct postgres queries not available in client environment');
  }
}

/**
 * Update data in a table
 * @param {string} table - The table to update
 * @param {Object} data - The data to update
 * @param {Object} where - The where clause
 * @returns {Promise} - Updated data
 */
export async function update(table, data, where) {
  if (useSupabase) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .match(where)
      .select();
      
    if (error) throw error;
    return result;
  } else {
    throw new Error('Direct postgres queries not available in client environment');
  }
}

/**
 * Delete data from a table
 * @param {string} table - The table to delete from
 * @param {Object} where - The where clause
 * @returns {Promise} - Deleted data
 */
export async function remove(table, where) {
  if (useSupabase) {
    const { data: result, error } = await supabase
      .from(table)
      .delete()
      .match(where)
      .select();
      
    if (error) throw error;
    return result;
  } else {
    throw new Error('Direct postgres queries not available in client environment');
  }
}

export default {
  query,
  insert,
  update,
  remove,
  supabase
};