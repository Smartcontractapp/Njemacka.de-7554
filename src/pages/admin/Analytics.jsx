import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ReactECharts from 'echarts-for-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const {
  FiUsers, FiEye, FiTrendingUp, FiBarChart2, FiActivity,
  FiGlobe, FiClock, FiCalendar, FiRefreshCw, FiDownload,
  FiFilter, FiMap, FiLayers, FiPieChart, FiHeart, FiMonitor
} = FiIcons;

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('visitors');
  const [selectedView, setSelectedView] = useState('overview');

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
      avgTime: Math.floor(Math.random() * 180) + 120,
      conversions: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 1000) + 200,
      newUsers: Math.floor(Math.random() * 300) + 100,
      sessions: Math.floor(Math.random() * 1500) + 700
    }));
  };

  const mockData = generateMockData(dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90);

  // Visitor Acquisition Chart
  const acquisitionData = {
    organic: 45,
    direct: 25,
    social: 15,
    referral: 10,
    email: 5
  };

  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      data: Object.entries(acquisitionData).map(([name, value]) => ({
        name,
        value
      }))
    }]
  };

  // User Behavior Chart
  const behaviorChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Pageviews', 'Avg. Time (sec)']
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
      axisLabel: {
        interval: 'auto',
        rotate: 30
      }
    },
    yAxis: [{
      type: 'value',
      name: 'Pageviews'
    }, {
      type: 'value',
      name: 'Time (sec)',
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: 'Pageviews',
      type: 'bar',
      data: mockData.map(d => d.pageviews)
    }, {
      name: 'Avg. Time (sec)',
      type: 'line',
      yAxisIndex: 1,
      data: mockData.map(d => d.avgTime)
    }]
  };

  // Conversion Funnel Chart
  const funnelData = [
    { value: 5000, name: 'Visits' },
    { value: 3500, name: 'Product Views' },
    { value: 2200, name: 'Add to Cart' },
    { value: 1100, name: 'Checkout' },
    { value: 800, name: 'Purchase' }
  ];

  const funnelChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    series: [{
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 5000,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: funnelData
    }]
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
                <p className="text-sm text-gray-500 mb-1">Konverzije</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockData.reduce((sum, d) => sum + d.conversions, 0).toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <SafeIcon icon={FiActivity} className="w-6 h-6 text-green-600" />
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
                <p className="text-sm text-gray-500 mb-1">Prihod</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}€
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <SafeIcon icon={FiBarChart2} className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-500 mb-1">Novi korisnici</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockData.reduce((sum, d) => sum + d.newUsers, 0).toLocaleString()}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <SafeIcon icon={FiHeart} className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+10.1%</span>
              <span className="text-gray-500 ml-2">vs prošli period</span>
            </div>
          </motion.div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Posjetioci i konverzije</h3>
            <ReactECharts option={behaviorChartOption} style={{ height: '400px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Izvori saobraćaja</h3>
            <ReactECharts option={pieChartOption} style={{ height: '400px' }} />
          </motion.div>
        </div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Konverzijski lijevak</h3>
          <ReactECharts option={funnelChartOption} style={{ height: '400px' }} />
        </motion.div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uređaji</h3>
            <div className="space-y-4">
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
          </motion.div>

          {/* Browser Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pretraživači</h3>
            <div className="space-y-4">
              {[
                { name: 'Chrome', users: 15234 },
                { name: 'Safari', users: 8543 },
                { name: 'Firefox', users: 5123 },
                { name: 'Edge', users: 3412 },
                { name: 'Others', users: 1705 }
              ].map((browser, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMonitor} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{browser.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {browser.users.toLocaleString()} korisnika
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;