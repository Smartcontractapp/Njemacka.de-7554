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

/**
 * Get posts with pagination and filtering
 * @param {Object} options - Query options
 * @returns {Promise} - Query results
 */
export async function getPosts(options = {}) {
  const {
    page = 1,
    limit = 10,
    category = null,
    featured = null,
    search = null,
    orderBy = 'published_at',
    ascending = false
  } = options;

  let query = supabase
    .from('posts_x8k2m9')
    .select('*, categories_x8k2m9(name)', { count: 'exact' })
    .eq('status', 'published');

  if (category) {
    query = query.eq('category_id', category);
  }

  if (featured !== null) {
    query = query.eq('featured', featured);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const { data, error, count } = await query
    .order(orderBy, { ascending })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return {
    data,
    meta: {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit)
    }
  };
}

/**
 * Get news articles with pagination and filtering
 * @param {Object} options - Query options
 * @returns {Promise} - Query results
 */
export async function getNews(options = {}) {
  const {
    page = 1,
    limit = 10,
    category = null,
    urgent = null,
    search = null,
    orderBy = 'published_at',
    ascending = false
  } = options;

  let query = supabase
    .from('news_articles_x8k2m9')
    .select('*', { count: 'exact' })
    .eq('status', 'published');

  if (category) {
    query = query.eq('category', category);
  }

  if (urgent !== null) {
    query = query.eq('is_urgent', urgent);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const { data, error, count } = await query
    .order(orderBy, { ascending })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return {
    data,
    meta: {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit)
    }
  };
}

/**
 * Increment the view count for content
 * @param {string} contentType - The type of content (post, news)
 * @param {string} contentId - The ID of the content
 * @returns {Promise} - Result
 */
export async function incrementViewCount(contentType, contentId) {
  let table;
  
  if (contentType === 'post') {
    table = 'posts_x8k2m9';
  } else if (contentType === 'news') {
    table = 'news_articles_x8k2m9';
  } else {
    throw new Error('Invalid content type');
  }

  const { data, error } = await supabase.rpc('increment_view_count', {
    content_type: contentType,
    content_id: contentId
  });

  if (error) {
    // Fallback if RPC fails
    await supabase
      .from(table)
      .update({ views: supabase.raw('views + 1') })
      .eq('id', contentId);
  }

  return { success: true };
}

export default {
  query,
  insert,
  update,
  remove,
  getPosts,
  getNews,
  incrementViewCount,
  supabase
};