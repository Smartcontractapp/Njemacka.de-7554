import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp, FiThumbsUp, FiEye, FiTag, FiClock } = FiIcons;

const FAQCard = ({ faq, delay = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = () => {
    setIsHelpful(!isHelpful);
    // Ovde bi se poslao API poziv za ažuriranje
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                {faq.category}
              </span>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiEye} className="w-3 h-3" />
                  <span>{faq.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiThumbsUp} className="w-3 h-3" />
                  <span>{faq.helpful}%</span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SafeIcon 
              icon={isExpanded ? FiChevronUp : FiChevronDown} 
              className="w-5 h-5 text-gray-600" 
            />
          </button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <SafeIcon icon={FiClock} className="w-3 h-3" />
                  <span>Ažurirano: {faq.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Korisno?</span>
                <button
                  onClick={handleHelpful}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                    isHelpful 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                  <span>Da</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {faq.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  <SafeIcon icon={FiTag} className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FAQCard;