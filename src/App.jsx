import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatPopup from './components/ChatPopup';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import BlogPost from './pages/BlogPost';
import Category from './pages/Category';
import CategoryPage from './pages/CategoryPage';
import Coupons from './pages/Coupons';
import GermanQuiz from './pages/GermanQuiz';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ProductReviews from './pages/ProductReviews';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditor from './pages/admin/AdminEditor';
import ClassifiedAdsManager from './pages/admin/ClassifiedAdsManager';
import Analytics from './pages/admin/Analytics';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsPost />} />
              <Route path="/post/:slug" element={<BlogPost />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/quiz" element={<GermanQuiz />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/reviews/:id" element={<ProductReviews />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/editor" element={<AdminRoute><AdminEditor /></AdminRoute>} />
              <Route path="/admin/classifieds" element={<AdminRoute><ClassifiedAdsManager /></AdminRoute>} />
              <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
          <ChatPopup />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;