import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiMapPin, FiUser, FiTag, FiPhoneCall, FiMail } = FiIcons;

const ClassifiedAd = ({ ad, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={ad.image} 
          alt={ad.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`${
            ad.category === 'Posao' ? 'bg-blue-500' :
            ad.category === 'Stanovanje' ? 'bg-green-500' :
            ad.category === 'Prodaja' ? 'bg-purple-500' :
            ad.category === 'Usluge' ? 'bg-yellow-500' :
            'bg-gray-500'
          } text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {ad.category}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {ad.price ? `${ad.price}€` : 'Dogovor'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {ad.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{ad.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiMapPin} className="w-4 h-4" />
            <span>{ad.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiUser} className="w-4 h-4" />
            <span>{ad.author}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {ad.description}
        </p>
        
        {/* Tags */}
        {ad.tags && ad.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {ad.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
              >
                <SafeIcon icon={FiTag} className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Contact Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
          {ad.phone && (
            <a 
              href={`tel:${ad.phone}`}
              className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
            >
              <SafeIcon icon={FiPhoneCall} className="w-4 h-4" />
              <span>Pozovi</span>
            </a>
          )}
          
          {ad.email && (
            <a 
              href={`mailto:${ad.email}`}
              className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
            >
              <SafeIcon icon={FiMail} className="w-4 h-4" />
              <span>Pošalji email</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClassifiedAd;