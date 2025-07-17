import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShoppingBag, FiTag, FiTruck, FiInfo } = FiIcons;

const OrderSummary = ({ items, subtotal, shipping = 0, discount = 0 }) => {
  const total = subtotal + shipping - discount;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiShoppingBag} className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Pregled narudžbe</h2>
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">Količina: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.price.toFixed(2)}€
            </span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 py-6 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Međuzbir</span>
          <span className="text-gray-900 font-medium">{subtotal.toFixed(2)}€</span>
        </div>
        
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Dostava</span>
              <SafeIcon icon={FiTruck} className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-gray-900 font-medium">{shipping.toFixed(2)}€</span>
          </div>
        )}
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-green-600">Popust</span>
              <SafeIcon icon={FiTag} className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-green-600 font-medium">-{discount.toFixed(2)}€</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Ukupno</span>
          <span className="text-xl font-bold text-primary-600">{total.toFixed(2)}€</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Sigurna kupovina</h4>
            <p className="text-sm text-blue-700 mt-1">
              Vaši podaci su zaštićeni 256-bitnom SSL enkripcijom. Sva plaćanja su sigurna i šifrirana.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;