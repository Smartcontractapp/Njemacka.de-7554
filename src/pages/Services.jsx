import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ServiceCard from '../components/ServiceCard';
import ServiceSubmissionForm from '../components/ServiceSubmissionForm';
import { serviceCategories, germanCities, services, filterServices } from '../data/services';

const {
  FiSearch, FiFilter, FiPlus, FiMapPin, FiInfo, FiGrid, FiList,
  FiHeart, FiActivity, FiScale, FiCoffee, FiScissors, FiTruck,
  FiDollarSign, FiCalculator, FiFlag, FiTool, FiMonitor, FiShield, FiSmile
} = FiIcons;

const Services = () => {
  const [filteredServices, setFilteredServices] = useState(services);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('sve');
  const [selectedCity, setSelectedCity] = useState('sve');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, selectedCategory, selectedCity, showVerifiedOnly);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category, selectedCity, showVerifiedOnly);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    applyFilters(searchTerm, selectedCategory, city, showVerifiedOnly);
  };

  const handleVerifiedChange = (verified) => {
    setShowVerifiedOnly(verified);
    applyFilters(searchTerm, selectedCategory, selectedCity, verified);
  };

  const applyFilters = (search, category, city, verified) => {
    const filters = {
      search,
      category: category === 'sve' ? null : category,
      city: city === 'sve' ? null : city,
      verified
    };
    
    const filtered = filterServices(filters);
    setFilteredServices(filtered);
  };

  const handleServiceSubmit = (newService) => {
    console.log('New service submitted:', newService);
    // In a real app, this would send to backend
    setShowForm(false);
  };

  const getCategoryIcon = (categoryId) => {
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
      'prevodilacke-usluge': FiIcons.FiGlobe,
      'it-usluge': FiMonitor,
      'osiguranje': FiShield
    };
    return iconMap[categoryId] || FiHeart;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiMapPin} className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Usluge po gradovima
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Pronađite domaće firme i usluge u vašem gradu. Direktori sa verifikovanim poslovnim partnerima koji govore naš jezik.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Category Navigation */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Kategorije</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
              <span>Dodaj firmu</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {serviceCategories.slice(0, 8).map((category) => {
              const CategoryIcon = getCategoryIcon(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`p-4 rounded-lg text-center transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <SafeIcon icon={CategoryIcon} className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Pretražite firme i usluge..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="sve">Sve kategorije</option>
                  {serviceCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="sve">Svi gradovi</option>
                  {germanCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
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

            {/* Additional Filters */}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVerifiedOnly}
                  onChange={(e) => handleVerifiedChange(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Samo verifikovane firme</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Service Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ServiceSubmissionForm
            onSubmit={handleServiceSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'sve' && selectedCity === 'sve'
                ? 'Sve usluge'
                : `${selectedCategory !== 'sve' 
                    ? serviceCategories.find(c => c.id === selectedCategory)?.name 
                    : 'Usluge'} ${selectedCity !== 'sve' ? `u gradu ${selectedCity}` : ''}`
              }
              <span className="text-primary-600 ml-2">({filteredServices.length})</span>
            </h2>
          </div>

          {filteredServices.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
            }>
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <SafeIcon icon={FiInfo} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nema usluga koje odgovaraju vašoj pretrazi
              </h3>
              <p className="text-gray-600 mb-6">
                Pokušajte promijeniti kriterije pretrage ili dodajte svoju firmu
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Dodaj svoju firmu</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeIcon icon={FiInfo} className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Zašto koristiti naš direktorij?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiHeart} className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verifikovane firme</h3>
                <p className="text-gray-600 text-sm">
                  Sve firme prolaze proces verifikacije prije dodavanja u direktorij
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiIcons.FiGlobe} className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Naš jezik</h3>
                <p className="text-gray-600 text-sm">
                  Firme koje govore bosanski, hrvatski ili srpski jezik
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiIcons.FiStar} className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recenzije</h3>
                <p className="text-gray-600 text-sm">
                  Čitajte iskustva drugih korisnika prije donošenja odluke
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;