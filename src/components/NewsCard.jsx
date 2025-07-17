import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiUser, FiArrowRight, FiAlertTriangle } = FiIcons;

const NewsCard = ({ news, delay = 0, compact = false }) => {
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

  if (compact) {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        {news.urgent && (
          <div className="flex-shrink-0 mt-1">
            <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-red-500" />
          </div>
        )}
        <img
          src={news.image}
          alt={news.title}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`${getCategoryColor(news.category)} text-white px-2 py-1 rounded text-xs font-medium`}>
              {news.category}
            </span>
            <span className="text-xs text-gray-500">{news.date}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
            <Link to={`/news/${news.id}`} className="hover:text-primary-600">
              {news.title}
            </Link>
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {news.excerpt}
          </p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {news.urgent && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <SafeIcon icon={FiAlertTriangle} className="w-3 h-3" />
              <span>HITNO</span>
            </span>
          )}
          <span className={`${getCategoryColor(news.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {news.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="w-4 h-4" />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiUser} className="w-4 h-4" />
            <span>{news.source}</span>
          </div>
          <span>{news.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          <Link to={`/news/${news.id}`}>
            {news.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {news.excerpt}
        </p>

        <Link
          to={`/news/${news.id}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-all duration-200"
        >
          <span>Pročitajte više</span>
          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
};

export default NewsCard;