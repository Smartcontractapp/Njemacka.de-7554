import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { blogPosts } from '../../data/blogPosts';
import { coupons } from '../../data/coupons';
import { dailyNews } from '../../data/news';
import { faqData } from '../../data/faq';
import { classifiedAds } from '../../data/classifiedAds';

const {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiUsers,
  FiTag,
  FiCreditCard,
  FiPackage,
  FiFileText,
  FiMessageSquare,
  FiCalendar,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiMoreVertical,
  FiSettings,
  FiTrendingUp,
  FiGlobe,
  FiImage,
  FiVideo,
  FiNavigation,
  FiCode,
  FiMap,
  FiRss,
  FiTarget,
  FiZap,
  FiLayers
} = FiIcons;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Statistics for dashboard
  const stats = {
    blogPosts: blogPosts.length,
    coupons: coupons.length,
    news: dailyNews.length,
    faqs: faqData.length,
    classifieds: classifiedAds.length
  };

  // Enhanced delete post function
  const handleDeletePost = (postId, category) => {
    if (window.confirm('Da li ste sigurni da želite obrisati ovaj post? Ova akcija se ne može poništiti.')) {
      try {
        // For blog posts
        if (category === 'blog') {
          const updatedPosts = blogPosts.filter(post => post.id !== postId);
          // Here you would normally make an API call to delete from backend
          console.log('Post deleted:', postId);
          alert('Post je uspješno obrisan!');
          return;
        }

        // For coupons
        if (category === 'coupons') {
          const updatedCoupons = coupons.filter(coupon => coupon.id !== postId);
          console.log('Coupon deleted:', postId);
          alert('Kupon je uspješno obrisan!');
          return;
        }

        // For news
        if (category === 'news') {
          const updatedNews = dailyNews.filter(news => news.id !== postId);
          console.log('News deleted:', postId);
          alert('Vijest je uspješno obrisana!');
          return;
        }

        // For FAQ
        if (category === 'faq') {
          const updatedFAQ = faqData.filter(faq => faq.id !== postId);
          console.log('FAQ deleted:', postId);
          alert('FAQ je uspješno obrisan!');
          return;
        }

        // For category specific posts
        const categoryPosts = blogPosts.filter(post => post.category === category);
        const updatedCategoryPosts = categoryPosts.filter(post => post.id !== postId);
        console.log('Category post deleted:', postId);
        alert('Post je uspješno obrisan!');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Došlo je do greške prilikom brisanja. Pokušajte ponovo.');
      }
    }
  };

  // Enhanced edit post function
  const handleEditPost = (postId, category) => {
    try {
      let editPath = '/admin/editor';
      let editData = null;

      // Determine the correct edit path and data based on category
      switch (category) {
        case 'blog':
          editData = blogPosts.find(post => post.id === postId);
          editPath += '?type=blog';
          break;
        case 'coupons':
          editData = coupons.find(coupon => coupon.id === postId);
          editPath += '?type=coupon';
          break;
        case 'news':
          editData = dailyNews.find(news => news.id === postId);
          editPath += '?type=news';
          break;
        case 'faq':
          editData = faqData.find(faq => faq.id === postId);
          editPath += '?type=faq';
          break;
        default:
          // For category specific posts
          editData = blogPosts.find(post => post.id === postId && post.category === category);
          editPath += '?type=blog';
          break;
      }

      // Add the ID and category as URL parameters
      if (editData) {
        editPath += `&id=${postId}&category=${encodeURIComponent(category)}`;
        // Store the edit data in sessionStorage for the editor to access
        sessionStorage.setItem('editData', JSON.stringify(editData));
        navigate(editPath);
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert('Došlo je do greške prilikom učitavanja posta za uređivanje. Pokušajte ponovo.');
    }
  };

  // Enhanced post preview function
  const handlePreviewPost = (postId, category) => {
    try {
      let previewData = null;
      let previewPath = '';

      // Find the correct data based on category
      switch (category) {
        case 'blog':
          previewData = blogPosts.find(post => post.id === postId);
          previewPath = `/post/${previewData?.slug}`;
          break;
        case 'news':
          previewData = dailyNews.find(news => news.id === postId);
          previewPath = `/news/${postId}`;
          break;
        case 'coupons':
          previewData = coupons.find(coupon => coupon.id === postId);
          previewPath = `/coupons#${postId}`;
          break;
        case 'faq':
          previewData = faqData.find(faq => faq.id === postId);
          previewPath = `/faq#${postId}`;
          break;
        default:
          previewData = blogPosts.find(post => post.id === postId && post.category === category);
          previewPath = `/post/${previewData?.slug}`;
          break;
      }

      if (previewData) {
        // Open preview in new tab
        window.open(previewPath, '_blank');
      } else {
        throw new Error('Preview data not found');
      }
    } catch (error) {
      console.error('Error previewing post:', error);
      alert('Došlo je do greške prilikom otvaranja pregleda. Pokušajte ponovo.');
    }
  };

  // Add these action buttons to your table rows
  const renderActionButtons = (item, category) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleEditPost(item.id, category)}
        className="text-blue-600 hover:text-blue-900 transition-colors"
        title="Uredi"
      >
        <SafeIcon icon={FiEdit} className="w-5 h-5" />
      </button>
      <button
        onClick={() => handlePreviewPost(item.id, category)}
        className="text-green-600 hover:text-green-900 transition-colors"
        title="Pregledaj"
      >
        <SafeIcon icon={FiEye} className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleDeletePost(item.id, category)}
        className="text-red-600 hover:text-red-900 transition-colors"
        title="Obriši"
      >
        <SafeIcon icon={FiTrash2} className="w-5 h-5" />
      </button>
    </div>
  );

  // Function to render "Dodaj" button for each category
  const renderAddButton = (type, label) => (
    <button
      onClick={() => navigate(`/admin/editor?type=${type}`)}
      className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm mb-4"
    >
      <SafeIcon icon={FiPlus} className="w-3 h-3" />
      <span>Dodaj {label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Upravljajte sadržajem vašeg sajta</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/admin/editor?type=blog')}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Novi post</span>
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                <span>SEO Podešavanja</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pregled
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sadržaj
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'seo'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SEO Podešavanja
            </button>
            <button
              onClick={() => setActiveTab('multilingual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'multilingual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Jezici
            </button>
          </div>

          {/* Dashboard Overview */}
          {activeTab === 'overview' && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pregled</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <SafeIcon icon={FiFileText} className="w-8 h-8 text-primary-600" />
                    <span className="text-2xl font-bold text-gray-900">{stats.blogPosts}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Blog postova</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <SafeIcon icon={FiTag} className="w-8 h-8 text-red-600" />
                    <span className="text-2xl font-bold text-gray-900">{stats.coupons}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Kupona</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <SafeIcon icon={FiMessageSquare} className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">{stats.news}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Vijesti</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <SafeIcon icon={FiAlertTriangle} className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{stats.faqs}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">FAQ</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <SafeIcon icon={FiPackage} className="w-8 h-8 text-purple-600" />
                    <span className="text-2xl font-bold text-gray-900">{stats.classifieds}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Oglasa</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === 'content' && (
            <>
              {/* Blog Posts Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Blog Postovi</h3>
                  {renderAddButton('blog', 'Blog Post')}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Naslov
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategorija
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Datum
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {renderActionButtons(post, 'blog')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* News Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Vijesti</h3>
                  {renderAddButton('news', 'Vijest')}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Naslov
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategorija
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Datum
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dailyNews.map((news) => (
                        <tr key={news.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{news.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {news.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {news.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {renderActionButtons(news, 'news')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Coupons Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Kuponi</h3>
                  {renderAddButton('coupon', 'Kupon')}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Naslov
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kod
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Popust
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Važi do
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {coupons.map((coupon) => (
                        <tr key={coupon.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{coupon.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-mono font-semibold rounded bg-gray-100">
                              {coupon.code}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {coupon.discount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {coupon.validUntil}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {renderActionButtons(coupon, 'coupons')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FAQ Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">FAQ</h3>
                  {renderAddButton('faq', 'FAQ')}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pitanje
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategorija
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pregledi
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Korisnost
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcije
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {faqData.map((faq) => (
                        <tr key={faq.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {faq.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {faq.views}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {faq.helpful}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {renderActionButtons(faq, 'faq')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Classifieds Management Button */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Oglasnik</h3>
                    <p className="text-sm text-gray-600 mt-1">Upravljajte oglasima korisnika</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/classifieds')}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
                  >
                    Upravljaj oglasima
                  </button>
                </div>
              </div>
            </>
          )}

          {/* SEO Settings Tab */}
          {activeTab === 'seo' && (
            <SEOSettings />
          )}

          {/* Multilingual Settings Tab */}
          {activeTab === 'multilingual' && (
            <MultilingualSettings />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// SEO Settings Component
const SEOSettings = () => {
  const [seoSettings, setSeoSettings] = useState({
    // General SEO
    siteTitle: 'Njemačka Blog - Otkrijte Njemačku',
    siteDescription: 'Sveobuhvatan vodič kroz Njemačku sa blog postovima, vijestima, kuponima i FAQ-om.',
    siteKeywords: 'Njemačka, blog, putovanja, kultura, život, vijesti, kuponi, FAQ, saveti',
    canonicalUrl: 'https://njemacka-blog.com',
    // Schema Markup
    schemaTypes: {
      organization: true,
      website: true,
      breadcrumbs: true,
      article: true,
      localBusiness: false,
      product: false,
      review: false,
      faq: true,
      howTo: false,
      recipe: false
    },
    // XML Sitemaps
    sitemaps: {
      mainSitemap: true,
      newsSitemap: true,
      imageSitemap: true,
      videoSitemap: false,
      mobileSitemap: true,
      categorySitemap: true
    },
    // RSS Feeds
    rssFeeds: {
      mainFeed: true,
      categoryFeeds: true,
      newsFeed: true,
      couponsFeed: false
    },
    // Image SEO
    imageSeo: {
      autoAltText: true,
      lazyLoading: true,
      webpConversion: true,
      imageCompression: true,
      structuredData: true
    },
    // Text SEO
    textSeo: {
      readabilityAnalysis: true,
      keywordDensity: true,
      headingStructure: true,
      internalLinking: true,
      externalLinking: false
    },
    // Video SEO
    videoSeo: {
      videoSitemap: false,
      videoStructuredData: false,
      thumbnailOptimization: false,
      transcriptGeneration: false
    }
  });

  const handleSeoChange = (category, setting, value) => {
    setSeoSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleGeneralSeoChange = (setting, value) => {
    setSeoSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const generateKeywords = async () => {
    // AI Keyword Research simulation
    const suggestedKeywords = [
      'Njemačka putovanja',
      'život u Njemačkoj',
      'njemačka kultura',
      'jeftina putovanja Njemačka',
      'njemački gradovi',
      'Oktoberfest',
      'Berlin atrakcije',
      'München turizam',
      'njemačka hrana',
      'njemački jezik učenje',
      'rad u Njemačkoj',
      'njemačko zdravstvo',
      'njemačke banke',
      'njemački transport',
      'božićni sajmovi Njemačka'
    ];

    alert('Generirani ključni pojmovi:\n\n' + suggestedKeywords.join(', '));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SEO Podešavanja</h2>
        <button
          onClick={generateKeywords}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <SafeIcon icon={FiZap} className="w-4 h-4" />
          <span>AI Keyword Research</span>
        </button>
      </div>

      {/* General SEO Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiSettings} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Općenite SEO postavke</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naslov sajta</label>
            <input
              type="text"
              value={seoSettings.siteTitle}
              onChange={(e) => handleGeneralSeoChange('siteTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opis sajta</label>
            <textarea
              value={seoSettings.siteDescription}
              onChange={(e) => handleGeneralSeoChange('siteDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ključne riječi</label>
            <input
              type="text"
              value={seoSettings.siteKeywords}
              onChange={(e) => handleGeneralSeoChange('siteKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Odvojite zarezom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
            <input
              type="url"
              value={seoSettings.canonicalUrl}
              onChange={(e) => handleGeneralSeoChange('canonicalUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Schema Markup Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiCode} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Schema Markup</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(seoSettings.schemaTypes).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('schemaTypes', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* XML Sitemaps */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiMap} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">XML Sitemaps</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(seoSettings.sitemaps).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('sitemaps', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RSS Feeds */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiRss} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">RSS Feeds</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(seoSettings.rssFeeds).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('rssFeeds', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Image SEO */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiImage} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">SEO optimizacija slika</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(seoSettings.imageSeo).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('imageSeo', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Text SEO */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">SEO optimizacija teksta</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(seoSettings.textSeo).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('textSeo', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Video SEO */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiVideo} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">SEO optimizacija videa</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(seoSettings.videoSeo).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSeoChange('videoSeo', key, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiNavigation} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Breadcrumbs</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              defaultChecked={true}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Omogući breadcrumbs navigaciju</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              defaultChecked={true}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Uključi breadcrumbs u Schema markup</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            console.log('SEO settings saved:', seoSettings);
            alert('SEO podešavanja su sačuvana!');
          }}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
          <span>Sačuvaj SEO podešavanja</span>
        </button>
      </div>
    </div>
  );
};

// Multilingual Settings Component
const MultilingualSettings = () => {
  const [languages, setLanguages] = useState([
    { code: 'bs', name: 'Bosanski', enabled: true, default: true },
    { code: 'hr', name: 'Hrvatski', enabled: false, default: false },
    { code: 'sr', name: 'Srpski', enabled: false, default: false },
    { code: 'de', name: 'Njemački', enabled: false, default: false },
    { code: 'en', name: 'Engleski', enabled: false, default: false },
    { code: 'fr', name: 'Francuski', enabled: false, default: false },
    { code: 'es', name: 'Španski', enabled: false, default: false },
    { code: 'it', name: 'Italijanski', enabled: false, default: false },
    { code: 'ru', name: 'Ruski', enabled: false, default: false },
    { code: 'tr', name: 'Turski', enabled: false, default: false },
    { code: 'ar', name: 'Arapski', enabled: false, default: false },
    { code: 'zh', name: 'Kineski', enabled: false, default: false },
    { code: 'ja', name: 'Japanski', enabled: false, default: false },
    { code: 'ko', name: 'Korejski', enabled: false, default: false },
    { code: 'pt', name: 'Portugalski', enabled: false, default: false },
    { code: 'nl', name: 'Holandski', enabled: false, default: false },
    { code: 'sv', name: 'Švedski', enabled: false, default: false },
    { code: 'no', name: 'Norveški', enabled: false, default: false },
    { code: 'da', name: 'Danski', enabled: false, default: false },
    { code: 'fi', name: 'Finski', enabled: false, default: false },
    { code: 'pl', name: 'Poljski', enabled: false, default: false },
    { code: 'cs', name: 'Češki', enabled: false, default: false },
    { code: 'sk', name: 'Slovački', enabled: false, default: false },
    { code: 'hu', name: 'Mađarski', enabled: false, default: false },
    { code: 'ro', name: 'Rumunski', enabled: false, default: false },
    { code: 'bg', name: 'Bugarski', enabled: false, default: false },
    { code: 'el', name: 'Grčki', enabled: false, default: false },
    { code: 'he', name: 'Hebrejski', enabled: false, default: false },
    { code: 'hi', name: 'Hindi', enabled: false, default: false },
    { code: 'th', name: 'Tajlandski', enabled: false, default: false }
  ]);

  const [hreflangSettings, setHreflangSettings] = useState({
    enableHreflang: true,
    autoGenerate: true,
    defaultLanguage: 'bs'
  });

  const handleLanguageToggle = (code) => {
    setLanguages(prev => prev.map(lang =>
      lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
    ));
  };

  const handleDefaultLanguage = (code) => {
    setLanguages(prev => prev.map(lang => ({
      ...lang,
      default: lang.code === code
    })));
    setHreflangSettings(prev => ({
      ...prev,
      defaultLanguage: code
    }));
  };

  const enabledLanguages = languages.filter(lang => lang.enabled);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Višejezične postavke</h2>
        <button
          onClick={() => {
            console.log('Multilingual settings saved:', { languages, hreflangSettings });
            alert('Jezičke postavke su sačuvane!');
          }}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
          <span>Sačuvaj postavke</span>
        </button>
      </div>

      {/* Language Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Odabir jezika</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {languages.map((language) => (
            <div key={language.code} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={language.enabled}
                  onChange={() => handleLanguageToggle(language.code)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">{language.name}</span>
                  <div className="text-xs text-gray-500">{language.code}</div>
                </div>
              </div>
              {language.enabled && (
                <button
                  onClick={() => handleDefaultLanguage(language.code)}
                  className={`text-xs px-2 py-1 rounded ${
                    language.default
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {language.default ? 'Glavni' : 'Postavi kao glavni'}
                </button>
              )}
            </div>
          ))}
        </div>

        {enabledLanguages.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Omogućeni jezici ({enabledLanguages.length})</h4>
            <div className="flex flex-wrap gap-2">
              {enabledLanguages.map((lang) => (
                <span
                  key={lang.code}
                  className={`px-3 py-1 rounded-full text-sm ${
                    lang.default
                      ? 'bg-primary-600 text-white'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {lang.name} ({lang.code}) {lang.default && ' - Glavni'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hreflang Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon icon={FiLayers} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Hreflang tagovi</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hreflangSettings.enableHreflang}
              onChange={(e) => setHreflangSettings(prev => ({
                ...prev,
                enableHreflang: e.target.checked
              }))}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Omogući hreflang tagove</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hreflangSettings.autoGenerate}
              onChange={(e) => setHreflangSettings(prev => ({
                ...prev,
                autoGenerate: e.target.checked
              }))}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Automatski generiši hreflang tagove</span>
          </label>

          {hreflangSettings.enableHreflang && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Pregled hreflang tagova</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {enabledLanguages.map((lang) => (
                  <div key={lang.code} className="font-mono">
                    &lt;link rel="alternate" hreflang="{lang.code}" href="https://njemacka-blog.com/{lang.code}/" /&gt;
                  </div>
                ))}
                <div className="font-mono">
                  &lt;link rel="alternate" hreflang="x-default" href="https://njemacka-blog.com/" /&gt;
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Translation Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon icon={FiTarget} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Upravljanje prijevodima</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Automatski prijevod</h4>
              <p className="text-sm text-gray-600">Koristi AI za automatsko prevođenje sadržaja</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Konfiguriši
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Manualni prijevod</h4>
              <p className="text-sm text-gray-600">Ručno dodavanje prijevoda za svaki sadržaj</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
              Upravljaj
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Status prijevoda</h4>
              <p className="text-sm text-gray-600">Pregled stanja prijevoda za sve jezike</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
              Pregled
            </button>
          </div>
        </div>
      </div>

      {/* URL Structure */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon icon={FiNavigation} className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">URL struktura</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option value="subdirectory">Poddirektorij (example.com/de/)</option>
              <option value="subdomain">Poddomen (de.example.com)</option>
              <option value="parameter">Parametar (example.com?lang=de)</option>
            </select>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Primjer URL strukture</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div>Glavni jezik: https://njemacka-blog.com/</div>
              {enabledLanguages.filter(lang => !lang.default).map((lang) => (
                <div key={lang.code}>
                  {lang.name}: https://njemacka-blog.com/{lang.code}/
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;