'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LuSettings, LuMonitor, LuMoon, LuSun, LuGlobe, LuBell, LuShield, LuKey, LuCreditCard, LuMail, LuPhone, LuEye, LuEyeOff, LuDownload, LuTrash2, LuRefreshCw, LuArrowLeft, LuCheck, LuX, } from 'react-icons/lu';
import { FiAlertTriangle } from 'react-icons/fi';

interface SecurityLog {
  id: string;
  action: string;
  location: string;
  device: string;
  timestamp: string;
  status: 'success' | 'failed' | 'suspicious';
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'Pacific/Auckland',
    currency: 'NZD',
    dateFormat: 'dd/mm/yyyy',
    autoSave: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      securityAlerts: true,
      priceDrops: true
    },
    push: {
      orderUpdates: true,
      promotions: false,
      newProducts: false,
      securityAlerts: true
    },
    sms: {
      orderUpdates: false,
      securityAlerts: true,
      deliveryUpdates: true
    }
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    showOnlineStatus: false,
    allowDataCollection: true,
    personalizedAds: false,
    shareWithPartners: false,
    locationTracking: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '30',
    allowMultipleSessions: true,
    passwordExpiry: '90'
  });

  const securityLogs: SecurityLog[] = [
    {
      id: '1',
      action: 'Login',
      location: 'Auckland, New Zealand',
      device: 'Chrome on MacOS',
      timestamp: '2025-01-22 14:30:15',
      status: 'success'
    },
    {
      id: '2',
      action: 'Password Changed',
      location: 'Auckland, New Zealand',
      device: 'Chrome on MacOS',
      timestamp: '2025-01-20 09:15:42',
      status: 'success'
    },
    {
      id: '3',
      action: 'Failed Login Attempt',
      location: 'Unknown Location',
      device: 'Chrome on Windows',
      timestamp: '2025-01-18 22:45:33',
      status: 'failed'
    },
    {
      id: '4',
      action: 'Login',
      location: 'Wellington, New Zealand',
      device: 'Safari on iPhone',
      timestamp: '2025-01-15 16:20:10',
      status: 'success'
    }
  ];

  const handleGeneralSettingChange = (setting: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleNotificationChange = (category: string, setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSecurityChange = (setting: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'suspicious': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <LuCheck className="w-4 h-4" />;
      case 'failed': return <LuX className="w-4 h-4" />;
      case 'suspicious': return <FiAlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <LuSettings className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <LuBell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <LuShield className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <LuKey className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6 sm:mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors duration-200 mb-4"
          >
            <LuArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your preferences and account settings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="border-b border-gray-200">
            <div className="flex flex-wrap gap-1 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={generalSettings.theme}
                      onChange={(e) => handleGeneralSettingChange('theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      {generalSettings.theme === 'light' && <LuSun className="w-4 h-4" />}
                      {generalSettings.theme === 'dark' && <LuMoon className="w-4 h-4" />}
                      {generalSettings.theme === 'system' && <LuMonitor className="w-4 h-4" />}
                      <span>
                        {generalSettings.theme === 'system'
                          ? 'Follows your system preference'
                          : `${generalSettings.theme.charAt(0).toUpperCase() + generalSettings.theme.slice(1)} theme`
                        }
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => handleGeneralSettingChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <LuGlobe className="w-4 h-4" />
                      <span>Interface language</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => handleGeneralSettingChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Pacific/Auckland">Auckland (NZDT)</option>
                      <option value="Australia/Sydney">Sydney (AEDT)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="America/New_York">New York (EST)</option>
                      <option value="America/Los_Angeles">Los Angeles (PST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => handleGeneralSettingChange('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="NZD">NZD - New Zealand Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) => handleGeneralSettingChange('dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Auto-save preferences</div>
                        <div className="text-sm text-gray-500">Automatically save changes as you make them</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={generalSettings.autoSave}
                          onChange={(e) => handleGeneralSettingChange('autoSave', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>

                <div className="space-y-6">

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <LuMail className="w-4 h-4 text-blue-600" />
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(notificationSettings.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <LuBell className="w-4 h-4 text-green-600" />
                      Push Notifications
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(notificationSettings.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleNotificationChange('push', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <LuPhone className="w-4 h-4 text-purple-600" />
                      SMS Notifications
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(notificationSettings.sms).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleNotificationChange('sms', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Profile Visibility</h4>
                    <p className="text-sm text-gray-500 mb-3">Control who can see your profile information</p>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="private">Private - Only you</option>
                      <option value="friends">Friends only</option>
                      <option value="public">Public - Everyone</option>
                    </select>
                  </div>

                  {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {key === 'showOnlineStatus' && 'Let others see when you\'re online'}
                          {key === 'allowDataCollection' && 'Help improve our services with usage data'}
                          {key === 'personalizedAds' && 'Show ads based on your interests'}
                          {key === 'shareWithPartners' && 'Share anonymized data with trusted partners'}
                          {key === 'locationTracking' && 'Use your location for better recommendations'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                      <LuDownload className="w-4 h-4" />
                      Download My Data
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full px-4 py-3 border border-red-600 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <LuTrash2 className="w-4 h-4" />
                      Delete All Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

                <div className="space-y-6">

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Password & Authentication</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${securitySettings.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={securitySettings.twoFactorEnabled}
                              onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="0">Never</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                      <select
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">6 months</option>
                        <option value="0">Never</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Login Notifications</div>
                        <div className="text-sm text-gray-500">Get notified of new login attempts</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.loginNotifications}
                          onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Allow Multiple Sessions</div>
                        <div className="text-sm text-gray-500">Stay logged in on multiple devices</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.allowMultipleSessions}
                          onChange={(e) => handleSecurityChange('allowMultipleSessions', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Recent Security Activity</h4>
                    <div className="space-y-3">
                      {securityLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                          <div className={`mt-1 ${getStatusColor(log.status)}`}>
                            {getStatusIcon(log.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm font-medium text-gray-900">{log.action}</h5>
                              <span className="text-xs text-gray-500">{log.timestamp}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {log.device} • {log.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                        <LuRefreshCw className="w-4 h-4" />
                        Refresh Activity
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                        <LuX className="w-4 h-4" />
                        Sign Out All Devices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete All Data</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete all your data? This action cannot be undone and will permanently remove all your information, preferences, and history.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                  Delete All Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;