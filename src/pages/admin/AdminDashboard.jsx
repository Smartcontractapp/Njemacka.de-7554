import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import SupabasePanel from '../../components/admin/SupabasePanel';
import SupabaseLoginConfig from '../../components/admin/SupabaseLoginConfig';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SupabasePanel />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Login Configuration */}
              <SupabaseLoginConfig />

              {/* Other dashboard content */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
                <p className="text-gray-600">
                  Configure your Supabase authentication settings above to manage how users can sign up and login to your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;