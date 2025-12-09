import { ShoppingCart, Star } from 'lucide-react';
import displaymix from '../assets/sunrise images/displaymix.jpg';
import groupyog from '../assets/sunrise images/groupyog.jpg';
import kidsyog from '../assets/sunrise images/kidsyog.jpg';
import parffe from '../assets/sunrise images/parffe.jpg';
import pineappleyog from '../assets/sunrise images/pineappleyog.jpg';
import coconutandstraw from '../assets/sunrise images/coconutandstraw.jpg';

function Products() {
  // Dummy product data - will be replaced with CMS data later
  const products = [
    {
      id: 1,
      name: 'Classic Strawberry Yogurt',
      description: 'Smooth and creamy yogurt with real strawberry pieces',
      price: 150,
      image: displaymix,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Greek Yogurt Mix',
      description: 'High-protein Greek yogurt with natural ingredients',
      price: 200,
      image: groupyog,
      rating: 5.0
    },
    {
      id: 3,
      name: 'Kids Fun Pack',
      description: 'Specially made for children with fun flavors',
      price: 120,
      image: kidsyog,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Deluxe Parfait',
      description: 'Layered yogurt with granola and fresh fruits',
      price: 250,
      image: parffe,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Tropical Pineapple',
      description: 'Refreshing yogurt with tropical pineapple flavor',
      price: 180,
      image: pineappleyog,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Coconut Dream',
      description: 'Exotic coconut flavored yogurt with real coconut flakes',
      price: 190,
      image: coconutandstraw,
      rating: 4.9
    }
  ];

  const handleAddToCart = (product) => {
    // This will be connected to cart functionality later
    alert(`${product.name} added to cart!`);
  };

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
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
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
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
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