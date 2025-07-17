import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FAQCard from '../components/FAQCard';
import SEOHead from '../components/SEOHead';
import { faqData } from '../data/faq';

const { FiHelpCircle, FiSearch, FiFilter, FiMessageCircle } = FiIcons;

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sve');

  const categories = ['Sve', ...new Set(faqData.map(faq => faq.category))];

  const filteredFAQ = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Sve' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQ = faqData.filter(faq => faq.views > 1000).slice(0, 3);

  return (
    <>
      <SEOHead
        title="Često Postavljana Pitanja - FAQ"
        description="Pronađite odgovore na najčešća pitanja o životu u Njemačkoj. Saveti o radu, stanovanju, zdravstvu, jeziku i integraciji."
        keywords="FAQ Njemačka, pitanja odgovori, život u Njemačkoj, saveti, pomoć, integracija"
        url="/faq"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SafeIcon icon={FiHelpCircle} className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Često Postavljana Pitanja
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Pronađite odgovore na najčešća pitanja o životu u Njemačkoj. 
                Od dokumentacije do svakodnevnih saveta.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search and Filter */}
        <section className="py-8 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pretražite pitanja..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Popular FAQ */}
        {popularFAQ.length > 0 && (
          <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Najpopularnija pitanja
                </h2>
                <p className="text-lg text-gray-600">
                  Pitanja koja najviše zanimaju našu zajednicu
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularFAQ.map((faq, index) => (
                  <FAQCard key={faq.id} faq={faq} delay={index * 0.1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All FAQ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'Sve' ? 'Sva pitanja' : `${selectedCategory} pitanja`}
                <span className="text-primary-600 ml-2">({filteredFAQ.length})</span>
              </h2>
            </div>

            {filteredFAQ.length > 0 ? (
              <div className="space-y-6">
                {filteredFAQ.map((faq, index) => (
                  <FAQCard key={faq.id} faq={faq} delay={index * 0.05} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SafeIcon icon={FiHelpCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Nema pitanja za vašu pretragu. Pokušajte sa drugim terminom.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SafeIcon icon={FiMessageCircle} className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Nemate odgovor na svoje pitanje?
              </h2>
              <p className="text-xl text-primary-100 mb-6">
                Kontaktirajte nas i naš tim će vam pomoći sa bilo kojim pitanjem o životu u Njemačkoj.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Pošaljite pitanje
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
                  Pridružite se zajednici
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;