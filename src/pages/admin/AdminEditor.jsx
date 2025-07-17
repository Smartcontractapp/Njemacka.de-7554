import React,{useState,useEffect} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiSave,FiEye,FiArrowLeft,FiImage,FiTag,FiCalendar,FiSend,FiSettings,FiGlobe,FiTrendingUp,FiZap,FiTarget}=FiIcons;

const AdminEditor=()=> {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  const [preview,setPreview]=useState(false);
  const [saving,setSaving]=useState(false);
  const [activeTab,setActiveTab]=useState('content');

  // Get type and other params from URL
  const editorType=searchParams.get('type') || 'blog';
  const editId=searchParams.get('id');
  const category=searchParams.get('category');

  const [formData,setFormData]=useState({
    title: '',
    content: '',
    excerpt: '',
    category: category || '',
    tags: [],
    image: '',
    featured: false,
    status: 'draft',
    // SEO Fields
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    canonicalUrl: '',
    focusKeyphrase: '',
    readabilityScore: 0,
    seoScore: 0,
    // Schema Markup
    schemaType: 'Article',
    // Social Media
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    // Advanced SEO
    metaRobots: 'index,follow',
    breadcrumbTitle: '',
    // Multilingual
    languages: ['bs'],
    translations: {},
    ...((editorType==='coupon') && {
      code: '',
      discount: '',
      validUntil: '',
      company: '',
      link: '',
      terms: [],
      timeLimit: '7 dana'
    }),
    ...((editorType==='news') && {
      source: '',
      urgent: false
    }),
    ...((editorType==='faq') && {
      question: '',
      answer: ''
    })
  });

  useEffect(()=> {
    if (editId) {
      try {
        // Load existing data for editing
        const savedData = sessionStorage.getItem('editData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(prev => ({
            ...prev,
            ...parsedData,
            // Auto-generate SEO fields if empty
            seoTitle: parsedData.seoTitle || parsedData.title,
            seoDescription: parsedData.seoDescription || parsedData.excerpt,
            ogTitle: parsedData.ogTitle || parsedData.title,
            ogDescription: parsedData.ogDescription || parsedData.excerpt,
            twitterTitle: parsedData.twitterTitle || parsedData.title,
            twitterDescription: parsedData.twitterDescription || parsedData.excerpt,
            category: category || parsedData.category
          }));
          sessionStorage.removeItem('editData');
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        alert('Error loading saved data. Please try again.');
      }
    }
  },[editId, category]);

  const handleChange=(e)=> {
    const {name,value,type,checked}=e.target;
    setFormData(prev=> ({
      ...prev,
      [name]: type==='checkbox' ? checked : value
    }));

    // Auto-update SEO fields
    if (name === 'title' && !formData.seoTitle) {
      setFormData(prev => ({ ...prev, seoTitle: value }));
    }
    if (name === 'excerpt' && !formData.seoDescription) {
      setFormData(prev => ({ ...prev, seoDescription: value }));
    }
  };

  const handleSave=async (saveType='draft')=> {
    setSaving(true);
    try {
      const dataToSave={
        ...formData,
        status: saveType,
        id: editId || Date.now(),
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: formData.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      };

      // In a real app, this would be an API call
      console.log('Saving:', dataToSave);
      await new Promise(resolve => setTimeout(resolve, 1000));

      let message;
      switch (saveType) {
        case 'publish':
          message = 'Sadržaj je uspješno objavljen!';
          break;
        case 'pending':
          message = 'Sadržaj je poslan na odobravanje!';
          break;
        default:
          message = 'Sadržaj je sačuvan kao draft!';
      }
      
      alert(message);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Greška pri čuvanju sadržaja. Molimo pokušajte ponovo.');
    } finally {
      setSaving(false);
    }
  };

  const handleArrayChange=(name,value)=> {
    setFormData(prev=> ({
      ...prev,
      [name]: value.split(',').map(item=> item.trim()).filter(item=> item)
    }));
  };

  const generateSEOSuggestions = async () => {
    // AI-powered SEO suggestions
    const suggestions = {
      title: `${formData.title} - Njemačka Blog`,
      description: formData.excerpt || `Saznajte više o ${formData.title.toLowerCase()} na našem blogu o Njemačkoj.`,
      keywords: ['Njemačka', 'blog', formData.category?.toLowerCase(), ...formData.tags].filter(Boolean).join(', '),
      focusKeyphrase: formData.title.split(' ').slice(0, 3).join(' ').toLowerCase()
    };

    setFormData(prev => ({
      ...prev,
      seoTitle: suggestions.title,
      seoDescription: suggestions.description,
      seoKeywords: suggestions.keywords,
      focusKeyphrase: suggestions.focusKeyphrase
    }));

    alert('SEO predlozi su generirani i primijenjeni!');
  };

  const analyzeReadability = () => {
    // Simple readability analysis
    const wordCount = formData.content.split(' ').length;
    const sentenceCount = formData.content.split(/[.!?]+/).length;
    const avgWordsPerSentence = wordCount / sentenceCount;
    
    let score = 100;
    if (avgWordsPerSentence > 20) score -= 20;
    if (wordCount < 300) score -= 30;
    if (formData.content.split('\n\n').length < 3) score -= 10;

    setFormData(prev => ({ ...prev, readabilityScore: Math.max(0, score) }));
    alert(`Analiza čitljivosti završena! Rezultat: ${Math.max(0, score)}/100`);
  };

  const analyzeSEO = () => {
    // SEO analysis
    let score = 0;
    if (formData.seoTitle && formData.seoTitle.length >= 30 && formData.seoTitle.length <= 60) score += 20;
    if (formData.seoDescription && formData.seoDescription.length >= 120 && formData.seoDescription.length <= 160) score += 20;
    if (formData.focusKeyphrase && formData.content.toLowerCase().includes(formData.focusKeyphrase.toLowerCase())) score += 20;
    if (formData.image) score += 10;
    if (formData.tags.length >= 3) score += 10;
    if (formData.canonicalUrl) score += 10;
    if (formData.ogTitle && formData.ogDescription) score += 10;

    setFormData(prev => ({ ...prev, seoScore: score }));
    alert(`SEO analiza završena! Rezultat: ${score}/100`);
  };

  const renderContentEditor = () => {
    switch (editorType) {
      case 'blog':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naslov *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Unesite naslov blog posta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kratki opis *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Kratki opis koji će se prikazati na kartici"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorija *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Izaberite kategoriju</option>
                  <option value="Jeftina Putovanja">Jeftina Putovanja</option>
                  <option value="Kultura">Kultura</option>
                  <option value="Život">Život</option>
                  <option value="Besplatno">Besplatno</option>
                  <option value="Kredit u Njemačkoj">Kredit u Njemačkoj</option>
                  <option value="Bankovni račun">Bankovni račun</option>
                  <option value="Zdravstveno osiguranje">Zdravstveno osiguranje</option>
                  <option value="Mobilni Telefoni">Mobilni Telefoni</option>
                  <option value="Internet priključak">Internet priključak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL slike *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagovi (odvojeni zarezom)
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e)=> handleArrayChange('tags',e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="putovanja, savjeti, njemačka"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sadržaj *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Unesite sadržaj blog posta..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Izdvojeni post
              </label>
            </div>
          </div>
        );

      case 'coupon':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naziv kupona *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="npr. 20% popust na Deutsche Bahn karte"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kod kupona *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="TRAIN20DE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Popust *
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="20%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vremensko ograničenje *
                </label>
                <select
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="1 dan">1 dan</option>
                  <option value="2 dana">2 dana</option>
                  <option value="3 dana">3 dana</option>
                  <option value="7 dana">7 dana</option>
                  <option value="10 dana">10 dana</option>
                  <option value="30 dana">30 dana</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kompanija *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Deutsche Bahn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Važi do *
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opis *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Opis kupona"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link *
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://www.bahn.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uslovi korišćenja (jedan po liniji)
              </label>
              <textarea
                value={formData.terms.join('\n')}
                onChange={(e)=> handleArrayChange('terms',e.target.value.replace(/\n/g,','))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Važi za sve regionalne vozove&#10;Ne važi za ICE vozove&#10;Maksimalno 2 karte po kuponu"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Izdvojeni kupon
              </label>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Naslov vijesti *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Unesite naslov vijesti"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Hitna vijest
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kratki opis *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Kratki opis vijesti"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorija *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Izaberite kategoriju</option>
                  <option value="Vijesti">Vijesti</option>
                  <option value="Kultura">Kultura</option>
                  <option value="Transport">Transport</option>
                  <option value="Ekonomija">Ekonomija</option>
                  <option value="Događaji">Događaji</option>
                  <option value="Ekologija">Ekologija</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Izvor *
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="DPA, Reuters, itd."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sadržaj vijesti *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Unesite sadržaj vijesti..."
              />
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pitanje *
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Unesite pitanje"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategorija *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Izaberite kategoriju</option>
                <option value="Rad i zapošljavanje">Rad i zapošljavanje</option>
                <option value="Zdravstvo">Zdravstvo</option>
                <option value="Stanovanje">Stanovanje</option>
                <option value="Jezik">Jezik</option>
                <option value="Saobraćaj">Saobraćaj</option>
                <option value="Finansije">Finansije</option>
                <option value="Administracija">Administracija</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Odgovor *
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Unesite detaljan odgovor..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagovi (odvojeni zarezom)
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e)=> handleArrayChange('tags',e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="radna dozvola, dokumenti, viza"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSEOEditor = () => (
    <div className="space-y-6">
      {/* SEO Analysis */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">SEO Analiza</h4>
          <div className="flex space-x-2">
            <button
              onClick={generateSEOSuggestions}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              <SafeIcon icon={FiZap} className="w-3 h-3" />
              <span>AI Predlozi</span>
            </button>
            <button
              onClick={analyzeSEO}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              <SafeIcon icon={FiTrendingUp} className="w-3 h-3" />
              <span>Analiziraj SEO</span>
            </button>
            <button
              onClick={analyzeReadability}
              className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
            >
              <SafeIcon icon={FiTarget} className="w-3 h-3" />
              <span>Čitljivost</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${formData.seoScore >= 70 ? 'text-green-600' : formData.seoScore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
              {formData.seoScore}/100
            </div>
            <div className="text-sm text-gray-600">SEO Rezultat</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${formData.readabilityScore >= 70 ? 'text-green-600' : formData.readabilityScore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
              {formData.readabilityScore}/100
            </div>
            <div className="text-sm text-gray-600">Čitljivost</div>
          </div>
        </div>
      </div>

      {/* Basic SEO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SEO Naslov
        </label>
        <input
          type="text"
          name="seoTitle"
          value={formData.seoTitle}
          onChange={handleChange}
          maxLength="60"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Optimizirani naslov za pretraživače"
        />
        <div className="text-xs text-gray-500 mt-1">
          {formData.seoTitle.length}/60 karaktera
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SEO Opis
        </label>
        <textarea
          name="seoDescription"
          value={formData.seoDescription}
          onChange={handleChange}
          maxLength="160"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Opis koji će se prikazati u rezultatima pretrage"
        />
        <div className="text-xs text-gray-500 mt-1">
          {formData.seoDescription.length}/160 karaktera
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fokus ključna fraza
          </label>
          <input
            type="text"
            name="focusKeyphrase"
            value={formData.focusKeyphrase}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="glavna ključna fraza"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Canonical URL
          </label>
          <input
            type="url"
            name="canonicalUrl"
            value={formData.canonicalUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com/canonical-url"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SEO Ključne riječi
        </label>
        <input
          type="text"
          name="seoKeywords"
          value={formData.seoKeywords}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="ključna riječ 1, ključna riječ 2, ključna riječ 3"
        />
      </div>

      {/* Schema Markup */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Schema Type
        </label>
        <select
          name="schemaType"
          value={formData.schemaType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="Article">Article</option>
          <option value="NewsArticle">News Article</option>
          <option value="BlogPosting">Blog Posting</option>
          <option value="FAQPage">FAQ Page</option>
          <option value="HowTo">How To</option>
          <option value="Recipe">Recipe</option>
          <option value="Product">Product</option>
          <option value="LocalBusiness">Local Business</option>
        </select>
      </div>

      {/* Advanced SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Robots
          </label>
          <select
            name="metaRobots"
            value={formData.metaRobots}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="index,follow">Index, Follow</option>
            <option value="noindex,follow">No Index, Follow</option>
            <option value="index,nofollow">Index, No Follow</option>
            <option value="noindex,nofollow">No Index, No Follow</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breadcrumb naslov
          </label>
          <input
            type="text"
            name="breadcrumbTitle"
            value={formData.breadcrumbTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Naslov za breadcrumb navigaciju"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialMediaEditor = () => (
    <div className="space-y-6">
      {/* Open Graph */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Open Graph (Facebook)</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Naslov
            </label>
            <input
              type="text"
              name="ogTitle"
              value={formData.ogTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Naslov za Facebook dijeljenje"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Opis
            </label>
            <textarea
              name="ogDescription"
              value={formData.ogDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Opis za Facebook dijeljenje"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Slika
            </label>
            <input
              type="url"
              name="ogImage"
              value={formData.ogImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="URL slike za Facebook (1200x630px)"
            />
          </div>
        </div>
      </div>

      {/* Twitter Cards */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Twitter Cards</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Naslov
            </label>
            <input
              type="text"
              name="twitterTitle"
              value={formData.twitterTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Naslov za Twitter dijeljenje"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Opis
            </label>
            <textarea
              name="twitterDescription"
              value={formData.twitterDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Opis za Twitter dijeljenje"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Slika
            </label>
            <input
              type="url"
              name="twitterImage"
              value={formData.twitterImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="URL slike za Twitter (1200x600px)"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMultilingualEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dostupni jezici
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['bs', 'hr', 'sr', 'de', 'en'].map(lang => (
            <label key={lang} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.languages.includes(lang)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      languages: [...prev.languages, lang]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      languages: prev.languages.filter(l => l !== lang)
                    }));
                  }
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {lang === 'bs' ? 'Bosanski' : 
                 lang === 'hr' ? 'Hrvatski' : 
                 lang === 'sr' ? 'Srpski' : 
                 lang === 'de' ? 'Njemački' : 'Engleski'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {formData.languages.length > 1 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Prijevodi</h4>
          <p className="text-sm text-blue-700 mb-4">
            Dodajte prijevode za odabrane jezike. Glavni sadržaj će se koristiti kao osnova.
          </p>
          {formData.languages.filter(lang => lang !== 'bs').map(lang => (
            <div key={lang} className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">
                {lang === 'hr' ? 'Hrvatski' : 
                 lang === 'sr' ? 'Srpski' : 
                 lang === 'de' ? 'Njemački' : 'Engleski'} prijevod
              </h5>
              <textarea
                placeholder={`Prijevod naslova i sadržaja na ${lang === 'hr' ? 'hrvatski' : lang === 'sr' ? 'srpski' : lang === 'de' ? 'njemački' : 'engleski'}`}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const getEditorTitle=()=> {
    const titles={
      blog: 'Blog Post',
      coupon: 'Kupon',
      news: 'Vijest',
      faq: 'FAQ'
    };
    return titles[editorType] || 'Sadržaj';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={()=> navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {editId ? 'Uredi' : 'Novi'} {getEditorTitle()}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={()=> setPreview(!preview)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>Pregled</span>
              </button>
              <button
                onClick={()=> handleSave('draft')}
                disabled={saving}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Sačuvaj draft</span>
              </button>
              <button
                onClick={()=> handleSave('pending')}
                disabled={saving}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-4 py-2 rounded-lg"
              >
                <SafeIcon icon={FiSend} className="w-4 h-4" />
                <span>Pošalji na odobravanje</span>
              </button>
              <button
                onClick={()=> handleSave('publish')}
                disabled={saving}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>{saving ? 'Čuva...' : 'Objavi'}</span>
              </button>
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={()=> setActiveTab('content')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'content' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sadržaj
            </button>
            <button
              onClick={()=> setActiveTab('seo')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'seo' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SEO
            </button>
            <button
              onClick={()=> setActiveTab('social')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'social' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Društvene mreže
            </button>
            <button
              onClick={()=> setActiveTab('multilingual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'multilingual' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={FiGlobe} className="w-4 h-4 mr-1" />
              Jezici
            </button>
          </div>

          {/* Editor Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'content' && renderContentEditor()}
            {activeTab === 'seo' && renderSEOEditor()}
            {activeTab === 'social' && renderSocialMediaEditor()}
            {activeTab === 'multilingual' && renderMultilingualEditor()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEditor;