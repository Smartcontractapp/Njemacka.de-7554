import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiMail,
  FiTag,
  FiRss,
  FiHelpCircle,
  FiGift,
  FiCreditCard,
  FiDollarSign,
  FiHeart,
  FiSmartphone,
  FiWifi,
  FiMapPin,
  FiBook,
  FiUsers,
  FiChevronDown,
  FiGlobe,
  FiShoppingCart,
  FiTrendingUp,
  FiCalendar,
  FiBookOpen,
  FiCamera,
  FiCoffee,
  FiMusic,
  FiFilm,
  FiSun,
  FiUmbrella,
  FiCompass,
  FiTrain,
  FiCar,
  FiPlane,
  FiBuilding,
  FiShield,
  FiPhone,
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiHeadphones,
  FiLifeBuoy,
  FiFileText,
  FiEdit,
  FiCheckSquare,
  FiPlus
} = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navigationMenu = [
    {
      name: 'Početna',
      href: '/',
      icon: FiHome,
      hasDropdown: false
    },
    {
      name: 'Usluge po gradovima',
      href: '/services',
      icon: FiMapPin,
      hasDropdown: true,
      submenu: [
        {
          name: 'Svi gradovi',
          href: '/services',
          icon: FiMapPin,
          description: 'Pregled svih gradova i usluga'
        },
        {
          name: 'Berlin',
          href: '/services?city=Berlin',
          icon: FiBuilding,
          description: 'Usluge u Berlinu'
        },
        {
          name: 'München',
          href: '/services?city=München',
          icon: FiBuilding,
          description: 'Usluge u Münchenu'
        },
        {
          name: 'Hamburg',
          href: '/services?city=Hamburg',
          icon: FiBuilding,
          description: 'Usluge u Hamburgu'
        },
        {
          name: 'Frankfurt',
          href: '/services?city=Frankfurt am Main',
          icon: FiBuilding,
          description: 'Usluge u Frankfurtu'
        },
        {
          name: 'Dodaj firmu',
          href: '/services?add=true',
          icon: FiPlus,
          description: 'Dodajte svoju firmu u direktorij'
        }
      ]
    },
    {
      name: 'Putovanja',
      href: '/category/jeftina-putovanja',
      icon: FiMapPin,
      hasDropdown: true,
      submenu: [
        {
          name: 'Jeftina Putovanja',
          href: '/category/jeftina-putovanja',
          icon: FiCompass,
          description: 'Putujte po Njemačkoj uz naše budget savjete'
        },
        {
          name: 'Gradovi',
          href: '/category/gradovi',
          icon: FiBuilding,
          description: 'Otkrijte najljepše njemačke gradove'
        },
        {
          name: 'Priroda',
          href: '/category/priroda',
          icon: FiSun,
          description: 'Planine, jezera i nacionalni parkovi'
        },
        {
          name: 'Transport',
          href: '/category/transport',
          icon: FiTrain,
          description: 'Savjeti za javni prevoz i putovanje'
        },
        {
          name: 'Smještaj',
          href: '/category/smjestaj',
          icon: FiUmbrella,
          description: 'Hoteli, hosteli i apartmani'
        }
      ]
    },
    {
      name: 'Kultura',
      href: '/category/kultura',
      icon: FiBook,
      hasDropdown: true,
      submenu: [
        {
          name: 'Kultura i Istorija',
          href: '/category/kultura',
          icon: FiBookOpen,
          description: 'Bogato kulturno nasleđe Njemačke'
        },
        {
          name: 'Festivali',
          href: '/category/festivali',
          icon: FiCalendar,
          description: 'Oktoberfest, božićni sajmovi i drugo'
        },
        {
          name: 'Muzika',
          href: '/category/muzika',
          icon: FiMusic,
          description: 'Klasična muzika, opera i savremeni zvukovi'
        },
        {
          name: 'Umetnost',
          href: '/category/umetnost',
          icon: FiCamera,
          description: 'Muzeji, galerije i umetničke kolonije'
        },
        {
          name: 'Film i TV',
          href: '/category/film',
          icon: FiFilm,
          description: 'Njemačka kinematografija i televizija'
        }
      ]
    },
    {
      name: 'Život',
      href: '/category/zivot',
      icon: FiUsers,
      hasDropdown: true,
      submenu: [
        {
          name: 'Način Života',
          href: '/category/zivot',
          icon: FiCoffee,
          description: 'Svakodnevni život u Njemačkoj'
        },
        {
          name: 'Rad i Karijera',
          href: '/category/rad',
          icon: FiTrendingUp,
          description: 'Zapošljavanje i poslovne prilike'
        },
        {
          name: 'Obrazovanje',
          href: '/category/obrazovanje',
          icon: FiBook,
          description: 'Škole, univerziteti i kursevi'
        },
        {
          name: 'Zdravlje',
          href: '/category/zdravlje',
          icon: FiHeart,
          description: 'Zdravstveni sistem i wellness'
        },
        {
          name: 'Hrana i Piće',
          href: '/category/hrana',
          icon: FiCoffee,
          description: 'Njemačka kuhinja i lokalni specijaliteti'
        }
      ]
    },
    {
      name: 'Finansije',
      href: '/category/kredit-u-njemackoj',
      icon: FiDollarSign,
      hasDropdown: true,
      submenu: [
        {
          name: 'Kredit u Njemačkoj',
          href: '/category/kredit-u-njemackoj',
          icon: FiCreditCard,
          description: 'Sve o kreditima i zajmovima'
        },
        {
          name: 'Bankovni Račun',
          href: '/category/bankovni-racun',
          icon: FiDollarSign,
          description: 'Otvaranje i korišćenje bankovnih računa'
        },
        {
          name: 'Osiguranje',
          href: '/category/zdravstveno-osiguranje',
          icon: FiShield,
          description: 'Zdravstveno i druga osiguranja'
        },
        {
          name: 'Porezi',
          href: '/category/porezi',
          icon: FiFileText,
          description: 'Poreska obaveza i povraćaji'
        },
        {
          name: 'Investiranje',
          href: '/category/investiranje',
          icon: FiTrendingUp,
          description: 'Štednja i investicije u Njemačkoj'
        }
      ]
    },
    {
      name: 'Kviz',
      href: '/quiz',
      icon: FiCheckSquare,
      hasDropdown: false
    },
    {
      name: 'Tehnologija',
      href: '/category/mobilni-telefoni',
      icon: FiSmartphone,
      hasDropdown: true,
      submenu: [
        {
          name: 'Mobilni Telefoni',
          href: '/category/mobilni-telefoni',
          icon: FiPhone,
          description: 'Operatori, tarife i usluge'
        },
        {
          name: 'Internet Priključak',
          href: '/category/internet-prikljucak',
          icon: FiWifi,
          description: 'Internet provajderi i instalacija'
        },
        {
          name: 'Digitalne Usluge',
          href: '/category/digitalne-usluge',
          icon: FiMonitor,
          description: 'Online servisi i aplikacije'
        },
        {
          name: 'Tech News',
          href: '/category/tech-news',
          icon: FiCpu,
          description: 'Najnovije iz sveta tehnologije'
        }
      ]
    },
    {
      name: 'Besplatno',
      href: '/category/besplatno',
      icon: FiGift,
      hasDropdown: true,
      submenu: [
        {
          name: 'Besplatne Usluge',
          href: '/category/besplatno',
          icon: FiGift,
          description: 'Besplatne aplikacije i servisi'
        },
        {
          name: 'Kuponi',
          href: '/coupons',
          icon: FiTag,
          description: 'Popusti i specijalne ponude'
        },
        {
          name: 'Događaji',
          href: '/category/besplatni-dogadjaji',
          icon: FiCalendar,
          description: 'Besplatni koncerti, festivali i izložbe'
        },
        {
          name: 'Resursi',
          href: '/category/besplatni-resursi',
          icon: FiBookOpen,
          description: 'Besplatni kursevi i materijali'
        }
      ]
    },
    {
      name: 'Informacije',
      href: '/news',
      icon: FiRss,
      hasDropdown: true,
      submenu: [
        {
          name: 'Vijesti',
          href: '/news',
          icon: FiRss,
          description: 'Najnovije vijesti iz Njemačke'
        },
        {
          name: 'FAQ',
          href: '/faq',
          icon: FiHelpCircle,
          description: 'Često postavljena pitanja'
        },
        {
          name: 'O nama',
          href: '/about',
          icon: FiUser,
          description: 'Upoznajte naš tim'
        },
        {
          name: 'Kontakt',
          href: '/contact',
          icon: FiMail,
          description: 'Stupite u kontakt sa nama'
        },
        {
          name: 'Pomoć',
          href: '/help',
          icon: FiLifeBuoy,
          description: 'Pomoć i podrška'
        }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-6 bg-gradient-to-r from-german-black via-german-red to-german-gold rounded"></div>
            <span className="text-2xl font-bold text-gray-900">Njemačka</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationMenu.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <SafeIcon
                      icon={FiChevronDown}
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <SafeIcon icon={subitem.icon} className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {subitem.name}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {subitem.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 max-h-96 overflow-y-auto">
              {navigationMenu.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <SafeIcon icon={item.icon} className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>

                  {/* Mobile Submenu */}
                  {item.hasDropdown && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <SafeIcon icon={subitem.icon} className="w-4 h-4" />
                          <span>{subitem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;