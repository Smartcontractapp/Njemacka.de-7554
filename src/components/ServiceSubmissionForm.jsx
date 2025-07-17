import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { serviceCategories, germanCities } from '../data/services';

const {
  FiX, FiSave, FiUpload, FiMapPin, FiPhone, FiMail, FiGlobe,
  FiClock, FiInfo, FiCheck, FiAlertTriangle
} = FiIcons;

const ServiceSubmissionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    description: '',
    image: '',
    languages: [],
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');

  const availableLanguages = [
    'Bosanski', 'Hrvatski', 'Srpski', 'Njemački', 'Engleski',
    'Francuski', 'Španski', 'Italijanski', 'Ruski', 'Turski'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('openingHours.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [day]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleLanguageAdd = () => {
    if (currentLanguage && !formData.languages.includes(currentLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage]
      }));
      setCurrentLanguage('');
    }
  };

  const handleLanguageRemove = (languageToRemove) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Naziv firme je obavezan';
    if (!formData.category) newErrors.category = 'Kategorija je obavezna';
    if (!formData.city) newErrors.city = 'Grad je obavezan';
    if (!formData.address.trim()) newErrors.address = 'Adresa je obavezna';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon je obavezan';
    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nije validan';
    }
    if (!formData.description.trim()) newErrors.description = 'Opis je obavezan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const submissionData = {
        ...formData,
        id: Date.now(),
        dateSubmitted: new Date().toLocaleDateString('sr-RS'),
        status: 'pending',
        verified: false,
        featured: false,
        rating: 0,
        reviewCount: 0
      };

      onSubmit(submissionData);
      setShowSuccess(true);

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: '',
          category: '',
          subcategory: '',
          city: '',
          address: '',
          phone: '',
          whatsapp: '',
          email: '',
          website: '',
          description: '',
          image: '',
          languages: [],
          openingHours: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
          }
        });
        setShowSuccess(false);
        onCancel();
      }, 2000);

    } catch (error) {
      console.error('Error submitting service:', error);
      setErrors({ submit: 'Došlo je do greške prilikom dodavanja usluge. Pokušajte ponovo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 rounded-xl p-8 text-center"
      >
        <SafeIcon icon={FiCheck} className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Usluga je uspješno poslana!</h3>
        <p className="text-green-600 mb-4">
          Vaša usluga je poslana na pregled i bit će objavljena nakon odobrenja administratora.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Dodaj svoju firmu/uslugu</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <SafeIcon icon={FiX} className="w-5 h-5" />
        </button>
      </div>

      {errors.submit && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 flex items-center space-x-2">
          <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 flex-shrink-0" />
          <p>{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Naziv firme/usluge *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="npr. Dr. Marko Petrović"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategorija *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            >
              <option value="">Odaberite kategoriju</option>
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Podkategorija
            </label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="npr. Opća medicina"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grad *
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            >
              <option value="">Odaberite grad</option>
              {germanCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresa *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            placeholder="Ulica i broj, poštanski broj"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="+49 30 1234567"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+49 1577 1234567"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="info@firma.de"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://www.firma.de"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opis usluge *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            placeholder="Opišite vašu firmu i usluge koje pružate..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jezici koje govorite
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Odaberite jezik</option>
              {availableLanguages.filter(lang => !formData.languages.includes(lang)).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <button
              type="button" 
              onClick={handleLanguageAdd}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
            >
              Dodaj
            </button>
          </div>
          {formData.languages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.languages.map(language => (
                <span
                  key={language}
                  className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => handleLanguageRemove(language)}
                    className="ml-1 text-primary-500 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiX} className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Opening Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Radno vrijeme
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(formData.openingHours).map(([day, time]) => {
              const dayNames = {
                monday: 'Ponedjeljak',
                tuesday: 'Utorak', 
                wednesday: 'Srijeda',
                thursday: 'Četvrtak',
                friday: 'Petak',
                saturday: 'Subota',
                sunday: 'Nedjelja'
              };
              
              return (
                <div key={day}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {dayNames[day]}
                  </label>
                  <input
                    type="text"
                    name={`openingHours.${day}`}
                    value={time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="09:00 - 17:00 ili Zatvoreno"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slika firme/lokala
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="URL slike (npr. https://example.com/slika.jpg)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Dodajte URL slike vašeg lokala ili logotipa
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            * Označava obavezna polja. Vaša usluga će biti vidljiva nakon odobrenja administratora.
          </p>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Odustani
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Šaljem...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Dodaj uslugu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ServiceSubmissionForm;