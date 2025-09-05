'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LuUser, LuSettings, LuPackage, LuHeart, LuMapPin, LuCreditCard, LuBell, LuShield, LuCamera } from 'react-icons/lu';
import { CiEdit } from 'react-icons/ci';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  avatar: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  favoriteCategory: string;
}

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+64 21 234 5678',
    dateOfBirth: '1985-06-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop',
    joinedDate: '2023-03-15',
    totalOrders: 12,
    totalSpent: 789.50,
    favoriteCategory: 'Educational Toys'
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'shipping',
      name: 'Sarah Johnson',
      street: '123 Queen Street',
      city: 'Auckland',
      state: 'AKL',
      zip: '1010',
      country: 'New Zealand',
      isDefault: true
    },
    {
      id: '2',
      type: 'billing',
      name: 'Sarah Johnson',
      street: '456 Victoria Street',
      city: 'Wellington',
      state: 'WLG',
      zip: '6011',
      country: 'New Zealand',
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productRecommendations: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true
  });

  const quickActions = [
    { icon: <LuPackage className="w-5 h-5" />, label: 'View Orders', href: '/orders', count: profile.totalOrders },
    { icon: <LuHeart className="w-5 h-5" />, label: 'Wishlist', href: '/wishlist', count: 8 },
    { icon: <LuMapPin className="w-5 h-5" />, label: 'Addresses', href: '#addresses', count: addresses.length },
    { icon: <LuCreditCard className="w-5 h-5" />, label: 'Payment Methods', href: '#payment', count: 2 }
  ];

  const recentActivity = [
    { type: 'order', text: 'Order #ORD-2025-003 was delivered', date: '2 days ago' },
    { type: 'review', text: 'You reviewed Science Explorer Kit', date: '5 days ago' },
    { type: 'wishlist', text: 'Added Art Supplies Box to wishlist', date: '1 week ago' },
    { type: 'order', text: 'Order #ORD-2025-002 was placed', date: '2 weeks ago' }
  ];

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const handlePrivacyChange = (setting: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [setting]: value }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <LuUser className="w-4 h-4" /> },
    { id: 'addresses', label: 'Addresses', icon: <LuMapPin className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <LuCreditCard className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <LuBell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <LuShield className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className="lg:col-span-1 space-y-6">

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                    <LuCamera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <div className="mt-4 text-xs text-gray-500">
                  Member since {new Date(profile.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Account Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="font-semibold text-gray-900">{profile.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="font-semibold text-gray-900">${profile.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Favorite Category</span>
                  <span className="font-semibold text-gray-900 text-xs">{profile.favoriteCategory}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600 group-hover:text-blue-700">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {action.label}
                      </span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {action.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">

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
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <CiEdit className="w-4 h-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{activity.text}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                        <LuMapPin className="w-4 h-4" />
                        Add Address
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mb-2">
                              {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{address.name}</div>
                            <div className="text-gray-600 mt-1">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zip}<br />
                              {address.country}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button className="text-xs text-blue-600 hover:text-blue-700">Edit</button>
                            <button className="text-xs text-red-600 hover:text-red-700">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                        <LuCreditCard className="w-4 h-4" />
                        Add Card
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/27</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Default</span>
                          <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            MC
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">•••• •••• •••• 8888</div>
                            <div className="text-sm text-gray-500">Expires 08/26</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                          <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>

                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {key === 'orderUpdates' && 'Get notified about order status changes'}
                              {key === 'promotions' && 'Receive promotional offers and discounts'}
                              {key === 'newsletter' && 'Monthly newsletter with new products'}
                              {key === 'productRecommendations' && 'Personalized product suggestions'}
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleNotificationChange(key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>

                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Profile Visibility</h4>
                        <p className="text-sm text-gray-500 mb-3">Control who can see your profile information</p>
                        <select
                          value={privacy.profileVisibility}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                          <option value="public">Public</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Data Sharing</div>
                          <div className="text-sm text-gray-500">Share anonymized data for product improvements</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.dataSharing}
                            onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Analytics</div>
                          <div className="text-sm text-gray-500">Help us improve your experience with usage analytics</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.analytics}
                            onChange={(e) => handlePrivacyChange('analytics', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                        <div className="space-y-3">
                          <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                            Download My Data
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors duration-200"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;