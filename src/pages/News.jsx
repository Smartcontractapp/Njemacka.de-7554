import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import NewsCard from '../components/NewsCard';
import { dailyNews } from '../data/news';

const { FiRss, FiFilter, FiAlertTriangle, FiClock } = FiIcons;

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);

  const categories = ['Sve', ...new Set(dailyNews.map(news => news.category))];

  const filteredNews = dailyNews.filter(news => {
    const categoryMatch = selectedCategory === 'Sve' || news.category === selectedCategory;
    const urgentMatch = !showUrgentOnly || news.urgent;
    return categoryMatch && urgentMatch;
  });

  const urgentNews = dailyNews.filter(news => news.urgent);
  const latestNews = dailyNews.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiRss} className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dnevne Vijesti
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ostanite informisani o najnovijim događajima iz Njemačke. 
              Pratite najważnije vijesti iz politike, ekonomije, kulture i društva.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Urgent News */}
      {urgentNews.length > 0 && (
        <section className="py-8 bg-red-50 border-l-4 border-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-6"
            >
              <SafeIcon icon={FiAlertTriangle} className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-red-900">Hitne vijesti</h2>
            </motion.div>
            
            <div className="space-y-4">
              {urgentNews.map((news, index) => (
                <NewsCard key={news.id} news={news} delay={index * 0.1} compact={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <SafeIcon icon={FiClock} className="w-8 h-8 text-primary-600" />
              <span>Najnovije vijesti</span>
            </h2>
            <p className="text-lg text-gray-600">
              Ostanite u toku sa najnovijim događajima
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {latestNews.slice(0, 2).map((news, index) => (
              <NewsCard key={news.id} news={news} delay={index * 0.1} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.slice(2).map((news, index) => (
              <NewsCard key={news.id} news={news} delay={(index + 2) * 0.1} />
            ))}
          </div>
        </div>
      </section>

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
                checked={showUrgentOnly}
                onChange={(e) => setShowUrgentOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Samo hitne vijesti</span>
            </label>
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'Sve' ? 'Sve vijesti' : `${selectedCategory} vijesti`}
              <span className="text-primary-600 ml-2">({filteredNews.length})</span>
            </h2>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <NewsCard key={news.id} news={news} delay={index * 0.1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SafeIcon icon={FiRss} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Nema dostupnih vijesti za odabrane filtere.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiRss} className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Pretplatite se na naš newsletter
            </h2>
            <p className="text-xl text-primary-100 mb-6">
              Dobijajte najnovije vijesti iz Njemačke direktno u vaš inbox. 
              Bez spama, samo važne informacije!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Vaš email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Pretplati se
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News;