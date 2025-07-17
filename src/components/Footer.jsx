import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFacebook, FiTwitter, FiInstagram, FiMail, FiHeart, FiLogIn } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-6 bg-gradient-to-r from-german-black via-german-red to-german-gold rounded"></div>
              <span className="text-2xl font-bold">Njemačka</span>
            </div>
            <p className="text-gray-300 mb-6">
              Vaš sveobuhvatan vodič kroz Njemačku - istražujemo kulturu, putovanja, način života i sve što čini Njemačku posebnom.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiFacebook} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiMail} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Početna</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">O nama</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Kontakt</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors">Vijesti</Link></li>
              <li><Link to="/coupons" className="text-gray-300 hover:text-white transition-colors">Kuponi</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategorije</h3>
            <ul className="space-y-2">
              <li><Link to="/category/jeftina-putovanja" className="text-gray-300 hover:text-white transition-colors">Jeftina Putovanja</Link></li>
              <li><Link to="/category/kultura" className="text-gray-300 hover:text-white transition-colors">Kultura</Link></li>
              <li><Link to="/category/zivot" className="text-gray-300 hover:text-white transition-colors">Život</Link></li>
              <li><Link to="/category/besplatno" className="text-gray-300 hover:text-white transition-colors">Besplatno</Link></li>
              <li><Link to="/category/kredit-u-njemackoj" className="text-gray-300 hover:text-white transition-colors">Kredit</Link></li>
              <li><Link to="/category/zdravstveno-osiguranje" className="text-gray-300 hover:text-white transition-colors">Zdravstvo</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Pretplatite se na naš newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Vaša email adresa"
                className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors">
                Pretplatite se
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Pretplatom pristajete primati naše novosti. Možete se odjaviti u bilo kojem trenutku.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-4 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 flex items-center space-x-1 mb-4 sm:mb-0">
            <span>Napravljeno sa</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
            <span>za ljubitelje Njemačke</span>
          </p>

          {/* Admin Login Link */}
          <Link
            to="/admin/login"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <SafeIcon icon={FiLogIn} className="w-4 h-4" />
            <span>Prijava</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;