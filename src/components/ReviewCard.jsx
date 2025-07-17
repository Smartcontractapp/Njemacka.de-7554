import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiThumbsUp, FiThumbsDown, FiFlag } = FiIcons;

const ReviewCard = ({ review, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <SafeIcon
                  key={idx}
                  icon={FiStar}
                  className={`w-5 h-5 ${
                    idx < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {review.date}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {review.title}
          </h3>
        </div>
        {review.verified && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Verificiran kupac
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4">
        {review.comment}
      </p>

      {review.image && (
        <div className="mb-4">
          <img
            src={review.image}
            alt="Review"
            className="rounded-lg max-h-48 object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
            <span>{review.helpful || 0}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <SafeIcon icon={FiThumbsDown} className="w-4 h-4" />
            <span>{review.notHelpful || 0}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {review.name}
          </span>
          <button
            title="Prijavi recenziju"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <SafeIcon icon={FiFlag} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;