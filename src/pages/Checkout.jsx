import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

const { FiArrowLeft, FiShoppingBag, FiLock } = FiIcons;

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Example order data
  const [orderData] = useState({
    items: [
      {
        id: 1,
        name: "Deutsche Bahn karta",
        quantity: 1,
        price: 49.99,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300"
      },
      {
        id: 2,
        name: "Oktoberfest ulaznica",
        quantity: 2,
        price: 29.99,
        image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=300"
      }
    ],
    subtotal: 109.97,
    shipping: 4.99,
    discount: 10
  });

  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page
      navigate('/checkout/success');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <Link 
            to="/cart" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Nazad na korpu</span>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SafeIcon icon={FiShoppingBag} className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>
            <p className="text-gray-600">
              Završite vašu kupovinu sigurno i jednostavno
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
            <SafeIcon icon={FiLock} className="w-5 h-5" />
            <span className="text-sm font-medium">Sigurno plaćanje sa SSL enkripcijom</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CheckoutForm 
                total={orderData.subtotal + orderData.shipping - orderData.discount}
                onSubmit={handleSubmit}
                isProcessing={isProcessing}
              />
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <OrderSummary
                items={orderData.items}
                subtotal={orderData.subtotal}
                shipping={orderData.shipping}
                discount={orderData.discount}
                isProcessing={isProcessing}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;