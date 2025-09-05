'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LuPackage, LuTruck, LuCheck, LuClock, LuX, LuEye, LuDownload, LuRefreshCw, LuStar, LuMessageCircle, LuArrowLeft } from 'react-icons/lu';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
}

const OrdersPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      date: '2025-01-15',
      status: 'delivered',
      total: 89.90,
      items: [
        {
          id: '1',
          name: 'Epic Squishmallow Fun',
          price: 39.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop'
        },
        {
          id: '2',
          name: 'Science Explorer Kit',
          price: 49.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street',
        city: 'Auckland',
        state: 'AKL',
        zip: '1010'
      },
      trackingNumber: 'TRK123456789',
      deliveredDate: '2025-01-18'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      date: '2025-01-20',
      status: 'shipped',
      total: 69.95,
      items: [
        {
          id: '3',
          name: 'Art Supplies Creative Box',
          price: 29.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop'
        },
        {
          id: '4',
          name: 'Building Blocks Adventure',
          price: 39.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: {
        name: 'Sarah Johnson',
        street: '456 Oak Avenue',
        city: 'Wellington',
        state: 'WLG',
        zip: '6011'
      },
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2025-01-23'
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-003',
      date: '2025-01-22',
      status: 'processing',
      total: 119.85,
      items: [
        {
          id: '5',
          name: 'Princess Dreams Collection',
          price: 59.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
        },
        {
          id: '6',
          name: 'Dinosaur Discovery Box',
          price: 59.90,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: {
        name: 'Mike Davis',
        street: '789 Pine Road',
        city: 'Christchurch',
        state: 'CHC',
        zip: '8011'
      },
      estimatedDelivery: '2025-01-26'
    },
    {
      id: '4',
      orderNumber: 'ORD-2025-004',
      date: '2025-01-10',
      status: 'cancelled',
      total: 39.95,
      items: [
        {
          id: '7',
          name: 'Music Maker Kit',
          price: 39.95,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: {
        name: 'Emma Wilson',
        street: '321 Elm Street',
        city: 'Hamilton',
        state: 'HAM',
        zip: '3204'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <LuClock className="w-4 h-4" />;
      case 'processing': return <LuRefreshCw className="w-4 h-4" />;
      case 'shipped': return <LuTruck className="w-4 h-4" />;
      case 'delivered': return <LuCheck className="w-4 h-4" />;
      case 'cancelled': return <LuX className="w-4 h-4" />;
      default: return <LuPackage className="w-4 h-4" />;
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = selectedFilter === 'all'
    ? orders
    : orders.filter(order => order.status === selectedFilter);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
            <LuPackage className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link
              href="/kids-gift-boxes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage your gift box orders
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedFilter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order {order.orderNumber}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Order Date:</span> {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Items:</span> {order.items.length}
                      </div>
                    </div>

                    {order.trackingNumber && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-700">Tracking:</span>{' '}
                        <span className="text-blue-600 font-mono">{order.trackingNumber}</span>
                      </div>
                    )}

                    {order.estimatedDelivery && (
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </div>
                    )}

                    {order.deliveredDate && (
                      <div className="mt-1 text-sm text-green-600">
                        <span className="font-medium">Delivered:</span> {new Date(order.deliveredDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2">
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <LuEye className="w-4 h-4" />
                      <span className="hidden sm:inline">{expandedOrder === order.id ? 'Hide Details' : 'View Details'}</span>
                    </button>

                    {order.status === 'delivered' && (
                      <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <LuDownload className="w-4 h-4" />
                        <span className="hidden sm:inline">Invoice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="p-4 sm:p-6 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-gray-900 text-sm truncate">{item.name}</h5>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                      <div className="p-3 bg-white rounded-lg text-sm">
                        <div className="font-medium text-gray-900">{order.shippingAddress.name}</div>
                        <div className="text-gray-600 mt-1">
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                        </div>
                      </div>

                      {order.status === 'delivered' && (
                        <div className="mt-4 space-y-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 w-full justify-center">
                            <LuStar className="w-4 h-4" />
                            Leave a Review
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 w-full justify-center">
                            <LuRefreshCw className="w-4 h-4" />
                            Reorder Items
                          </button>
                        </div>
                      )}

                      {order.status === 'shipped' && (
                        <div className="mt-4">
                          <Link
                            href={`/track/${order.trackingNumber}`}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 w-full justify-center"
                          >
                            <LuTruck className="w-4 h-4" />
                            Track Package
                          </Link>
                        </div>
                      )}

                      {(order.status === 'pending' || order.status === 'processing') && (
                        <div className="mt-4">
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 w-full justify-center">
                            <LuX className="w-4 h-4" />
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
            <LuPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">No orders match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;