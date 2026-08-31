import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackVisit } from './lib/api';
import AnnouncementBar from './components/AnnouncementBar';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import Favoris from './pages/Favoris';
import Compte from './pages/Compte';
import ProductDetail from './pages/ProductDetail';

const VisitTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackVisit(location.pathname);
  }, [location.pathname]);
  return null;
};

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen">
        <VisitTracker />
        <ScrollToTop />
        <div className="sticky top-0 z-50">
          <AnnouncementBar />
          <Navigation />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/boutique/:section" element={<Boutique />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/produit/:slug" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
