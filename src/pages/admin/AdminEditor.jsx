import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import supabase from '../../lib/supabase';

const { FiSave, FiX, FiArrowLeft, FiImage, FiUpload, FiTrash2, FiAlertCircle, FiShare2, FiTrendingUp, FiTarget, FiEye, FiCheckCircle } = FiIcons;

const AdminEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editorType = searchParams.get('type') || 'blog';
  const editId = searchParams.get('id');
  
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
    newsletterSegment: 'all',
    // SEO boost
    submitToSearchEngines: true,
    generateSitemap: true,
    // Specific fields for different content types
    code: '',
    discount: '',
    validUntil: '',
    company: '',
    timeLimit: '',
    terms: [],
    question: '',
    answer: '',
    tags: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

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

  // Generate canonical URL from title
  const generateCanonicalUrl = (title, type) => {
    if (!title) return '';
    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
    
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
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setFormData(prev => ({
        ...prev,
        slug: slug,
        canonicalUrl: generateCanonicalUrl(value, editorType)
      }));

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

  // Save to Supabase
  const saveToSupabase = async (contentData) => {
    try {
      const tableName = `${editorType}_posts_qbx7m9p2k1`;
      
      // Create the data object based on content type
      const dataToSave = {
        title: contentData.title,
        slug: contentData.slug,
        image: contentData.image,
        category: contentData.category,
        date: contentData.date,
        seo_title: contentData.seoTitle,
        seo_description: contentData.seoDescription,
        seo_keywords: contentData.seoKeywords,
        canonical_url: contentData.canonicalUrl,
        published: contentData.publishImmediately,
        featured: contentData.featuredOnHomepage,
        promote_social: contentData.promoteOnSocial,
        social_title: contentData.socialTitle,
        social_description: contentData.socialDescription,
        social_hashtags: contentData.socialHashtags,
        include_newsletter: contentData.includeInNewsletter,
        newsletter_segment: contentData.newsletterSegment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add type-specific fields
      if (editorType === 'blog' || editorType === 'news') {
        dataToSave.excerpt = contentData.excerpt;
        dataToSave.content = contentData.content;
        dataToSave.urgent = contentData.isUrgent || false;
        dataToSave.read_time = `${Math.max(1, Math.ceil(contentData.content.split(' ').length / 200))} min čitanja`;
      }

      if (editorType === 'coupon') {
        dataToSave.code = contentData.code;
        dataToSave.discount = contentData.discount;
        dataToSave.valid_until = contentData.validUntil;
        dataToSave.company = contentData.company;
        dataToSave.time_limit = contentData.timeLimit;
        dataToSave.terms = contentData.terms;
        dataToSave.featured_coupon = contentData.isFeaturedCoupon;
        dataToSave.description = contentData.excerpt;
      }

      if (editorType === 'faq') {
        dataToSave.question = contentData.question;
        dataToSave.answer = contentData.answer;
        dataToSave.tags = contentData.tags;
        dataToSave.views = 0;
        dataToSave.helpful = 0;
        dataToSave.last_updated = new Date().toISOString();
      }

      let result;
      if (editId) {
        // Update existing
        result = await supabase
          .from(tableName)
          .update(dataToSave)
          .eq('id', editId)
          .select()
          .single();
      } else {
        // Insert new
        result = await supabase
          .from(tableName)
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Supabase error:', result.error);
        throw result.error;
      }

      return result.data;
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const savedContent = await saveToSupabase(formData);
      
      console.log('Content saved successfully:', savedContent);
      
      // Show success message
      setPublishSuccess(true);
      
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
      
      // Redirect after success
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving content:', error);
      setErrors({
        submit: `Došlo je do greške prilikom spremanja: ${error.message || 'Nepoznata greška'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (publishSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md"
        >
          <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {editId ? 'Uspješno ažurirano!' : 'Uspješno objavljeno!'}
          </h2>
          <p className="text-gray-600 mb-6">
            Vaš {editorType === 'blog' ? 'blog post' : 
                 editorType === 'news' ? 'vijest' : 
                 editorType === 'coupon' ? 'kupon' : 
                 editorType === 'faq' ? 'FAQ' : 'sadržaj'} je 
            {formData.publishImmediately ? ' odmah objavljen' : ' spremljen kao draft'}.
          </p>
          
          {formData.promoteOnSocial || formData.includeInNewsletter ? (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 text-sm">
                📢 Promocija je pokrenuta na:
              </p>
              <ul className="text-blue-700 text-sm mt-2">
                {formData.promoteOnSocial && <li>• Društvene mreže</li>}
                {formData.includeInNewsletter && <li>• Newsletter</li>}
                {formData.submitToSearchEngines && <li>• Pretraživači</li>}
              </ul>
            </div>
          ) : null}
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => window.open(formData.canonicalUrl, '_blank')}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Pregled
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
                    placeholder="Unesite naslov..."
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL slike *
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.image ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                  
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
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
                      placeholder="npr. Putovanja, Kultura, Život..."
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>
                )}
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
                        placeholder="Kratak opis koji će se prikazati u pregledu..."
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
                        rows={15}
                        className={`w-full px-4 py-2 border ${errors.content ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        placeholder="Ovdje napišite pun sadržaj vašeg posta..."
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
                          placeholder="npr. SAVE20"
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
                          placeholder="npr. Deutsche Bahn"
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                      </div>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Opišite kupon i kako se koristi..."
                      />
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
                        placeholder="Unesite pitanje..."
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
                        placeholder="Unesite detaljan odgovor..."
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
                          placeholder="Dodajte tag i pritisnite Enter"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddItem('tags', currentTag, setCurrentTag);
                            }
                          }}
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
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="promoteOnSocial"
                        checked={formData.promoteOnSocial}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Promocija na društvenim mrežama</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="includeInNewsletter"
                        checked={formData.includeInNewsletter}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Uključi u newsletter</span>
                    </label>
                  </div>
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
              
              <div className="prose max-w-none">
                <h1>{formData.title || 'Naslov posta'}</h1>
                
                {formData.image && (
                  <img src={formData.image} alt={formData.title} className="rounded-lg w-full h-auto" />
                )}
                
                {editorType === 'blog' || editorType === 'news' ? (
                  <>
                    <p className="font-medium text-gray-600">{formData.excerpt}</p>
                    {formData.content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && <p key={index}>{paragraph}</p>
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
                ) : (
                  <p className="text-gray-500">Popunite formu da vidite pregled...</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            {/* Quick Help */}
            <div className="bg-blue-50 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Savjeti za {editorType}</h3>
              
              <div className="space-y-3 text-blue-800">
                <p className="text-sm">
                  {editorType === 'blog' ? (
                    '📝 Koristite jasne naslove i podijelite sadržaj u paragrafe. Dodajte relevantne slike.'
                  ) : editorType === 'news' ? (
                    '📰 Vijesti trebaju biti tačne i ažurne. Dodajte datum i izvor informacije.'
                  ) : editorType === 'coupon' ? (
                    '🎫 Jasno navedite uslove korištenja i datum isteka kupona.'
                  ) : editorType === 'faq' ? (
                    '❓ Pitanja trebaju biti jasna, a odgovori detaljni i korisni.'
                  ) : 'Popunite sva obavezna polja označena sa *'}
                </p>
                
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Preporučeni hashtag-ovi:</h4>
                  <p className="text-xs text-blue-700">
                    #Njemačka #Blog #Putovanja #Kultura #Život #Savjeti #Germany
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