import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ReactECharts from 'echarts-for-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const {
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiGlobe,
  FiClock,
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiMap
} = FiIcons;

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Mock data generation
  const generateMockData = (days) => {
    const dates = eachDayOfInterval({
      start: subDays(new Date(), days - 1),
      end: new Date()
    });

    return dates.map(date => ({
      date: format(date, 'yyyy-MM-dd'),
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageviews: Math.floor(Math.random() * 2000) + 1000,
      bounceRate: Math.floor(Math.random() * 30) + 40,
      avgTime: Math.floor(Math.random() * 180) + 120
    }));
  };

  const mockData = generateMockData(dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90);

  // Chart options
  const visitorChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.map(d => format(new Date(d.date), 'dd MMM')),
      axisLabel: { interval: 'auto', rotate: 30 }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Posjetioci',
        type: 'line',
        smooth: true,
        data: mockData.map(d => d.visitors),
        itemStyle: { color: '#4F46E5' }
      },
      {
        name: 'Pregledi stranica',
        type: 'line',
        smooth: true,
        data: mockData.map(d => d.pageviews),
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  const bounceRateChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.map(d => format(new Date(d.date), 'dd MMM')),
      axisLabel: { interval: 'auto', rotate: 30 }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Bounce Rate',
        type: 'line',
        smooth: true,
        data: mockData.map(d => d.bounceRate),
        itemStyle: { color: '#F59E0B' }
      }
    ]
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="7d">Zadnjih 7 dana</option>
              <option value="30d">Zadnjih 30 dana</option>
              <option value="90d">Zadnjih 90 dana</option>
            </select>
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <SafeIcon
                icon={FiRefreshCw}
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
              <span>Osvježi</span>
            </button>
            <button className="flex items-center space-x-2 bg-primary-600 text-white rounded-lg px-4 py-2 hover:bg-primary-700">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Izvezi</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ukupno posjetilaca</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockData.reduce((sum, d) => sum + d.visitors, 0).toLocaleString()}
                </h3>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-2">vs prošli period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pregledi stranica</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockData.reduce((sum, d) => sum + d.pageviews, 0).toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <SafeIcon icon={FiEye} className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-gray-500 ml-2">vs prošli period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Prosječno vrijeme</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {Math.floor(mockData.reduce((sum, d) => sum + d.avgTime, 0) / mockData.length)}s
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+15.3%</span>
              <span className="text-gray-500 ml-2">vs prošli period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Bounce Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {Math.floor(mockData.reduce((sum, d) => sum + d.bounceRate, 0) / mockData.length)}%
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <SafeIcon icon={FiBarChart2} className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-red-500 mr-1" transform="rotate(180)" />
              <span className="text-red-500 font-medium">-2.4%</span>
              <span className="text-gray-500 ml-2">vs prošli period</span>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Posjetioci i pregledi stranica</h3>
            <ReactECharts option={visitorChartOption} style={{ height: '400px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Bounce Rate</h3>
            <ReactECharts option={bounceRateChartOption} style={{ height: '400px' }} />
          </motion.div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Najpopularnije stranice</h3>
            <div className="space-y-4">
              {[
                { path: '/', views: 12453, change: '+5.2%' },
                { path: '/blog', views: 8234, change: '+3.1%' },
                { path: '/services', views: 6123, change: '+7.4%' },
                { path: '/about', views: 4532, change: '-1.2%' },
                { path: '/contact', views: 3211, change: '+2.5%' }
              ].map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{page.path}</p>
                    <p className="text-sm text-gray-500">{page.views.toLocaleString()} pregleda</p>
                  </div>
                  <span className={`text-sm font-medium ${page.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {page.change}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Izvori saobraćaja</h3>
            <div className="space-y-4">
              {[
                { source: 'Google', percentage: 45, visits: 15234 },
                { source: 'Direct', percentage: 25, visits: 8543 },
                { source: 'Facebook', percentage: 15, visits: 5123 },
                { source: 'Twitter', percentage: 10, visits: 3412 },
                { source: 'Others', percentage: 5, visits: 1705 }
              ].map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                    <span className="text-sm text-gray-500">{source.visits.toLocaleString()} visits</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visitor Demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demografija posjetilaca</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Top lokacije</h4>
                <div className="space-y-2">
                  {[
                    { country: 'Njemačka', visitors: 45234 },
                    { country: 'Bosna i Hercegovina', visitors: 32123 },
                    { country: 'Hrvatska', visitors: 24532 },
                    { country: 'Srbija', visitors: 18234 },
                    { country: 'Austrija', visitors: 12453 }
                  ].map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{location.country}</span>
                      <span className="text-sm text-gray-500">{location.visitors.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Uređaji</h4>
                <div className="space-y-2">
                  {[
                    { device: 'Mobile', percentage: 65 },
                    { device: 'Desktop', percentage: 30 },
                    { device: 'Tablet', percentage: 5 }
                  ].map((device, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{device.device}</span>
                        <span className="text-sm text-gray-500">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;