import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import supabase from '../../lib/supabase';

const { FiDatabase, FiCheck, FiX, FiRefreshCw, FiInfo } = FiIcons;

const SupabasePanel = () => {
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const testConnection = async () => {
    setTesting(true);
    setConnectionStatus(null);

    try {
      // Test the Supabase connection with a simple query
      const { data, error } = await supabase
        .from('auth_settings')
        .select('count', { count: 'exact', head: true });

      if (error && error.code !== 'PGRST116') { // PGRST116 is "table not found" which is OK
        throw error;
      }

      setConnectionStatus({
        type: 'success',
        message: 'Successfully connected to Supabase!'
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus({
        type: 'error',
        message: error.message || 'Failed to connect to Supabase'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiDatabase} className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Supabase Connection</h3>
      </div>

      <div className="space-y-4">
        {/* Connection Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Configuration</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>URL: {supabase.supabaseUrl}</div>
            <div>Key: {supabase.supabaseKey?.substring(0, 20)}...</div>
          </div>
        </div>

        {/* Test Connection Button */}
        <button
          onClick={testConnection}
          disabled={testing}
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
        >
          {testing ? (
            <>
              <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin" />
              <span>Testing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiDatabase} className="w-5 h-5" />
              <span>Test Connection</span>
            </>
          )}
        </button>

        {/* Connection Status */}
        {connectionStatus && (
          <div className={`p-4 rounded-lg ${
            connectionStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center space-x-2">
              <SafeIcon 
                icon={connectionStatus.type === 'success' ? FiCheck : FiX} 
                className="w-5 h-5" 
              />
              <span>{connectionStatus.message}</span>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Connection Info</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your Supabase connection is configured in the environment. 
                Use the test button to verify connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabasePanel;