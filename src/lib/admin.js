import supabase from './supabase';

// Post management
export async function createPost(postData) {
  const { data, error } = await supabase
    .from('posts_x8k2m9')
    .insert([{
      ...postData,
      author_id: supabase.auth.user()?.id,
      status: postData.status || 'draft'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, postData) {
  const { data, error } = await supabase
    .from('posts_x8k2m9')
    .update({
      ...postData,
      updated_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase
    .from('posts_x8k2m9')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// News management
export async function createNewsArticle(newsData) {
  const { data, error } = await supabase
    .from('news_articles_x8k2m9')
    .insert([{
      ...newsData,
      author_id: supabase.auth.user()?.id,
      status: newsData.status || 'draft'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateNewsArticle(id, newsData) {
  const { data, error } = await supabase
    .from('news_articles_x8k2m9')
    .update({
      ...newsData,
      updated_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNewsArticle(id) {
  const { error } = await supabase
    .from('news_articles_x8k2m9')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Category management
export async function createCategory(categoryData) {
  const { data, error } = await supabase
    .from('categories_x8k2m9')
    .insert([categoryData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(id, categoryData) {
  const { data, error } = await supabase
    .from('categories_x8k2m9')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories_x8k2m9')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Tag management
export async function createTag(tagData) {
  const { data, error } = await supabase
    .from('tags_x8k2m9')
    .insert([tagData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTag(id, tagData) {
  const { data, error } = await supabase
    .from('tags_x8k2m9')
    .update(tagData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTag(id) {
  const { error } = await supabase
    .from('tags_x8k2m9')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Post tags management
export async function addTagToPost(postId, tagId) {
  const { error } = await supabase
    .from('posts_tags_x8k2m9')
    .insert([{ post_id: postId, tag_id: tagId }]);

  if (error) throw error;
}

export async function removeTagFromPost(postId, tagId) {
  const { error } = await supabase
    .from('posts_tags_x8k2m9')
    .delete()
    .match({ post_id: postId, tag_id: tagId });

  if (error) throw error;
}

// Content analytics
export async function getContentStats(contentType, id) {
  const { data, error } = await supabase
    .from(contentType === 'post' ? 'posts_x8k2m9' : 'news_articles_x8k2m9')
    .select('views, likes')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Draft management
export async function getDrafts(contentType) {
  const { data, error } = await supabase
    .from(contentType === 'post' ? 'posts_x8k2m9' : 'news_articles_x8k2m9')
    .select('*')
    .eq('status', 'draft')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function publishContent(contentType, id) {
  const { data, error } = await supabase
    .from(contentType === 'post' ? 'posts_x8k2m9' : 'news_articles_x8k2m9')
    .update({
      status: 'published',
      published_at: new Date()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}