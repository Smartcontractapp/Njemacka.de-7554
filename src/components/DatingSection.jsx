import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiHeart, FiFilter, FiSearch, FiUser, FiMapPin, FiMail, 
  FiMessageCircle, FiCalendar, FiChevronRight, FiX, 
  FiCheck, FiInfo, FiLock, FiCamera, FiEye, FiEyeOff
} = FiIcons;

const DatingSection = ({ initialProfiles = [] }) => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [filteredProfiles, setFilteredProfiles] = useState(initialProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'male',
    city: '',
    bio: '',
    lookingFor: 'relationship'
  });

  // Cities in Germany
  const cities = [
    'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt',
    'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
    'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg'
  ];

  // Filter profiles based on search and filters
  React.useEffect(() => {
    let result = [...profiles];

    // Apply search term
    if (searchTerm) {
      result = result.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) || 
        profile.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply gender filter
    if (selectedGender !== 'all') {
      result = result.filter(profile => profile.gender === selectedGender);
    }

    // Apply city filter
    if (selectedCity !== 'all') {
      result = result.filter(profile => profile.city === selectedCity);
    }

    // Apply age range
    result = result.filter(profile => 
      profile.age >= ageRange[0] && profile.age <= ageRange[1]
    );

    setFilteredProfiles(result);
  }, [searchTerm, selectedGender, selectedCity, ageRange, profiles]);

  // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle register form input changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would verify credentials with a server
    console.log('Login submitted:', loginData);
    alert('Hvala na prijavi! Ovo je demo verzija, pa nema stvarne prijave.');
    setShowLoginForm(false);
  };

  // Handle register form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send registration data to a server
    console.log('Registration submitted:', registerData);
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Lozinke se ne podudaraju!');
      return;
    }

    alert('Hvala na registraciji! Ovo je demo verzija, pa nema stvarne registracije.');
    setShowRegisterForm(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-pink-100 rounded-full mb-4">
            <SafeIcon icon={FiHeart} className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pronađite posebnu osobu u Njemačkoj
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Povežite se sa ljudima iz naše zajednice koji su također u Njemačkoj. Pronađite prijatelje, partnere ili ljubav.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setShowLoginForm(true);
                setShowRegisterForm(false);
              }}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Prijava
            </button>
            <button
              onClick={() => {
                setShowRegisterForm(true);
                setShowLoginForm(false);
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Registracija
            </button>
          </div>
        </motion.div>

        {/* Login Modal */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Prijava</h3>
                <button
                  onClick={() => setShowLoginForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lozinka
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Zapamti me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                      Zaboravili ste lozinku?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Prijavi se
                </button>

                <div className="text-sm text-center text-gray-500">
                  Nemate račun?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowRegisterForm(true);
                    }}
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Registrirajte se
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegisterForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 my-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Registracija</h3>
                <button
                  onClick={() => setShowRegisterForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-12 h-12 text-gray-400" />
                    <div className="absolute bottom-0 right-0 bg-pink-600 p-1.5 rounded-full">
                      <SafeIcon icon={FiCamera} className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ime *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email adresa *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lozinka *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potvrdite lozinku *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dob *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={registerData.age}
                      onChange={handleRegisterChange}
                      min="18"
                      max="100"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spol *
                    </label>
                    <select
                      name="gender"
                      value={registerData.gender}
                      onChange={handleRegisterChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="male">Muško</option>
                      <option value="female">Žensko</option>
                      <option value="other">Drugo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grad *
                  </label>
                  <select
                    name="city"
                    value={registerData.city}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Odaberite grad</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    O meni
                  </label>
                  <textarea
                    name="bio"
                    value={registerData.bio}
                    onChange={handleRegisterChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Napišite nešto o sebi..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tražim *
                  </label>
                  <select
                    name="lookingFor"
                    value={registerData.lookingFor}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="relationship">Vezu</option>
                    <option value="friendship">Prijateljstvo</option>
                    <option value="casual">Ležernu vezu</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Prihvaćam <a href="#" className="text-pink-600 hover:text-pink-500">uvjete korištenja</a> i <a href="#" className="text-pink-600 hover:text-pink-500">pravila privatnosti</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Registriraj se
                </button>

                <div className="text-sm text-center text-gray-500">
                  Već imate račun?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegisterForm(false);
                      setShowLoginForm(true);
                    }}
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Prijavite se
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pretražite profile..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 hidden sm:inline">Filteri:</span>
              </div>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Svi</option>
                <option value="male">Muško</option>
                <option value="female">Žensko</option>
                <option value="other">Drugo</option>
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">Svi gradovi</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dob: {ageRange[0]} - {ageRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">18</span>
              <input
                type="range"
                min="18"
                max="70"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-500">70</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">18</span>
              <input
                type="range"
                min="18"
                max="70"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-500">70</span>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile.gender === 'female'
                          ? 'bg-pink-100 text-pink-800'
                          : profile.gender === 'male'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {profile.gender === 'female' ? 'Ž' : profile.gender === 'male' ? 'M' : 'O'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {profile.name}, {profile.age}
                        </h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <SafeIcon icon={FiMapPin} className="w-3 h-3 mr-1" />
                          <span>{profile.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-white/80 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{profile.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.interests.slice(0, 3).map((interest, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                    {profile.interests.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        +{profile.interests.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Traži:{' '}
                      {profile.lookingFor === 'relationship'
                        ? 'Vezu'
                        : profile.lookingFor === 'friendship'
                        ? 'Prijateljstvo'
                        : 'Ležernu vezu'}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors">
                        <SafeIcon icon={FiHeart} className="w-5 h-5 text-pink-600" />
                      </button>
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors">
                        <SafeIcon icon={FiMessageCircle} className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <SafeIcon icon={FiInfo} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nema pronađenih profila
              </h3>
              <p className="text-gray-600">Pokušajte promijeniti filtere ili pretragu</p>
            </div>
          )}
        </div>

        {/* Safety Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-100 rounded-full">
                <SafeIcon icon={FiLock} className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Savjeti za sigurno upoznavanje
              </h3>
              <div className="text-blue-700 space-y-2">
                <p>
                  Upoznavanje novih ljudi može biti uzbudljivo, ali uvijek stavljajte svoju sigurnost na prvo mjesto:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Prvi sastanak organizirajte na javnom mjestu</li>
                  <li>Obavijestite prijatelja ili člana obitelji o svojim planovima</li>
                  <li>Nemojte dijeliti osobne podatke poput adrese ili financijskih informacija</li>
                  <li>Vjerujte svom instinktu - ako se ne osjećate ugodno, završite sastanak</li>
                  <li>Prijavite sumnjivo ponašanje našem timu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatingSection;