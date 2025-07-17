import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { classifiedAds } from '../../data/classifiedAds';

const { 
  FiCheckCircle, FiXCircle, FiEye, FiTrash2, FiAlertTriangle,
  FiTag, FiCalendar, FiMapPin, FiUser, FiMail, FiPhone
} = FiIcons;

const ClassifiedAdsManager = () => {
  const [ads, setAds] = useState([
    ...classifiedAds,
    // Add some pending ads for demo
    {
      id: 7,
      title: "Tražim cimera za stan u Düsseldorfu",
      description: "Tražim cimera za dvosoban stan u Düsseldorfu, u kvartu Bilk. Stan je veličine 65m² i mjesečna najamnina je 1200€ (600€ po osobi). Tražim nekoga ko je uredan, ne puši i nema kućne ljubimce.",
      category: "Stanovanje",
      price: 600,
      location: "Düsseldorf, Bilk",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["cimer", "stan", "Düsseldorf"],
      author: "Mirza Hadžić",
      email: "mirza@example.com",
      phone: "+49 555 123 456",
      date: "16.12.2024",
      status: "pending"
    },
    {
      id: 8,
      title: "Prodajem karte za koncert u Kölnu",
      description: "Prodajem dvije karte za koncert grupe Rammstein u Kölnu 28. decembra. Nažalost, ne mogu ići zbog neočekivanih obaveza. Karte su za stajaći sektor.",
      category: "Prodaja",
      price: 150,
      location: "Köln",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["koncert", "karte", "Rammstein", "muzika"],
      author: "Adnan Mehić",
      email: "adnan@example.com",
      phone: "+49 666 777 888",
      date: "16.12.2024",
      status: "pending"
    }
  ]);

  const [selectedAd, setSelectedAd] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'

  const pendingAds = ads.filter(ad => ad.status === 'pending');
  const approvedAds = ads.filter(ad => ad.status === 'approved');
  const rejectedAds = ads.filter(ad => ad.status === 'rejected');

  const filteredAds = filter === 'all' 
    ? ads 
    : ads.filter(ad => ad.status === filter);

  const handleApprove = (adId) => {
    setAds(ads.map(ad => 
      ad.id === adId ? { ...ad, status: 'approved' } : ad
    ));
    setSelectedAd(null);
  };

  const handleReject = (adId) => {
    setAds(ads.map(ad => 
      ad.id === adId ? { ...ad, status: 'rejected' } : ad
    ));
    setSelectedAd(null);
  };

  const handleDelete = (adId) => {
    if (window.confirm('Jeste li sigurni da želite trajno obrisati ovaj oglas?')) {
      setAds(ads.filter(ad => ad.id !== adId));
      setSelectedAd(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Upravljanje oglasima</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Svi oglasi</option>
            <option value="pending">Na čekanju ({pendingAds.length})</option>
            <option value="approved">Odobreni ({approvedAds.length})</option>
            <option value="rejected">Odbijeni ({rejectedAds.length})</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredAds.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oglas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategorija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokacija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAds.map((ad) => (
                <tr key={ad.id} className={`hover:bg-gray-50`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-10 w-10 rounded-lg object-cover" 
                        src={ad.image} 
                        alt="" 
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                        <div className="text-sm text-gray-500">
                          {ad.price ? `${ad.price}€` : 'Po dogovoru'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ad.category === 'Posao' ? 'bg-blue-100 text-blue-800' :
                      ad.category === 'Stanovanje' ? 'bg-green-100 text-green-800' :
                      ad.category === 'Prodaja' ? 'bg-purple-100 text-purple-800' :
                      ad.category === 'Usluge' ? 'bg-yellow-100 text-yellow-800' :
                      ad.category === 'Putovanja' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ad.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ad.status === 'approved' ? 'bg-green-100 text-green-800' :
                      ad.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ad.status === 'approved' ? 'Odobren' :
                       ad.status === 'rejected' ? 'Odbijen' :
                       'Na čekanju'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedAd(ad)}
                        className="text-primary-600 hover:text-primary-900"
                        title="Pregled"
                      >
                        <SafeIcon icon={FiEye} className="w-5 h-5" />
                      </button>
                      
                      {ad.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(ad.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Odobri"
                          >
                            <SafeIcon icon={FiCheckCircle} className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(ad.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Odbij"
                          >
                            <SafeIcon icon={FiXCircle} className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Obriši"
                      >
                        <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center">
            <SafeIcon icon={FiAlertTriangle} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              Nema {filter === 'all' ? 'oglasa' : 
                filter === 'pending' ? 'oglasa na čekanju' : 
                filter === 'approved' ? 'odobrenih oglasa' : 
                'odbijenih oglasa'}
            </p>
          </div>
        )}
      </div>

      {/* Ad Detail Modal */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img 
                src={selectedAd.image} 
                alt={selectedAd.title} 
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedAd(null)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <SafeIcon icon={FiXCircle} className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4">
                <span className={`${
                  selectedAd.category === 'Posao' ? 'bg-blue-500' :
                  selectedAd.category === 'Stanovanje' ? 'bg-green-500' :
                  selectedAd.category === 'Prodaja' ? 'bg-purple-500' :
                  selectedAd.category === 'Usluge' ? 'bg-yellow-500' :
                  'bg-gray-500'
                } text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {selectedAd.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedAd.title}</h3>
                <span className="text-xl font-bold text-primary-600">
                  {selectedAd.price ? `${selectedAd.price}€` : 'Po dogovoru'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>{selectedAd.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{selectedAd.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>{selectedAd.author}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {selectedAd.description}
              </p>
              
              {selectedAd.tags && selectedAd.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedAd.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      <SafeIcon icon={FiTag} className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Kontakt informacije:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
                    <span>{selectedAd.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
                    <span>{selectedAd.email}</span>
                  </div>
                  {selectedAd.phone && (
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400" />
                      <span>{selectedAd.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedAd(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Zatvori
                </button>
                
                {selectedAd.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedAd.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Odobri
                    </button>
                    <button
                      onClick={() => handleReject(selectedAd.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Odbij
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => handleDelete(selectedAd.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Obriši
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClassifiedAdsManager;