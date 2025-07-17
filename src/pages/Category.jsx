import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const Category = () => {
  const { category } = useParams();
  const filteredPosts = blogPosts.filter(
    post => post.category.toLowerCase() === getCategoryName(category).toLowerCase()
  );

  function getCategoryName(urlCategory) {
    const categoryMap = {
      'travel': 'Putovanja',
      'culture': 'Kultura', 
      'lifestyle': 'Život'
    };
    return categoryMap[urlCategory] || urlCategory;
  }

  const categoryInfo = {
    travel: {
      title: 'Putovanja i mjesta',
      description: 'Otkrijte najljepše destinacije Njemačke i skrivene dragulji',
      image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    culture: {
      title: 'Kultura i istorija',
      description: 'Istražite bogato kulturno nasljeđe Njemačke i fascinantnu istoriju',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    lifestyle: {
      title: 'Način života',
      description: 'Naučite o njemačkom načinu života, običajima i svakodnevnom životu',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  };

  const info = categoryInfo[category] || { title: category, description: '', image: '' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={info.image}
          alt={info.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {info.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
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

export default Category;