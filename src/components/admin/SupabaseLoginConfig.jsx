import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import supabase from '../../lib/supabase';

const { FiUser, FiSave, FiRefreshCw, FiCheck, FiX, FiLock } = FiIcons;

const SupabaseLoginConfig = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [config, setConfig] = useState({
    allowEmailSignup: true,
    requireEmailConfirmation: false,
    allowPasswordReset: true,
    minPasswordLength: 8,
    allowAnonymousAccess: false,
    jwtExpiry: '3600', // 1 hour in seconds
    securityPolicies: {
      enforceStrongPasswords: true,
      preventPasswordReuse: true,
      maxLoginAttempts: 5
    }
  });

  // Load existing settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('auth_settings')
        .select('settings')
        .limit(1)
        .single();

      if (data && data.settings) {
        setConfig(data.settings);
      }
    } catch (error) {
      console.log('No existing settings found, using defaults');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field) => {
    setConfig(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePolicyToggle = (policy) => {
    setConfig(prev => ({
      ...prev,
      securityPolicies: {
        ...prev.securityPolicies,
        [policy]: !prev.securityPolicies[policy]
      }
    }));
  };

  const handleNumberChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: parseInt(value) || ''
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);

    try {
      // First, ensure the table exists
      const { error: createError } = await supabase.rpc('create_auth_settings_table', {});
      
      // If RPC doesn't exist, try direct table creation (this might fail due to permissions)
      if (createError) {
        console.log('RPC not available, trying direct insert');
      }

      // Try to insert/update the settings
      const { error } = await supabase
        .from('auth_settings')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001', // Fixed UUID for singleton
          settings: config,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      setStatus({
        type: 'success',
        message: 'Authentication settings saved successfully!'
      });
    } catch (error) {
      console.error('Error saving auth settings:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Error saving authentication settings'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center">
          <SafeIcon icon={FiRefreshCw} className="w-6 h-6 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Authentication Settings</h3>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Allow Email Signup</span>
              <button
                onClick={() => handleToggle('allowEmailSignup')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.allowEmailSignup ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.allowEmailSignup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700">Require Email Confirmation</span>
              <button
                onClick={() => handleToggle('requireEmailConfirmation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.requireEmailConfirmation ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.requireEmailConfirmation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700">Allow Password Reset</span>
              <button
                onClick={() => handleToggle('allowPasswordReset')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.allowPasswordReset ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.allowPasswordReset ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {/* Password Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Password Security</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Minimum Password Length
              </label>
              <input
                type="number"
                min="6"
                max="32"
                value={config.minPasswordLength}
                onChange={(e) => handleNumberChange('minPasswordLength', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <label className="flex items-center justify-between">
              <span className="text-gray-700">Enforce Strong Passwords</span>
              <button
                onClick={() => handlePolicyToggle('enforceStrongPasswords')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.securityPolicies.enforceStrongPasswords ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.securityPolicies.enforceStrongPasswords ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700">Prevent Password Reuse</span>
              <button
                onClick={() => handlePolicyToggle('preventPasswordReuse')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.securityPolicies.preventPasswordReuse ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.securityPolicies.preventPasswordReuse ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Security</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Max Login Attempts
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.securityPolicies.maxLoginAttempts}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  securityPolicies: {
                    ...prev.securityPolicies,
                    maxLoginAttempts: parseInt(e.target.value) || 5
                  }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                JWT Expiry (seconds)
              </label>
              <input
                type="number"
                min="300"
                max="86400"
                value={config.jwtExpiry}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  jwtExpiry: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`p-4 rounded-lg ${
            status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center space-x-2">
              <SafeIcon 
                icon={status.type === 'success' ? FiCheck : FiX} 
                className="w-5 h-5" 
              />
              <span>{status.message}</span>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSave} className="w-5 h-5" />
              <span>Save Settings</span>
            </>
          )}
        </button>

        {/* Security Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiLock} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Security Note</h4>
              <p className="text-sm text-blue-700 mt-1">
                These settings affect how users can sign up and authenticate with your application. 
                Make sure to choose secure options that match your security requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseLoginConfig;