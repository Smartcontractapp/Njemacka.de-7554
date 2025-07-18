import supabase from './supabase';

// News Articles Functions
export const newsService = {
  // Get all news articles
  async getAll(filters = {}) {
    let query = supabase
      .from('news_articles_nh72ja45kl')
      .select(`
        *,
        categories_nh72ja45kl!inner(name, slug, color)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters.category) {
      query = query.eq('categories_nh72ja45kl.slug', filters.category);
    }

    if (filters.urgent) {
      query = query.eq('is_urgent', true);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get single news article
  async getById(id) {
    const { data, error } = await supabase
      .from('news_articles_nh72ja45kl')
      .select(`
        *,
        categories_nh72ja45kl!inner(name, slug, color)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    // Increment view count
    await this.incrementViews(id);
    
    return data;
  },

  // Increment view count
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_news_views', { news_id: id });
    if (error) console.error('Error incrementing views:', error);
  },

  // Create new news article (admin only)
  async create(articleData) {
    const { data, error } = await supabase
      .from('news_articles_nh72ja45kl')
      .insert([articleData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update news article (admin only)
  async update(id, updates) {
    const { data, error } = await supabase
      .from('news_articles_nh72ja45kl')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Blog Posts Functions
export const blogService = {
  // Get all blog posts
  async getAll(filters = {}) {
    let query = supabase
      .from('blog_posts_nh72ja45kl')
      .select(`
        *,
        categories_nh72ja45kl!inner(name, slug, color)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters.category) {
      query = query.eq('categories_nh72ja45kl.slug', filters.category);
    }

    if (filters.featured) {
      query = query.eq('is_featured', true);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get single blog post by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts_nh72ja45kl')
      .select(`
        *,
        categories_nh72ja45kl!inner(name, slug, color)
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment view count
    await this.incrementViews(data.id);
    
    return data;
  },

  // Increment view count
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_blog_views', { blog_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Categories Functions
export const categoriesService = {
  // Get all categories
  async getAll() {
    const { data, error } = await supabase
      .from('categories_nh72ja45kl')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  // Get category by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('categories_nh72ja45kl')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }
};

// Coupons Functions
export const couponsService = {
  // Get all active coupons
  async getAll(filters = {}) {
    let query = supabase
      .from('coupons_nh72ja45kl')
      .select('*')
      .eq('is_active', true)
      .gte('valid_until', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (filters.featured) {
      query = query.eq('is_featured', true);
    }

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get coupon by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('coupons_nh72ja45kl')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

// FAQ Functions
export const faqService = {
  // Get all FAQ items
  async getAll(filters = {}) {
    let query = supabase
      .from('faq_nh72ja45kl')
      .select('*')
      .order('views', { ascending: false });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      query = query.or(`question.ilike.%${filters.search}%,answer.ilike.%${filters.search}%`);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Increment FAQ views
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_faq_views', { faq_id: id });
    if (error) console.error('Error incrementing FAQ views:', error);
  },

  // Mark FAQ as helpful
  async markHelpful(id) {
    const { error } = await supabase.rpc('increment_faq_helpful', { faq_id: id });
    if (error) console.error('Error marking FAQ as helpful:', error);
  }
};

// Statistics Functions
export const statsService = {
  // Get general statistics
  async getStats() {
    const [newsCount, blogCount, faqCount, couponsCount] = await Promise.all([
      supabase.from('news_articles_nh72ja45kl').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts_nh72ja45kl').select('id', { count: 'exact', head: true }),
      supabase.from('faq_nh72ja45kl').select('id', { count: 'exact', head: true }),
      supabase.from('coupons_nh72ja45kl').select('id', { count: 'exact', head: true })
    ]);

    return {
      newsCount: newsCount.count || 0,
      blogCount: blogCount.count || 0,
      faqCount: faqCount.count || 0,
      couponsCount: couponsCount.count || 0
    };
  }
};