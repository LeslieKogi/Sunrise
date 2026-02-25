import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Loader } from 'lucide-react';
import { api } from '../services/api';
import displaymix from '../assets/sunrise images/displaymix.jpg';
import groupyog from '../assets/sunrise images/groupyog.jpg';
import kidsyog from '../assets/sunrise images/kidsyog.jpg';
import parffe from '../assets/sunrise images/parffe.jpg';
import pineappleyog from '../assets/sunrise images/pineappleyog.jpg';
import coconutandstraw from '../assets/sunrise images/coconutandstraw.jpg';
import { toast } from 'react-toastify';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image mapping - maps flavour names to your local images
  const imageMap = {
    'Strawberry': displaymix,
    'Greek': groupyog,
    'Kids': kidsyog,
    'Parfait': parffe,
    'Pineapple': pineappleyog,
    'Tropical': pineappleyog,
    'Mango': pineappleyog,
    'Coconut': coconutandstraw,
    'Lemon': groupyog,
    'Vanilla': displaymix,
    'Blueberry': displaymix,
    'Passion Fruit': pineappleyog,
    'Banana': displaymix,
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getFlavours();
        
        // Map backend data to include images
        const productsWithImages = data.map(flavour => ({
          id: flavour.id,
          name: flavour.name,
          description: flavour.description || 'Delicious and creamy yogurt',
          price: flavour.price,
          image: getImageForFlavour(flavour.name),
          rating: 4.5, // Default rating - you can add this to backend later
          is_available: flavour.is_available
        }));
        
        setProducts(productsWithImages);
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get image for a flavour
  const getImageForFlavour = (flavourName) => {
    // Try to find a matching image
    for (const [key, image] of Object.entries(imageMap)) {
      if (flavourName.toLowerCase().includes(key.toLowerCase())) {
        return image;
      }
    }
    // Default image if no match found
    return displaymix;
  };

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: product.id,
        flavour_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show feedback
    toast.success(`${product.name} added to cart!`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading delicious yogurts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-500 mb-4">
          Our Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our delicious range of premium yogurt products, made with the finest ingredients for your health and enjoyment.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group ${
              !product.is_available ? 'opacity-60' : ''
            }`}
          >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{product.rating}</span>
              </div>
              {/* Out of Stock Badge */}
              {!product.is_available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-pink-500">
                  KES {product.price}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.is_available}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    product.is_available
                      ? 'bg-pink-500 hover:bg-pink-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.is_available ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Contact us for custom orders and bulk purchases
        </p>
        <a 
          href="/contact"
          className="inline-block bg-white text-pink-500 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default Products;