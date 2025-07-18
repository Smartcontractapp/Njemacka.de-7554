import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import supabase from '../../lib/supabase';

const { FiSave, FiX, FiArrowLeft, FiImage, FiUpload, FiTrash2, FiAlertCircle, FiShare2, FiTrendingUp, FiTarget, FiEye } = FiIcons;

const AdminEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editorType = searchParams.get('type') || 'blog';
  const editId = searchParams.get('id');
  const editCategory = searchParams.get('category');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    date: new Date().toLocaleDateString('sr-RS'),
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    canonicalUrl: '',
    // Publishing options
    publishImmediately: true,
    featuredOnHomepage: false,
    isUrgent: false,
    isFeaturedCoupon: false,
    // Social media promotion
    promoteOnSocial: true,
    socialTitle: '',
    socialDescription: '',
    socialHashtags: [],
    // Email marketing
    includeInNewsletter: true,
    newsletterSegment: 'all', // all, subscribers, premium
    // SEO boost
    submitToSearchEngines: true,
    generateSitemap: true,
    // Specific fields for different content types
    code: '', // For coupons
    discount: '', // For coupons
    validUntil: '', // For coupons
    company: '', // For coupons
    timeLimit: '', // For coupons
    terms: [], // For coupons
    question: '', // For FAQ
    answer: '', // For FAQ
    tags: [], // For FAQ
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Load edit data if available
  useEffect(() => {
    if (editId) {
      const editData = sessionStorage.getItem('editData');
      if (editData) {
        const parsedData = JSON.parse(editData);
        setFormData(prevData => ({
          ...prevData,
          ...parsedData,
          seoTitle: parsedData.seoTitle || parsedData.title || '',
          seoDescription: parsedData.seoDescription || parsedData.excerpt || '',
          seoKeywords: parsedData.seoKeywords || '',
          canonicalUrl: parsedData.canonicalUrl || generateCanonicalUrl(parsedData.title || '', editorType),
          socialTitle: parsedData.socialTitle || parsedData.title || '',
          socialDescription: parsedData.socialDescription || parsedData.excerpt || '',
        }));
      }
    }
  }, [editId, editorType]);

  // Generate canonical URL from title (without domain)
  const generateCanonicalUrl = (title, type) => {
    if (!title) return '';
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const path = type === 'blog' ? 'post' : 
                type === 'faq' ? 'faq' : 
                type === 'news' ? 'news' : 
                type === 'coupon' ? 'coupons' : type;
    
    return `/${path}/${slug}`;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-update SEO fields
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setFormData(prev => ({
        ...prev,
        slug: slug,
        canonicalUrl: generateCanonicalUrl(value, editorType)
      }));

      // Auto-update SEO and social fields if empty
      if (!formData.seoTitle) {
        setFormData(prev => ({ ...prev, seoTitle: value }));
      }
      if (!formData.socialTitle) {
        setFormData(prev => ({ ...prev, socialTitle: value }));
      }
    }

    if (name === 'excerpt') {
      if (!formData.seoDescription) {
        setFormData(prev => ({ ...prev, seoDescription: value }));
      }
      if (!formData.socialDescription) {
        setFormData(prev => ({ ...prev, socialDescription: value }));
      }
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle hashtag addition
  const handleAddHashtag = () => {
    const hashtag = currentHashtag.startsWith('#') ? currentHashtag : `#${currentHashtag}`;
    if (hashtag.length > 1 && !formData.socialHashtags.includes(hashtag)) {
      setFormData(prev => ({
        ...prev,
        socialHashtags: [...prev.socialHashtags, hashtag]
      }));
      setCurrentHashtag('');
    }
  };

  // Handle hashtag removal
  const handleRemoveHashtag = (index) => {
    setFormData(prev => ({
      ...prev,
      socialHashtags: prev.socialHashtags.filter((_, i) => i !== index)
    }));
  };

  // Handle tag/term addition
  const handleAddItem = (field, value, setter) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setter('');
    }
  };

  // Handle tag/term removal
  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Validate form based on content type
  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.title.trim()) newErrors.title = 'Naslov je obavezan';
    if (!formData.image.trim()) newErrors.image = 'Slika je obavezna';
    
    // Type-specific validations
    if (editorType === 'blog' || editorType === 'news') {
      if (!formData.excerpt.trim()) newErrors.excerpt = 'Kratak opis je obavezan';
      if (!formData.content.trim()) newErrors.content = 'Sadržaj je obavezan';
      if (!formData.category.trim()) newErrors.category = 'Kategorija je obavezna';
    }
    
    if (editorType === 'coupon') {
      if (!formData.code.trim()) newErrors.code = 'Kod kupona je obavezan';
      if (!formData.discount.trim()) newErrors.discount = 'Popust je obavezan';
      if (!formData.validUntil.trim()) newErrors.validUntil = 'Datum isteka je obavezan';
      if (!formData.company.trim()) newErrors.company = 'Ime kompanije je obavezno';
    }
    
    if (editorType === 'faq') {
      if (!formData.question.trim()) newErrors.question = 'Pitanje je obavezno';
      if (!formData.answer.trim()) newErrors.answer = 'Odgovor je obavezan';
      if (formData.tags.length === 0) newErrors.tags = 'Barem jedan tag je obavezan';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to save the content
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving content:', formData);
      
      // Simulate promotion activities
      if (formData.promoteOnSocial) {
        console.log('Promoting on social media:', {
          title: formData.socialTitle,
          description: formData.socialDescription,
          hashtags: formData.socialHashtags,
          image: formData.image
        });
      }
      
      if (formData.includeInNewsletter) {
        console.log('Adding to newsletter:', {
          segment: formData.newsletterSegment,
          title: formData.title,
          excerpt: formData.excerpt
        });
      }
      
      if (formData.submitToSearchEngines) {
        console.log('Submitting to search engines and generating sitemap');
      }
      
      alert(`${editId ? 'Ažuriran' : 'Dodan'} ${
        editorType === 'blog' ? 'blog post' :
        editorType === 'news' ? 'vijest' :
        editorType === 'coupon' ? 'kupon' :
        editorType === 'faq' ? 'FAQ' : 'sadržaj'
      }!${formData.promoteOnSocial || formData.includeInNewsletter ? ' Promocija je pokrenuta!' : ''}`);
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving content:', error);
      setErrors({
        submit: 'Došlo je do greške prilikom spremanja. Pokušajte ponovo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine the editor title based on type
  const getEditorTitle = () => {
    if (editId) {
      return `Uredi ${
        editorType === 'blog' ? 'Blog Post' :
        editorType === 'news' ? 'Vijest' :
        editorType === 'coupon' ? 'Kupon' :
        editorType === 'faq' ? 'FAQ' : 'Sadržaj'
      }`;
    }
    
    return `Novi ${
      editorType === 'blog' ? 'Blog Post' :
      editorType === 'news' ? 'Vijest' :
      editorType === 'coupon' ? 'Kupon' :
      editorType === 'faq' ? 'FAQ' : 'Sadržaj'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-2"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Nazad na Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{getEditorTitle()}</h1>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              {showPreview ? 'Uredi' : 'Pregled'}
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Spremanje...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Spremi i objavi</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Editor Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button 
            onClick={() => navigate(`/admin/editor?type=blog${editId ? `&id=${editId}` : ''}`)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${editorType === 'blog' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Blog Post
          </button>
          <button 
            onClick={() => navigate(`/admin/editor?type=news${editId ? `&id=${editId}` : ''}`)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${editorType === 'news' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Vijest
          </button>
          <button 
            onClick={() => navigate(`/admin/editor?type=coupon${editId ? `&id=${editId}` : ''}`)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${editorType === 'coupon' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Kupon
          </button>
          <button 
            onClick={() => navigate(`/admin/editor?type=faq${editId ? `&id=${editId}` : ''}`)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${editorType === 'faq' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            FAQ
          </button>
        </div>
        
        {/* Main Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className={`lg:col-span-2 space-y-6 ${showPreview ? 'hidden' : 'block'}`}>
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 flex-shrink-0" />
                <p>{errors.submit}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common fields for all content types */}
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Osnovne informacije</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Naslov *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug (URL) *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.slug ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    URL: {formData.canonicalUrl || generateCanonicalUrl(formData.title, editorType)}
                  </p>
                </div>
                
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL slike *
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.image ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        placeholder="https://example.com/slika.jpg"
                      />
                      <SafeIcon icon={FiImage} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      <SafeIcon icon={FiUpload} className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                  
                  {formData.image && (
                    <div className="mt-2 relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Category */}
                {(editorType === 'blog' || editorType === 'news') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategorija *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>
                )}
                
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Datum
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Content fields specific to each type */}
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sadržaj</h2>
                
                {/* Blog and News specific fields */}
                {(editorType === 'blog' || editorType === 'news') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kratak opis *
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={2}
                        className={`w-full px-4 py-2 border ${errors.excerpt ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sadržaj *
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        className={`w-full px-4 py-2 border ${errors.content ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                      <p className="mt-1 text-xs text-gray-500">
                        Savjet: Za novi paragraf koristite enter. Svaki red će biti odvojen paragraf.
                      </p>
                    </div>
                  </>
                )}
                
                {/* Coupon specific fields */}
                {editorType === 'coupon' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kod kupona *
                        </label>
                        <input
                          type="text"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${errors.code ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        />
                        {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Popust *
                        </label>
                        <input
                          type="text"
                          name="discount"
                          value={formData.discount}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${errors.discount ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="npr. 20% ili 15€"
                        />
                        {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Važi do *
                        </label>
                        <input
                          type="text"
                          name="validUntil"
                          value={formData.validUntil}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${errors.validUntil ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="npr. 31. decembar 2024"
                        />
                        {errors.validUntil && <p className="mt-1 text-sm text-red-600">{errors.validUntil}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kompanija *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${errors.company ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vremensko ograničenje (opcionalno)
                      </label>
                      <input
                        type="text"
                        name="timeLimit"
                        value={formData.timeLimit}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="npr. 7 dana"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opis
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-2 border ${errors.excerpt ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Uslovi korištenja
                      </label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={currentTerm}
                          onChange={(e) => setCurrentTerm(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Dodajte uslov korištenja"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddItem('terms', currentTerm, setCurrentTerm)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                        >
                          Dodaj
                        </button>
                      </div>
                      
                      {formData.terms.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {formData.terms.map((term, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                              <span>{term}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem('terms', index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <SafeIcon icon={FiX} className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {/* FAQ specific fields */}
                {editorType === 'faq' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pitanje *
                      </label>
                      <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.question ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Odgovor *
                      </label>
                      <textarea
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-2 border ${errors.answer ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tagovi *
                      </label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Dodajte tag"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddItem('tags', currentTag, setCurrentTag)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                        >
                          Dodaj
                        </button>
                      </div>
                      
                      {formData.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag, index) => (
                            <div key={index} className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-sm flex items-center">
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveItem('tags', index)}
                                className="ml-1 text-primary-500 hover:text-primary-700"
                              >
                                <SafeIcon icon={FiX} className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Social Media Promotion */}
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <SafeIcon icon={FiShare2} className="w-5 h-5 text-blue-600" />
                    <span>Promocija na društvenim mrežama</span>
                  </h2>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="promoteOnSocial"
                      checked={formData.promoteOnSocial}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Omogući promociju</span>
                  </label>
                </div>
                
                {formData.promoteOnSocial && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Naslov za društvene mreže
                      </label>
                      <input
                        type="text"
                        name="socialTitle"
                        value={formData.socialTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Automatski se koristi naslov posta"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opis za društvene mreže
                      </label>
                      <textarea
                        name="socialDescription"
                        value={formData.socialDescription}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Automatski se koristi kratak opis"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hashtag-ovi
                      </label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={currentHashtag}
                          onChange={(e) => setCurrentHashtag(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Dodajte hashtag (bez #)"
                        />
                        <button
                          type="button"
                          onClick={handleAddHashtag}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Dodaj
                        </button>
                      </div>
                      
                      {formData.socialHashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.socialHashtags.map((hashtag, index) => (
                            <div key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
                              {hashtag}
                              <button
                                type="button"
                                onClick={() => handleRemoveHashtag(index)}
                                className="ml-1 text-blue-500 hover:text-blue-700"
                              >
                                <SafeIcon icon={FiX} className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="mt-2 text-xs text-gray-500">
                        Preporučeni hashtag-ovi: #Njemačka #Blog #Putovanja #Kultura #Život
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {/* SEO Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <SafeIcon icon={FiTarget} className="w-5 h-5 text-green-600" />
                  <span>SEO Podešavanja</span>
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Naslov
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Ako ostavite prazno, koristiće se naslov članka.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Opis
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Ako ostavite prazno, koristiće se kratak opis članka.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Ključne riječi
                  </label>
                  <input
                    type="text"
                    name="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Razdvojite zarezom: npr. Njemačka, putovanja, Berlin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Automatski se generiše iz naslova. Mijenjajte samo ako znate što radite.
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="submitToSearchEngines"
                      checked={formData.submitToSearchEngines}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Pošalji pretraživačima</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="generateSitemap"
                      checked={formData.generateSitemap}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Ažuriraj sitemap</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          
          {/* Preview */}
          <div className={`lg:col-span-2 ${showPreview ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <SafeIcon icon={FiEye} className="w-5 h-5" />
                <span>Pregled</span>
              </h2>
              
              {/* Preview content based on type */}
              <div className="prose max-w-none">
                <h1>{formData.title}</h1>
                
                {formData.image && (
                  <img src={formData.image} alt={formData.title} className="rounded-lg w-full h-auto" />
                )}
                
                {editorType === 'blog' || editorType === 'news' ? (
                  <>
                    <p className="font-medium text-gray-600">{formData.excerpt}</p>
                    {formData.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </>
                ) : editorType === 'coupon' ? (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Kod:</strong> {formData.code}</p>
                      <p><strong>Popust:</strong> {formData.discount}</p>
                      <p><strong>Važi do:</strong> {formData.validUntil}</p>
                      <p><strong>Kompanija:</strong> {formData.company}</p>
                    </div>
                    <p>{formData.excerpt}</p>
                    {formData.terms.length > 0 && (
                      <>
                        <h3>Uslovi korištenja:</h3>
                        <ul>
                          {formData.terms.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                ) : editorType === 'faq' ? (
                  <>
                    <h2>{formData.question}</h2>
                    <p>{formData.answer}</p>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : null}
                
                {/* Social Media Preview */}
                {formData.promoteOnSocial && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Pregled društvenih mreža:</h3>
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-gray-900">{formData.socialTitle || formData.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{formData.socialDescription || formData.excerpt}</p>
                      {formData.socialHashtags.length > 0 && (
                        <p className="text-blue-600 text-sm mt-2">{formData.socialHashtags.join(' ')}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            {/* Publishing Options */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Opcije objavljivanja</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="publishImmediately"
                      checked={formData.publishImmediately}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Objavi odmah</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featuredOnHomepage"
                      checked={formData.featuredOnHomepage}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Istakni na početnoj stranici</span>
                  </label>
                </div>
                
                {editorType === 'news' && (
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isUrgent"
                        checked={formData.isUrgent}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Označi kao hitno</span>
                    </label>
                  </div>
                )}
                
                {editorType === 'coupon' && (
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isFeaturedCoupon"
                        checked={formData.isFeaturedCoupon}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Istakni kao poseban popust</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            {/* Newsletter Marketing */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-purple-600" />
                  <span>Newsletter marketing</span>
                </h3>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="includeInNewsletter"
                    checked={formData.includeInNewsletter}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Uključi</span>
                </label>
              </div>
              
              {formData.includeInNewsletter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Segment pretplatnika
                  </label>
                  <select
                    name="newsletterSegment"
                    value={formData.newsletterSegment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Svi pretplatnici</option>
                    <option value="subscribers">Osnovni pretplatnici</option>
                    <option value="premium">Premium pretplatnici</option>
                  </select>
                </div>
              )}
            </div>
            
            {/* Quick Help */}
            <div className="bg-blue-50 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Savjeti za promociju</h3>
              
              <div className="space-y-3 text-blue-800">
                <p className="text-sm">
                  {editorType === 'blog' ? (
                    'Koristite društvene mreže za dijeljenje blog postova. Dodajte relevantne hashtag-ove za veći doseg.'
                  ) : editorType === 'news' ? (
                    'Hitne vijesti će biti automatski istaknute. Koristite društvene mreže za brže širenje informacija.'
                  ) : editorType === 'coupon' ? (
                    'Kuponi se najbolje dijele putem newslettera i društvenih mreža. Dodajte vremensko ograničenje za hitnost.'
                  ) : editorType === 'faq' ? (
                    'FAQ se automatski indeksira za pretraživanje. Koristite jasne tagove za lakše pronalaženje.'
                  ) : 'Koristite sve dostupne kanale za maksimalnu vidljivost.'}
                </p>
                
                <p className="text-sm">
                  SEO optimizacija i društvene mreže rade zajedno za bolju vidljivost vašeg sadržaja.
                </p>
                
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Preporučeni hashtag-ovi:</h4>
                  <p className="text-xs text-blue-700">
                    #Njemačka #Blog #Putovanja #Kultura #Život #Savjeti #Tips #Germany
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;