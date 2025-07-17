import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full">
      </div>
    </div>
  );
};

export default LoadingSpinner;