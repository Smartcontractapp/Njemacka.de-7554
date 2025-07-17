import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const { FiStar, FiFilter, FiPlus } = FiIcons;

const ReviewsSection = ({ reviews = [], onSubmitReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviews
    .filter(review => 
      selectedRating === 'all' ? true : review.rating === parseInt(selectedRating)
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'highest') {
        return b.rating - a.rating;
      } else if (sortBy === 'lowest') {
        return a.rating - b.rating;
      }
      return 0;
    });

  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const handleSubmitReview = (reviewData) => {
    onSubmitReview({
      ...reviewData,
      date: new Date().toLocaleDateString(),
      helpful: 0,
      notHelpful: 0,
      verified: true,
    });
    setShowForm(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Recenzije korisnika
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, idx) => (
                  <SafeIcon
                    key={idx}
                    icon={FiStar}
                    className={`w-6 h-6 ${
                      idx < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {averageRating}
              </span>
              <span className="text-gray-500">
                ({reviews.length} recenzija)
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Napišite recenziju</span>
          </button>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating] || 0;
                const percentage = reviews.length
                  ? ((count / reviews.length) * 100).toFixed(0)
                  : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-20">
                      <span className="text-sm font-medium">{rating}</span>
                      <SafeIcon
                        icon={FiStar}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Šta kažu naši korisnici?
              </h3>
              <p className="text-gray-600">
                Pogledajte iskustva drugih korisnika i podijelite svoje. Vaše mišljenje nam je važno!
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filtriraj po:</span>
            </div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Sve ocjene</option>
              <option value="5">5 zvjezdica</option>
              <option value="4">4 zvjezdice</option>
              <option value="3">3 zvjezdice</option>
              <option value="2">2 zvjezdice</option>
              <option value="1">1 zvjezdica</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Najnovije prvo</option>
              <option value="oldest">Najstarije prvo</option>
              <option value="highest">Najviša ocjena</option>
              <option value="lowest">Najniža ocjena</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review, index) => (
              <ReviewCard
                key={review.id || index}
                review={review}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon
              icon={FiStar}
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Još nema recenzija
            </h3>
            <p className="text-gray-600">
              Budite prvi koji će podijeliti svoje iskustvo!
            </p>
          </div>
        )}
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ReviewForm
            onSubmit={handleSubmitReview}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;