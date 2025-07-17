import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiMapPin, FiPhone, FiMail, FiGlobe, FiClock, FiMessageSquare, 
  FiHeart, FiStar, FiCheck, FiActivity, FiScale, FiCoffee, 
  FiScissors, FiTruck, FiDollarSign, FiCalculator, FiFlag, 
  FiTool, FiMonitor, FiShield, FiSmile
} = FiIcons;

const ServiceCard = ({ service, delay = 0 }) => {
  const getCategoryIcon = (category) => {
    const iconMap = {
      'doktori': FiHeart,
      'zubari': FiSmile,
      'zdravstvene-usluge': FiActivity,
      'pravna-podrska': FiScale,
      'ugostiteljstvo': FiCoffee,
      'beauty-saloni': FiScissors,
      'auto': FiTruck,
      'financije': FiDollarSign,
      'racunovode': FiCalculator,
      'ambasade': FiFlag,
      'gradjevinski-radovi': FiTool,
      'frizerski-saloni': FiScissors,
      'prevodilacke-usluge': FiGlobe,
      'it-usluge': FiMonitor,
      'osiguranje': FiShield
    };
    return iconMap[category] || FiHeart;
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'doktori': 'text-red-600 bg-red-100',
      'zubari': 'text-blue-600 bg-blue-100',
      'zdravstvene-usluge': 'text-green-600 bg-green-100',
      'pravna-podrska': 'text-purple-600 bg-purple-100',
      'ugostiteljstvo': 'text-orange-600 bg-orange-100',
      'beauty-saloni': 'text-pink-600 bg-pink-100',
      'auto': 'text-gray-600 bg-gray-100',
      'financije': 'text-green-600 bg-green-100',
      'racunovode': 'text-blue-600 bg-blue-100',
      'ambasade': 'text-red-600 bg-red-100',
      'gradjevinski-radovi': 'text-yellow-600 bg-yellow-100',
      'frizerski-saloni': 'text-purple-600 bg-purple-100',
      'prevodilacke-usluge': 'text-indigo-600 bg-indigo-100',
      'it-usluge': 'text-blue-600 bg-blue-100',
      'osiguranje': 'text-green-600 bg-green-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  const CategoryIcon = getCategoryIcon(service.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className={`p-2 rounded-full ${getCategoryColor(service.category)}`}>
            <SafeIcon icon={CategoryIcon} className="w-4 h-4" />
          </div>
          {service.verified && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
              Verifikovano
            </span>
          )}
          {service.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Izdvojeno
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.subcategory}</p>
          </div>
          {service.rating && (
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">{service.rating}</span>
              <span className="text-xs text-gray-500">({service.reviewCount})</span>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 flex-shrink-0" />
            <span>{service.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiClock} className="w-4 h-4 flex-shrink-0" />
            <span>Danas: {service.openingHours.monday}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {service.languages && service.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {service.languages.slice(0, 3).map((language, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {language}
              </span>
            ))}
            {service.languages.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                +{service.languages.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <a
              href={`tel:${service.phone}`}
              className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
              title="Pozovi"
            >
              <SafeIcon icon={FiPhone} className="w-4 h-4" />
            </a>
            {service.whatsapp && (
              <a
                href={`https://wa.me/${service.whatsapp.replace(/\+|\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                title="WhatsApp"
              >
                <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
              </a>
            )}
            {service.website && (
              <a
                href={service.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Website"
              >
                <SafeIcon icon={FiGlobe} className="w-4 h-4" />
              </a>
            )}
          </div>
          <Link
            to={`/services/${service.id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>Detalji</span>
            <SafeIcon icon={FiIcons.FiArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;