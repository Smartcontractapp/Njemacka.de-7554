import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiPlus, FiX, FiUpload, FiTag, FiCheckCircle, 
  FiAlertTriangle, FiUser, FiMail, FiPhone, FiMapPin 
} = FiIcons;

const AdSubmissionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    tags: [],
    author: '',
    email: '',
    phone: '',
    image: '',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Posao', 'Stanovanje', 'Prodaja', 'Usluge', 'Putovanja', 'Ostalo'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageChange = (e) => {
    // In a real implementation, this would upload the image to a server
    // Here we're just creating a URL for preview
    const file = e.target.files[0];
    if (file) {
      // Normally would upload to server here
      // For this demo, just create a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Naslov je obavezan';
    if (!formData.description.trim()) newErrors.description = 'Opis je obavezan';
    if (!formData.category) newErrors.category = 'Kategorija je obavezna';
    if (!formData.location.trim()) newErrors.location = 'Lokacija je obavezna';
    if (!formData.author.trim()) newErrors.author = 'Ime je obavezno';
    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nije validan';
    }
    
    if (!formData.image) newErrors.image = 'Slika je obavezna';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to submit the ad
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add submission date
      const submissionData = {
        ...formData,
        date: new Date().toLocaleDateString('sr-RS'),
        status: 'pending'  // All ads start as pending
      };
      
      onSubmit(submissionData);
      
      setShowSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          location: '',
          tags: [],
          author: '',
          email: '',
          phone: '',
          image: '',
        });
        setShowSuccess(false);
        onCancel();
      }, 2000);
    } catch (error) {
      console.error('Error submitting ad:', error);
      setErrors({ submit: 'Došlo je do greške prilikom dodavanja oglasa. Pokušajte ponovo.' });
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
        <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Oglas je uspješno poslan!</h3>
        <p className="text-green-600 mb-4">
          Vaš oglas je poslan na pregled i bit će objavljen nakon odobrenja administratora.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Dodaj novi oglas</h3>
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naslov oglasa *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            placeholder="Npr. Prodajem bicikl, Tražim posao, Izdajem stan..."
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cijena (€)
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ostavite prazno za 'Po dogovoru'"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lokacija *
          </label>
          <div className="relative">
            <SafeIcon 
              icon={FiMapPin} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full pl-10 px-4 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="Grad, dio grada ili adresa"
            />
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opis *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            placeholder="Detaljno opišite vaš oglas..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tagovi (ključne riječi)
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <SafeIcon 
                icon={FiTag} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Dodajte tagove i pritisnite Enter"
              />
            </div>
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
            </button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slika oglasa *
          </label>
          <div className={`border-2 border-dashed ${errors.image ? 'border-red-300' : 'border-gray-300'} rounded-lg p-4 text-center`}>
            {formData.image ? (
              <div className="relative">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="mx-auto h-40 object-contain"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <SafeIcon icon={FiUpload} className="w-10 h-10 text-gray-400 mx-auto" />
                <p className="text-gray-500">Kliknite za odabir slike ili povucite sliku ovdje</p>
                <p className="text-xs text-gray-400">PNG, JPG ili WEBP do 5MB</p>
              </div>
            )}
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>
        
        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Kontakt informacije</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaše ime *
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiUser} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-2 border ${errors.author ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
              </div>
              {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email adresa *
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon (opcionalno)
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiPhone} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+49 123 456 789"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            * Označava obavezna polja. Vaš oglas će biti vidljiv nakon odobrenja administratora.
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
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Dodaj oglas</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AdSubmissionForm;