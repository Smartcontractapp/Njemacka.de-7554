import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGlobe, FiUsers, FiAward } = FiIcons;

const About = () => {
  const stats = [
    { icon: FiGlobe, label: 'Pokrivenih gradova', value: '50+' },
    { icon: FiUsers, label: 'Mjesečnih čitaoca', value: '10K+' },
    { icon: FiHeart, label: 'Podeljenih priča', value: '200+' },
    { icon: FiAward, label: 'Godina iskustva', value: '5+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O Njemačkoj
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Strastveni smo za dijeljenje ljepote, kulture i iskustava koja čine Njemačku zaista posebnom. Naša misija je da budemo vaš pouzdan vodič kroz sve što je njemačko.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Naša priča
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Njemačka je nastala iz duboke ljubavi prema Njemačkoj i želje da podelimo njeze čuda sa svetom. Ono što je počelo kao lični travel blog je poraslo u sveobuhvatan resurs za sve koji su zainteresovani za njemačku kulturu, putovanja i način života.
                </p>
                <p>
                  Vjerujemo da Njemačka ima toliko toga da ponudi van tipičnih turističkih atrakcija. Od skrivenih dragulja u malim gradovima do živahne kulture velikih gradova, tu smo da vam pomognemo da otkrijete autentično njemačko iskustvo.
                </p>
                <p>
                  Naš tim pisaca i saradnika je strastan za Njemačku, mnogi od njih su tamo živeli ili imaju duboke veze sa zemljom. Donosimo vam iskustva iz prve ruke, insajderske savjete i iskrene uvide.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Njemački krajolik"
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Naš uticaj
            </h2>
            <p className="text-lg text-gray-600">
              Brojevi koji odražavaju našu posvećenost dijeljenju Njemačke sa svetom
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={stat.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Naša misija
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Inspirisati i informisati ljude o Njemačkoj kroz autentično pripovedanje, praktične savjete i kulturne uvide. Cilj nam je da premostimo kulture i stvorimo značajne veze između Njemačke i svijeta.
            </p>
            <div className="bg-primary-50 rounded-lg p-8">
              <p className="text-primary-800 font-medium text-lg">
                "Njemačka nije samo destinacija, to je iskustvo koje vas mijenja. Tu smo da vam pomognemo da otkrijete tu transformaciju."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;