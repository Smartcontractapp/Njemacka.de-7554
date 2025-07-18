import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import SupabasePanel from '../../components/admin/SupabasePanel';
import SupabaseLoginConfig from '../../components/admin/SupabaseLoginConfig';
import {adminState} from '../../data/admin';

const {FiPlus,FiEdit,FiUsers,FiBarChart3,FiSettings,FiFileText,FiMessageSquare,FiTrendingUp,FiCalendar,FiDatabase,FiShield,FiGlobe,FiHeart,FiTag,FiHelpCircle,FiRss,FiMapPin,FiBriefcase,FiCheckSquare,FiStar,FiEye,FiClock,FiActivity,FiAlertTriangle} = FiIcons;

const AdminDashboard=()=> {
  const [stats,setStats]=useState({
    totalPosts: 42,
    totalUsers: 1250,
    totalViews: 15420,
    totalComments: 386,
    pendingReviews: 12,
    activeServices: 87,
    pendingAds: 5,
    monthlyGrowth: 12.5
  });

  const [recentActivity,setRecentActivity]=useState([
    {
      id: 1,
      type: 'post',
      action: 'Novi blog post objavljen',
      title: 'Otkrivanje čarolije Bavarske',
      time: '2 sata',
      status: 'published'
    },
    {
      id: 2,
      type: 'user',
      action: 'Novi korisnik registrovan',
      title: 'marko.petrovic@email.com',
      time: '4 sata',
      status: 'active'
    },
    {
      id: 3,
      type: 'review',
      action: 'Nova recenzija',
      title: 'Dr. Ana Marić - Zubarska ordinacija',
      time: '6 sati',
      status: 'pending'
    },
    {
      id: 4,
      type: 'ad',
      action: 'Novi oglas poslan',
      title: 'Iznajmljujem stan u centru Berlina',
      time: '8 sati',
      status: 'pending'
    },
    {
      id: 5,
      type: 'service',
      action: 'Nova usluga dodana',
      title: 'Restoran Sarajevo - Hamburg',
      time: '1 dan',
      status: 'verified'
    }
  ]);

  const [quickStats,setQuickStats]=useState([
    {
      title: 'Ukupno objava',
      value: '42',
      change: '+8',
      changeType: 'increase',
      icon: FiFileText,
      color: 'blue'
    },
    {
      title: 'Aktivni korisnici',
      value: '1,250',
      change: '+156',
      changeType: 'increase',
      icon: FiUsers,
      color: 'green'
    },
    {
      title: 'Mjesečni pregledi',
      value: '15.4K',
      change: '+12.5%',
      changeType: 'increase',
      icon: FiEye,
      color: 'purple'
    },
    {
      title: 'Pending oglasi',
      value: '5',
      change: '+3',
      changeType: 'increase',
      icon: FiAlertTriangle,
      color: 'orange'
    }
  ]);

  const currentUser = adminState.currentUser;

  const getActivityIcon = (type) => {
    switch(type) {
      case 'post': return FiFileText;
      case 'user': return FiUsers;
      case 'review': return FiStar;
      case 'ad': return FiMessageSquare;
      case 'service': return FiBriefcase;
      default: return FiActivity;
    }
  };

  const getActivityColor = (status) => {
    switch(status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'verified': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dobrodošli, {currentUser?.name || 'Admin'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Evo pregleda vaše platforme za danas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Posljednja aktivnost: {new Date().toLocaleTimeString('sr-RS')}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <SafeIcon 
                    icon={stat.icon} 
                    className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} 
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs prošli mjesec</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Brze akcije</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/admin/editor?type=blog"
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Novi blog post</span>
                </Link>
                
                <Link
                  to="/admin/editor?type=news"
                  className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <SafeIcon icon={FiRss} className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Nova vijest</span>
                </Link>

                <Link
                  to="/admin/editor?type=coupon"
                  className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <SafeIcon icon={FiTag} className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-900">Novi kupon</span>
                </Link>

                <Link
                  to="/admin/editor?type=faq"
                  className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <SafeIcon icon={FiHelpCircle} className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Novo FAQ</span>
                </Link>

                <Link
                  to="/admin/classifieds"
                  className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Upravljaj oglasima</span>
                </Link>

                <Link
                  to="/admin/analytics"
                  className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-indigo-900">Analytics</span>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Nedavna aktivnost</h2>
                <Link 
                  to="/admin/analytics" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Pogledaj sve
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                        <SafeIcon icon={ActivityIcon} className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Prije {activity.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upravljanje sadržajem</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiFileText} className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Blog postovi</p>
                        <p className="text-sm text-blue-700">42 objavljenih</p>
                      </div>
                    </div>
                    <Link
                      to="/admin/editor?type=blog"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiRss} className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Vijesti</p>
                        <p className="text-sm text-green-700">18 objavljenih</p>
                      </div>
                    </div>
                    <Link
                      to="/admin/editor?type=news"
                      className="text-green-600 hover:text-green-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiTag} className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">Kuponi</p>
                        <p className="text-sm text-red-700">12 aktivnih</p>
                      </div>
                    </div>
                    <Link
                      to="/admin/editor?type=coupon"
                      className="text-red-600 hover:text-red-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiHelpCircle} className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">FAQ</p>
                        <p className="text-sm text-yellow-700">24 pitanja</p>
                      </div>
                    </div>
                    <Link
                      to="/admin/editor?type=faq"
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Oglasi</p>
                        <p className="text-sm text-purple-700">5 na čekanju</p>
                      </div>
                    </div>
                    <Link
                      to="/admin/classifieds"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiBriefcase} className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-indigo-900">Usluge</p>
                        <p className="text-sm text-indigo-700">87 aktivnih</p>
                      </div>
                    </div>
                    <Link
                      to="/services"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      <SafeIcon icon={FiEdit} className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supabase Panel */}
            <SupabasePanel />

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status sistema</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Supabase veza</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Aktivna</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">U tijeku</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Brzi linkovi</h3>
              <div className="space-y-2">
                <Link
                  to="/admin/analytics"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Analytics</span>
                </Link>
                <Link
                  to="/admin/editor"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiEdit} className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Editor</span>
                </Link>
                <Link
                  to="/admin/classifieds"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Oglasi</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-500" />
                  <span className="text-sm">Pogledaj sajt</span>
                </Link>
              </div>
            </div>

            {/* Supabase Login Configuration */}
            <SupabaseLoginConfig />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;