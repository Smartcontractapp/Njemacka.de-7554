// Update the imports at the top of the file
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiStar, 
  FiCheck, 
  FiInfo,
  FiArrowRight, 
  FiGlobe, 
  FiMessageSquare, 
  FiHeart,
  FiX // Added FiX to the destructured imports
} = FiIcons;

// Rest of the ServicesDirectory component remains the same