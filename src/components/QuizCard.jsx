import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiHelpCircle, FiAward, FiRotateCw } = FiIcons;

const QuizCard = ({ question, options, correctAnswer, explanation, delay = 0 }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const isCorrect = selectedOption === correctAnswer;
  const hasAnswered = selectedOption !== null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {question}
        </h3>
        
        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${
                hasAnswered 
                  ? option === correctAnswer
                    ? 'bg-green-50 border-green-300'
                    : selectedOption === option
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800">{option}</span>
                {hasAnswered && (
                  option === correctAnswer ? (
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
                  ) : selectedOption === option ? (
                    <SafeIcon icon={FiX} className="w-5 h-5 text-red-600" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>
        
        {hasAnswered && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center space-x-2 font-medium">
                <SafeIcon icon={isCorrect ? FiCheck : FiX} className="w-5 h-5" />
                <span>{isCorrect ? 'Tačan odgovor!' : 'Netačan odgovor!'}</span>
              </div>
              
              <div className="mt-2 text-sm">
                <p><strong>Tačan odgovor:</strong> {correctAnswer}</p>
              </div>
              
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="mt-2 text-sm flex items-center space-x-1 font-medium"
              >
                <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                <span>{showExplanation ? 'Sakrij objašnjenje' : 'Pogledaj objašnjenje'}</span>
              </button>
              
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm"
                >
                  {explanation}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizCard;