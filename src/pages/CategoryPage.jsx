import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import { categories, categoryPosts } from '../data/categories';

const CategoryPage = () => {
  const { category } = useParams();
  
  // Find category info
  const categoryInfo = categories.find(cat => cat.slug === category);
  
  // Get posts for this category
  const posts = categoryPosts[category] || [];
  
  // Legacy category mapping
  const legacyCategories = {
    'travel': { title: 'Putovanja i mjesta', description: 'Otkrijte najljepše destinacije Njemačke' },
    'culture': { title: 'Kultura i istorija', description: 'Istražite bogato kulturno nasljeđe' },
    'lifestyle': { title: 'Način života', description: 'Naučite o njemačkom načinu života' },
    'jeftina-putovanja': { title: 'Jeftina Putovanja', description: 'Putujte po Njemačkoj po pristupačnim cijenama' },
    'kultura': { title: 'Kultura i istorija', description: 'Istražite bogato kulturno nasljeđe Njemačke' },
    'zivot': { title: 'Način života', description: 'Naučite o njemačkom načinu života i običajima' }
  };
  
  const info = categoryInfo || legacyCategories[category] || { title: category, description: '' };
  
  // For legacy categories, filter from blogPosts
  const filteredPosts = categoryInfo ? posts : blogPosts.filter(
    post => {
      if (category === 'jeftina-putovanja') return post.category === 'Jeftina Putovanja';
      if (category === 'kultura') return post.category === 'Kultura';
      if (category === 'zivot') return post.category === 'Život';
      return post.category.toLowerCase() === getCategoryName(category).toLowerCase();
    }
  );

  function getCategoryName(urlCategory) {
    const categoryMap = {
      'travel': 'Putovanja',
      'culture': 'Kultura', 
      'lifestyle': 'Život',
      'jeftina-putovanja': 'Jeftina Putovanja',
      'kultura': 'Kultura',
      'zivot': 'Život'
    };
    return categoryMap[urlCategory] || urlCategory;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {info.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {info.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Pronađeno {filteredPosts.length} članaka
          </h2>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} delay={index * 0.1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Još nema članaka u ovoj kategoriji.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;