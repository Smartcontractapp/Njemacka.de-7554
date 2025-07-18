import { useState, useEffect } from 'react';
import { newsService, blogService, categoriesService, couponsService, faqService } from '../lib/database';

// Hook for fetching news
export const useNews = (filters = {}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAll(filters);
        setNews(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [JSON.stringify(filters)]);

  return { news, loading, error, refetch: () => fetchNews() };
};

// Hook for fetching single news article
export const useNewsArticle = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await newsService.getById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};

// Hook for fetching blog posts
export const useBlogPosts = (filters = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAll(filters);
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [JSON.stringify(filters)]);

  return { posts, loading, error };
};

// Hook for fetching single blog post
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await blogService.getBySlug(slug);
        setPost(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

// Hook for fetching categories
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesService.getAll();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook for fetching coupons
export const useCoupons = (filters = {}) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const data = await couponsService.getAll(filters);
        setCoupons(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching coupons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [JSON.stringify(filters)]);

  return { coupons, loading, error };
};

// Hook for fetching FAQ
export const useFAQ = (filters = {}) => {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        setLoading(true);
        const data = await faqService.getAll(filters);
        setFaq(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, [JSON.stringify(filters)]);

  return { faq, loading, error };
};