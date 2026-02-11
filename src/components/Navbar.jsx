import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/sunrise images/sunriselogo.jpg';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b-2 border-pink-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src={logo} 
              alt="Sunrise Yogurt Logo" 
              className="h-20 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link 
            to="/orders"
            className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
             Cart
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-pink-500 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium px-2 py-2"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium px-2 py-2"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium px-2 py-2"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium px-2 py-2"
              >
                Contact
              </Link>
              <Link 
                to="/orders" 
                onClick={closeMenu}
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium px-2 py-2"
              >
                Cart
              </Link>



            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;