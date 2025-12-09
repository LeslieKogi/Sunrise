import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-600">
            YogurtCo
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;