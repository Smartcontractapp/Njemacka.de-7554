import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { dailyNews } from '../data/news';

const { FiClock, FiUser, FiArrowLeft, FiShare2, FiHeart, FiAlertTriangle } = FiIcons;

const NewsPost = () => {
  const { id } = useParams();
  const news = dailyNews.find(n => n.id === parseInt(id));

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vijest nije pronađena</h1>
          <Link to="/news" className="text-primary-600 hover:text-primary-700">
            Vrati se na vijesti
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Vijesti': 'bg-blue-500',
      'Kultura': 'bg-purple-500',
      'Transport': 'bg-green-500',
      'Ekonomija': 'bg-yellow-500',
      'Događaji': 'bg-pink-500',
      'Ekologija': 'bg-emerald-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Nazad na vijesti</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                {news.urgent && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <SafeIcon icon={FiAlertTriangle} className="w-3 h-3" />
                    <span>HITNO</span>
                  </span>
                )}
                <span className={`${getCategoryColor(news.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {news.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {news.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{news.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>{news.source}</span>
                </div>
                <span>{news.readTime}</span>
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
            {news.excerpt}
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            {news.content.map((paragraph, index) => (
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
            to={`/news`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Više vijesti iz {news.category}
          </Link>
        </motion.div>

        {/* Related News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Povezane vijesti
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyNews
              .filter(n => n.id !== news.id && n.category === news.category)
              .slice(0, 2)
              .map((relatedNews) => (
                <Link
                  key={relatedNews.id}
                  to={`/news/${relatedNews.id}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex space-x-4">
                      <img
                        src={relatedNews.image}
                        alt={relatedNews.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 mb-2">
                          {relatedNews.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {relatedNews.date} • {relatedNews.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default NewsPost;