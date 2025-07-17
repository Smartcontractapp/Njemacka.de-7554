import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { blogPosts } from '../data/blogPosts';

const { FiCalendar, FiClock, FiArrowLeft, FiShare2, FiHeart } = FiIcons;

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Članak nije pronađen</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Vrati se na početnu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Nazad na objave</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-xl text-gray-600 mb-8 font-medium">
            {post.excerpt}
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between border-t pt-8 mt-12"
        >
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
              <span>Sviđa mi se</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
              <span>Podeli</span>
            </button>
          </div>
          
          <Link
            to={`/category/${post.category === 'Putovanja' ? 'travel' : post.category === 'Kultura' ? 'culture' : 'lifestyle'}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Više iz {post.category}
          </Link>
        </motion.div>
      </div>
    </article>
  );
};

export default BlogPost;