import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ClassifiedAd from './ClassifiedAd';
import AdSubmissionForm from './AdSubmissionForm';

const { FiPlus, FiSearch, FiFilter, FiGrid, FiList, FiInfo } = FiIcons;

const ClassifiedsSection = ({ initialAds = [] }) => {
  const [ads, setAds] = useState(initialAds);
  const [filteredAds, setFilteredAds] = useState(initialAds);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);

  // Get all unique categories from ads
  const categories = ['Sve', ...new Set(ads.map(ad => ad.category))];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAds(term, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterAds(searchTerm, category);
  };

  const filterAds = (term, category) => {
    let filtered = [...ads];
    
    // Filter by search term
    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(ad => 
        ad.title.toLowerCase().includes(lowerTerm) || 
        ad.description.toLowerCase().includes(lowerTerm) ||
        (ad.tags && ad.tags.some(tag => tag.toLowerCase().includes(lowerTerm)))
      );
    }
    
    // Filter by category
    if (category !== 'Sve') {
      filtered = filtered.filter(ad => ad.category === category);
    }
    
    setFilteredAds(filtered);
  };

  const handleAdSubmit = (newAd) => {
    // In a real app, this would send the ad to a backend for review
    console.log('New ad submitted:', newAd);
    
    // For demonstration, we'll add it to our local state with pending status
    // In a real app, this would come from the backend after approval
    setShowForm(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oglasnik
            </h2>
            <p className="text-lg text-gray-600">
              Pregledajte oglase ili dodajte svoj oglas
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="hidden md:flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Dodaj oglas</span>
          </button>
        </motion.div>

        {/* Mobile Add Button */}
        <div className="flex md:hidden justify-center mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg w-full"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Dodaj oglas</span>
          </button>
        </div>
        
        {showForm ? (
          <AdSubmissionForm 
            onSubmit={handleAdSubmit} 
            onCancel={() => setShowForm(false)} 
          />
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <SafeIcon 
                    icon={FiSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Pretražite oglase..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 hidden sm:inline">Kategorija:</span>
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <div className="hidden sm:flex border-l border-gray-300 pl-4 space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                      title="Prikaz kartica"
                    >
                      <SafeIcon icon={FiGrid} className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                      title="Prikaz liste"
                    >
                      <SafeIcon icon={FiList} className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            {filteredAds.length > 0 ? (
              <div className={viewMode === 'grid' ? 
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 
                'space-y-6'
              }>
                {filteredAds.map((ad, index) => (
                  <ClassifiedAd 
                    key={ad.id} 
                    ad={ad} 
                    delay={index * 0.1} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <SafeIcon icon={FiInfo} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== 'Sve' ? 
                    'Nema oglasa koji odgovaraju vašoj pretrazi' : 
                    'Trenutno nema oglasa'
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'Sve' ? 
                    'Pokušajte promijeniti kriterije pretrage ili kategoriju' : 
                    'Budite prvi koji će dodati oglas'
                  }
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                  <span>Dodaj oglas</span>
                </button>
              </div>
            )}
            
            {/* Info Box */}
            <div className="bg-blue-50 rounded-lg p-6 mt-8 flex items-start space-x-4">
              <SafeIcon icon={FiInfo} className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Kako funkcioniše oglasnik?</h4>
                <p className="text-blue-700 text-sm">
                  Svi oglasi prolaze kroz proces odobrenja od strane administratora prije nego što budu objavljeni. 
                  Vaš oglas će biti vidljiv na stranici nakon što ga administrator pregleda i odobri, što obično traje 
                  do 24 sata. Molimo da poštujete pravila zajednice i objavljujete samo relevantne oglase.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ClassifiedsSection;