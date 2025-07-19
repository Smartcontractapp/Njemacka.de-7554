import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import CouponCard from '../components/CouponCard';
import NewsCard from '../components/NewsCard';
import FAQCard from '../components/FAQCard';
import ClassifiedsSection from '../components/ClassifiedsSection';
import DatingSection from '../components/DatingSection';
import ServiceCard from '../components/ServiceCard';
import {blogPosts} from '../data/blogPosts';
import {coupons} from '../data/coupons';
import {dailyNews} from '../data/news';
import {faqData} from '../data/faq';
import {classifiedAds} from '../data/classifiedAds';
import {datingProfiles} from '../data/datingProfiles';
import {services,getFeaturedServices} from '../data/services';

const {FiArrowRight,FiTrendingUp,FiTag,FiRss,FiHelpCircle,FiGift,FiCreditCard,FiDollarSign,FiHeart,FiSmartphone,FiWifi,FiMapPin,FiCheckSquare,FiBookOpen,FiCheck,FiAward,FiStar,FiBriefcase,FiUsers,FiGlobe,FiShield}=FiIcons;

const Home=()=> {
  const featuredPosts=blogPosts.slice(0,3);
  const featuredCoupons=coupons.filter(coupon=> coupon.featured).slice(0,3);
  const latestNews=dailyNews.slice(0,3);
  const popularFAQ=faqData.filter(faq=> faq.views > 1000).slice(0,3);

  // Jeftina Putovanja posts
  const travelPosts=blogPosts.filter(post=> post.category==='Jeftina Putovanja').slice(0,3);

  // Approved classified ads
  const approvedAds=classifiedAds.filter(ad=> ad.status==='approved');

  // Featured services for business directory
  const featuredServices=getFeaturedServices().slice(0,3);

  return (
    <>
      <SEOHead
        title="Otkrijte Njemačku - Vaš vodič kroz kulturu,putovanja i život"
        description="Sveobuhvatan vodič kroz Njemačku sa blog postovima,vijestima,kuponima i FAQ-om. Otkrijte kulturu,putovanja i način života u Njemačkoj."
        keywords="Njemačka,blog,putovanja,kultura,život,vijesti,kuponi,FAQ,saveti"
        url="/"
        type="website"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{duration: 0.8}}
              className="text-center"
            >
              {/* Prvi red buttona */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center mb-2">
                <Link
                  to="/category/jeftina-putovanja"
                  className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>Počnite istraživanje</span>
                  <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                </Link>
                <Link
                  to="/quiz"
                  className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiCheckSquare} className="w-4 h-4" />
                  <span>Njemački Kviz</span>
                </Link>
                <Link
                  to="/coupons"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiTag} className="w-4 h-4" />
                  <span>Kuponi</span>
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                  <span>FAQ i savjeti</span>
                </Link>
              </div>

              {/* Drugi red buttona */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  to="/category/besplatno"
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiGift} className="w-4 h-4" />
                  <span>Besplatno</span>
                </Link>
                <Link
                  to="/category/kredit-u-njemackoj"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
                  <span>Kredit u Njemačkoj</span>
                </Link>
                <Link
                  to="/category/bankovni-racun"
                  className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                  <span>Bankovni račun</span>
                </Link>
                <Link
                  to="/category/zdravstveno-osiguranje"
                  className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  <span>Zdravstveno osiguranje</span>
                </Link>
              </div>

              {/* Treći red buttona */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
                <Link
                  to="/category/mobilni-telefoni"
                  className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiSmartphone} className="w-4 h-4" />
                  <span>Mobilni Telefoni</span>
                </Link>
                <Link
                  to="/category/internet-prikljucak"
                  className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                >
                  <SafeIcon icon={FiWifi} className="w-4 h-4" />
                  <span>Internet priključak</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                  <SafeIcon icon={FiRss} className="w-8 h-8 text-blue-600" />
                  <span>Najnovije vijesti</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Ostanite u toku sa najnovijim događajima iz Njemačke
                </p>
              </div>
              <Link
                to="/news"
                className="hidden sm:inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Sve vijesti</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((news,index)=> (
                <NewsCard
                  key={news.id}
                  news={news}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Coupons Section */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                  <SafeIcon icon={FiTag} className="w-8 h-8 text-red-600" />
                  <span>Izdvojeni popusti</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Najbolje ponude za putovanja i kupovinu u Njemačkoj
                </p>
              </div>
              <Link
                to="/coupons"
                className="hidden sm:inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
              >
                <span>Svi kuponi</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCoupons.map((coupon,index)=> (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Jeftina Putovanja Section */}
        {travelPosts.length > 0 && (
          <section className="py-16 bg-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{opacity: 0,y: 20}}
                whileInView={{opacity: 1,y: 0}}
                transition={{duration: 0.6}}
                className="flex items-center justify-between mb-12"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                    <SafeIcon icon={FiMapPin} className="w-8 h-8 text-orange-600" />
                    <span>Jeftina Putovanja</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    Otkrijte Njemačku uz naše savjete za pristupačna putovanja
                  </p>
                </div>
                <Link
                  to="/category/jeftina-putovanja"
                  className="hidden sm:inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <span>Sva putovanja</span>
                  <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {travelPosts.map((post,index)=> (
                  <BlogCard
                    key={post.id}
                    post={post}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Local Business Directory Section - UPDATED TITLE AND REMOVED SPECIFIC FEATURES */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
                <SafeIcon icon={FiBriefcase} className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Usluge po gradovima
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pronađite pouzdane firme i usluge u vašem gradu.
              </p>
            </motion.div>

            {/* Featured Services */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service,index)=> (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                {name: 'Doktori',icon: FiHeart,color: 'text-red-600 bg-red-100',link: '/services?category=doktori'},
                {name: 'Zubari',icon: FiUsers,color: 'text-blue-600 bg-blue-100',link: '/services?category=zubari'},
                {name: 'Pravnici',icon: FiShield,color: 'text-purple-600 bg-purple-100',link: '/services?category=pravna-podrska'},
                {name: 'Restorani',icon: FiUsers,color: 'text-orange-600 bg-orange-100',link: '/services?category=ugostiteljstvo'},
                {name: 'Beauty',icon: FiHeart,color: 'text-pink-600 bg-pink-100',link: '/services?category=beauty-saloni'},
                {name: 'Auto servisi',icon: FiBriefcase,color: 'text-gray-600 bg-gray-100',link: '/services?category=auto'}
              ].map((category,index)=> (
                <motion.div
                  key={category.name}
                  initial={{opacity: 0,y: 20}}
                  whileInView={{opacity: 1,y: 0}}
                  transition={{duration: 0.6,delay: index * 0.1}}
                >
                  <Link
                    to={category.link}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                  >
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                      <SafeIcon icon={category.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Leva strana - Sadržaj */}
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Pronađite pouzdane usluge u vašem gradu
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Naš direktorij povezuje vas sa verifikovanim firmama koje govore vaš jezik. Od doktora i zubara do pravnika i restorana - sve što vam treba na jednom mjestu.
                  </p>

                  {/* Karakteristike */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Preko 100 firmi</h4>
                        <p className="text-sm text-gray-600">U različitim gradovima Njemačke</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Direktan kontakt</h4>
                        <p className="text-sm text-gray-600">Telefon,WhatsApp i email podaci</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Radno vrijeme</h4>
                        <p className="text-sm text-gray-600">Ažurne informacije o radnom vremenu</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/services"
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                      <SafeIcon icon={FiBriefcase} className="w-5 h-5" />
                      <span>Pretražite usluge</span>
                    </Link>
                    <Link
                      to="/services?add=true"
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                      <SafeIcon icon={FiUsers} className="w-5 h-5" />
                      <span>Dodaj firmu</span>
                    </Link>
                  </div>
                </div>

                {/* Desna strana - Visual */}
                <div className="relative bg-gradient-to-br from-purple-200 to-purple-300 p-8 lg:p-12">
                  <div className="relative">
                    {/* Mock business card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <SafeIcon icon={FiHeart} className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Dr. Marko Petrović</h4>
                            <p className="text-sm text-gray-600">Opća medicina</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                          Verifikovano
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Berlin,Kantstraße 45</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_,i)=> (
                              <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-gray-600">4.8 (124 recenzija)</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          Pozovi
                        </button>
                        <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg text-sm font-medium">
                          Detalji
                        </button>
                      </div>
                    </div>

                    {/* Statistike */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">15+</div>
                        <div className="text-sm text-gray-600">Kategorija</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">100+</div>
                        <div className="text-sm text-gray-600">Firmi</div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg">
                      <SafeIcon icon={FiBriefcase} className="w-6 h-6" />
                    </div>
                    <div className="absolute top-1/2 -left-4 bg-white p-2 rounded-full shadow-lg">
                      <SafeIcon icon={FiUsers} className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kviz o njemačkom jeziku Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
                <SafeIcon icon={FiCheckSquare} className="w-8 h-8 text-yellow-600" />
                <span>Kviz o njemačkom jeziku</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Testiraj svoje znanje njemačkog jezika ovim besplatnim kvizom
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Leva strana - Sadržaj */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      100% Besplatno
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Naučite njemački kroz zabavu
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Naš interaktivni kviz je savršen način da testirate svoje znanje njemačkog jezika. Pitanja su na bosanskom jeziku,a odgovori na njemačkom - idealno za učenje novih riječi i fraza.
                  </p>

                  {/* Karakteristike kviza */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Preko 50 pitanja</h4>
                        <p className="text-sm text-gray-600">Različite kategorije i nivoi težine</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiAward} className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Objašnjenja odgovora</h4>
                        <p className="text-sm text-gray-600">Naučite razlog za svaki tačan odgovor</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-1 rounded-full mt-1">
                        <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Praćenje rezultata</h4>
                        <p className="text-sm text-gray-600">Vidite svoj napredak u realnom vremenu</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      to="/quiz"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <SafeIcon icon={FiCheckSquare} className="w-5 h-5" />
                      <span>Započni kviz sada</span>
                      <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                    </Link>
                    <p className="text-center text-sm text-gray-500">
                      Nema registracije • Potpuno besplatno • Dostupno 24/7
                    </p>
                  </div>
                </div>

                {/* Desna strana - Slika i preview */}
                <div className="relative bg-gradient-to-br from-yellow-200 to-yellow-300 p-8 lg:p-12">
                  <div className="relative">
                    {/* Mock quiz preview */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Pozdravi
                        </span>
                        <span className="text-gray-500 text-sm">Pitanje 1/10</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Kako kažete "Dobro jutro" na njemačkom?
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 font-medium">
                          A) Guten Morgen ✓
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-600">
                          B) Guten Tag
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-600">
                          C) Gute Nacht
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Tačno!</strong> "Guten Morgen" se koristi za jutarnji pozdrav.
                        </p>
                      </div>
                    </div>

                    {/* Statistike */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">12+</div>
                        <div className="text-sm text-gray-600">Kategorija</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">50+</div>
                        <div className="text-sm text-gray-600">Pitanja</div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg">
                      <SafeIcon icon={FiAward} className="w-6 h-6" />
                    </div>
                    <div className="absolute top-1/2 -left-4 bg-white p-2 rounded-full shadow-lg">
                      <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dodatne informacije */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-4 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Pitanja na bosanskom</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Odgovori na njemačkom</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Objašnjenja uključena</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular FAQ Section - MOVED HERE */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                  <SafeIcon icon={FiHelpCircle} className="w-8 h-8 text-green-600" />
                  <span>Najpopularniji savjeti</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Odgovori na najčešće postavljena pitanja o životu u Njemačkoj
                </p>
              </div>
              <Link
                to="/faq"
                className="hidden sm:inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <span>Svi FAQ</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularFAQ.map((faq,index)=> (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Dating Section */}
        <DatingSection initialProfiles={datingProfiles} />

        {/* Classifieds Section */}
        <ClassifiedsSection initialAds={approvedAds} />

        {/* Featured Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Istaknute priče
              </h2>
              <p className="text-lg text-gray-600">
                Naši najpopularniji i najzanimljiviji članci o Njemačkoj
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post,index)=> (
                <BlogCard
                  key={post.id}
                  post={post}
                  delay={index * 0.1}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/category/jeftina-putovanja"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <span>Pogledajte sve objave</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{opacity: 0,y: 20}}
              whileInView={{opacity: 1,y: 0}}
              transition={{duration: 0.6}}
            >
              <h2 className="text-3xl font-bold mb-4">Pretplatite se na naš newsletter</h2>
              <p className="text-xl text-primary-100 mb-6">
                Primajte najnovije vijesti,savjete za putovanja i ekskluzivne ponude direktno u vaš inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Vaša email adresa"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Pretplatite se
                </button>
              </div>
              <p className="text-sm text-primary-200 mt-4">
                Poštujemo vašu privatnost. Nikada nećemo dijeliti vaše podatke s trećim stranama.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;