import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCopy, FiCheck, FiClock, FiTag, FiExternalLink, FiInfo } = FiIcons;

const CouponCard = ({ coupon, delay = 0 }) => {
  const [copied, setCopied] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
        coupon.featured ? 'ring-2 ring-primary-200' : ''
      }`}
    >
      {coupon.featured && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm font-medium">
          ⭐ Izdvojen popust
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={coupon.image}
          alt={coupon.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {coupon.discount} OFF
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {coupon.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {coupon.title}
          </h3>
          <span className="text-sm font-medium text-gray-500">{coupon.company}</span>
        </div>

        <p className="text-gray-600 mb-4 text-sm">
          {coupon.description}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Kod kupona:</p>
              <code className="text-lg font-bold text-primary-600 bg-white px-2 py-1 rounded border">
                {coupon.code}
              </code>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
              <span>{copied ? 'Kopirano!' : 'Kopiraj'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="w-4 h-4" />
            <span>Važi do: {coupon.validUntil}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
          >
            <SafeIcon icon={FiInfo} className="w-4 h-4" />
            <span>Uslovi korišćenja</span>
          </button>
          
          <a
            href={coupon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <span>Iskoristi</span>
            <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
          </a>
        </div>

        {showTerms && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <h4 className="font-medium text-gray-900 mb-2">Uslovi korišćenja:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {coupon.terms.map((term, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <SafeIcon icon={FiTag} className="w-3 h-3 mt-1 text-primary-500" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CouponCard;