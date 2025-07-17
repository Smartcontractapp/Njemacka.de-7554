import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CouponCard from '../components/CouponCard';
import { coupons } from '../data/coupons';

const { FiTag, FiFilter, FiStar } = FiIcons;

const Coupons = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = ['Sve', ...new Set(coupons.map(coupon => coupon.category))];

  const filteredCoupons = coupons.filter(coupon => {
    const categoryMatch = selectedCategory === 'Sve' || coupon.category === selectedCategory;
    const featuredMatch = !showFeaturedOnly || coupon.featured;
    return categoryMatch && featuredMatch;
  });

  const featuredCoupons = coupons.filter(coupon => coupon.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiTag} className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kuponi i Popusti
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Otkrijte najbolje ponude i popuste za putovanja, smještaj i kupovinu u Njemačkoj. 
              Uštedite novac uz naše ekskluzivne kupone!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Coupons */}
      {featuredCoupons.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
                <SafeIcon icon={FiStar} className="w-8 h-8 text-yellow-500" />
                <span>Izdvojeni popusti</span>
              </h2>
              <p className="text-lg text-gray-600">
                Najbolje ponude koje ne smijete propustiti
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCoupons.map((coupon, index) => (
                <CouponCard key={coupon.id} coupon={coupon} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter po kategoriji:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Samo izdvojeni</span>
            </label>
          </div>
        </div>
      </section>

      {/* All Coupons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'Sve' ? 'Svi kuponi' : `${selectedCategory} kuponi`}
              <span className="text-primary-600 ml-2">({filteredCoupons.length})</span>
            </h2>
          </div>

          {filteredCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCoupons.map((coupon, index) => (
                <CouponCard key={coupon.id} coupon={coupon} delay={index * 0.1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SafeIcon icon={FiTag} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Nema dostupnih kupona za odabrane filtere.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Želite više ekskluzivnih popusta?
            </h2>
            <p className="text-xl text-primary-100 mb-6">
              Pratite nas na društvenim mrežama i budite prvi koji će saznati za nove kupone i posebne ponude!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Facebook
              </button>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Instagram
              </button>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Newsletter
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Coupons;