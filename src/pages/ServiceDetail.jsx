import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReviewsSection from '../components/ReviewsSection';
import { getReviewsByService, addReview } from '../data/reviews';

const {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiClock,
  FiMessageSquare,
  FiHeart,
  FiShare2,
  FiStar,
  FiArrowLeft,
  FiCheck,
  FiInfo,
  FiNavigation
} = FiIcons;

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchService = async () => {
      setLoading(true);
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get reviews for this service
        const serviceReviews = getReviewsByService(parseInt(id));
        setReviews(serviceReviews);

        // Mock service data
        const mockService = {
          id: parseInt(id),
          name: "Dr. Marko Petrović",
          category: "Doktori",
          subcategory: "Opća medicina",
          city: "Berlin",
          address: "Kantstraße 45, 10625 Berlin",
          phone: "+49 30 1234567",
          whatsapp: "+49 1577 1234567",
          email: "dr.petrovic@example.com",
          website: "https://dr-petrovic.de",
          openingHours: {
            monday: "09:00 - 18:00",
            tuesday: "09:00 - 18:00",
            wednesday: "09:00 - 18:00",
            thursday: "09:00 - 18:00",
            friday: "09:00 - 16:00",
            saturday: "Zatvoreno",
            sunday: "Zatvoreno"
          },
          description: "Dr. Marko Petrović je specijalista opće medicine s preko 15 godina iskustva. Govori bosanski, hrvatski, srpski, engleski i njemački jezik. Njegova ordinacija nudi širok spektar usluga, uključujući preventivne preglede, liječenje akutnih i kroničnih bolesti, savjetovanje o zdravlju i izdavanje recepata. Dr. Petrović ima poseban interes za kardiologiju i dijabetes. Svi posjetitelji su dobrodošli, bez obzira na vrstu osiguranja.",
          image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1200&auto=format&fit=crop&q=60",
          location: {
            lat: 52.5065133,
            lng: 13.3258433
          },
          rating: 4.8,
          reviewCount: serviceReviews.length,
          languages: ["Bosanski", "Hrvatski", "Srpski", "Engleski", "Njemački"],
          verified: true,
          services: [
            "Opći zdravstveni pregledi",
            "Preventivna medicina",
            "Liječenje akutnih i kroničnih bolesti",
            "Savjetovanje o zdravlju",
            "Izdavanje recepata i uputnica",
            "Male kirurške intervencije"
          ],
          insurances: [
            "Gesetzliche Krankenkassen (AOK, TK, Barmer, DAK, itd.)",
            "Private Krankenversicherungen",
            "Selbstzahler"
          ]
        };
        setService(mockService);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmitReview = (reviewData) => {
    // In a real app, this would send the review to an API
    const newReview = addReview('service', parseInt(id), reviewData);
    setReviews(prevReviews => [...prevReviews, newReview]);
    
    // Update service rating
    const allReviews = [...reviews, newReview];
    const newRating = (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1);
    
    setService(prev => ({
      ...prev,
      rating: parseFloat(newRating),
      reviewCount: allReviews.length
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Usluga nije pronađena</h1>
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            Vrati se na popis usluga
          </Link>
        </div>
      </div>
    );
  }

  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/services" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Nazad na popis usluga</span>
          </Link>
        </div>

        {/* Service Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.category}
                </span>
                {service.subcategory && (
                  <span className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm">
                    {service.subcategory}
                  </span>
                )}
                {service.verified && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                    Verifikovano
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {service.name}
              </h1>
              <div className="flex items-center space-x-1 text-white/90">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>{service.address}, {service.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O nama</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {service.description}
              </p>

              {/* Services List */}
              {service.services && service.services.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Usluge:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.services.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Insurance */}
              {service.insurances && service.insurances.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Prihvaćena osiguranja:</h3>
                  <ul className="space-y-1">
                    {service.insurances.map((insurance, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{insurance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <ReviewsSection reviews={reviews} onSubmitReview={handleSubmitReview} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakt informacije</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Adresa</div>
                    <div className="text-gray-700">{service.address}</div>
                    <div className="text-gray-700">{service.city}</div>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm mt-1"
                    >
                      <SafeIcon icon={FiNavigation} className="w-4 h-4" />
                      <span>Pokreni navigaciju</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Telefon</div>
                    <a href={`tel:${service.phone}`} className="text-primary-600 hover:text-primary-700">
                      {service.phone}
                    </a>
                  </div>
                </div>

                {service.whatsapp && (
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">WhatsApp</div>
                      <a
                        href={`https://wa.me/${service.whatsapp.replace(/\+|\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        {service.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Email</div>
                    <a href={`mailto:${service.email}`} className="text-primary-600 hover:text-primary-700">
                      {service.email}
                    </a>
                  </div>
                </div>

                {service.website && (
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiGlobe} className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Website</div>
                      <a
                        href={service.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {service.website.replace(/(^\w+:|^)\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <a
                  href={`tel:${service.phone}`}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                  <span>Pozovi</span>
                </a>
                {service.whatsapp ? (
                  <a
                    href={`https://wa.me/${service.whatsapp.replace(/\+|\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                ) : (
                  <a
                    href={`mailto:${service.email}`}
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                )}
              </div>

              {/* Save and Share */}
              <div className="flex mt-4">
                <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  <span>Sačuvaj</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors ml-3">
                  <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  <span>Podijeli</span>
                </button>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Radno vrijeme</h3>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Ponedjeljak</div>
                  <div className="text-gray-700">{service.openingHours.monday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Utorak</div>
                  <div className="text-gray-700">{service.openingHours.tuesday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Srijeda</div>
                  <div className="text-gray-700">{service.openingHours.wednesday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Četvrtak</div>
                  <div className="text-gray-700">{service.openingHours.thursday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Petak</div>
                  <div className="text-gray-700">{service.openingHours.friday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Subota</div>
                  <div className="text-gray-700">{service.openingHours.saturday}</div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-gray-900">Nedjelja</div>
                  <div className="text-gray-700">{service.openingHours.sunday}</div>
                </div>
              </div>
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-green-600 mr-2" />
                <div className="text-green-700 font-medium">Trenutno otvoreno</div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jezici</h3>
              <div className="flex flex-wrap gap-2">
                {service.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lokacija</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {/* In a real app, you would embed an actual Google Map here */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">Google Maps</span>
                </div>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors mt-4"
              >
                <SafeIcon icon={FiNavigation} className="w-4 h-4" />
                <span>Pokreni navigaciju</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;