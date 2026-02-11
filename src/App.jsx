import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Promotions from './components/Promotions';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Promotions banner - shows on all pages */}
        <Promotions />
        
        {/* Navbar - shows on all pages */}
        <Navbar />
        
        {/* Main content area - changes based on route */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
        
        {/* Footer - shows on all pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
