import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReviewsSection from '../components/ReviewsSection';
import { getReviewsByProduct, addReview } from '../data/reviews';

const { FiArrowLeft, FiShoppingBag } = FiIcons;

const ProductReviews = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product data
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get reviews
        const productReviews = getReviewsByProduct(productId);
        
        // Mock product data
        const mockProduct = {
          id: productId,
          name: "Njemački paket za početnike",
          image: "https://images.unsplash.com/photo-1581357825340-32259110788a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: 49.99,
          description: "Kompletan paket za učenje njemačkog jezika za početnike. Uključuje knjige, audio materijale i pristup online platformi.",
          category: "Obrazovanje"
        };
        
        setProduct(mockProduct);
        setReviews(productReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [productId]);

  const handleSubmitReview = (reviewData) => {
    // In a real app, this would send the review to an API
    const newReview = addReview('product', productId, reviewData);
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proizvod nije pronađen</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Vrati se na početnu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Nazad na proizvode</span>
          </Link>
        </div>

        {/* Product Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="mb-4">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                {product.description}
              </p>
              <div className="text-2xl font-bold text-primary-600 mb-6">
                {product.price.toFixed(2)}€
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                <SafeIcon icon={FiShoppingBag} className="w-5 h-5" />
                <span>Dodaj u korpu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection 
          reviews={reviews} 
          onSubmitReview={handleSubmitReview} 
        />
      </div>
    </div>
  );
};

export default ProductReviews;