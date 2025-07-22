import supabase from './supabase';

// Post functions
export async function getPosts({ page = 1, limit = 10, category = null, featured = null, search = null, orderBy = 'published_at', ascending = false }) {
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

export async function getPost(slug) {
  const { data, error } = await supabase
    .from('posts_x8k2m9')
    .select(`
      *,
      categories_x8k2m9 (
        name,
        slug
      ),
      tags:posts_tags_x8k2m9 (
        tags_x8k2m9 (
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}

// News functions
export async function getNews({ page = 1, limit = 10, category = null, urgent = null, search = null, orderBy = 'published_at', ascending = false }) {
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

export async function getNewsArticle(slug) {
  const { data, error } = await supabase
    .from('news_articles_x8k2m9')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}

// Content metrics functions
export async function incrementViews(contentType, id) {
  const { error } = await supabase.rpc('increment_view_count', {
    content_type: contentType,
    content_id: id
  });

  if (error) {
    // Fallback if RPC fails
    await supabase
      .from(contentType === 'post' ? 'posts_x8k2m9' : 'news_articles_x8k2m9')
      .update({ views: supabase.raw('views + 1') })
      .eq('id', id);
  }
}

export async function incrementLikes(contentType, id) {
  const { error } = await supabase.rpc('increment_like_count', {
    content_type: contentType,
    content_id: id
  });

  if (error) {
    // Fallback if RPC fails
    await supabase
      .from(contentType === 'post' ? 'posts_x8k2m9' : 'news_articles_x8k2m9')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', id);
  }
}

// Category functions
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories_x8k2m9')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

// Tag functions
export async function getTags() {
  const { data, error } = await supabase
    .from('tags_x8k2m9')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

// Latest content
export async function getLatestContent({ limit = 10, page = 1 }) {
  const { data, error, count } = await supabase
    .from('latest_content_v1')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
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