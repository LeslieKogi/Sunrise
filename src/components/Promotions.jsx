import { useState } from 'react';
import { X, Tag } from 'lucide-react';

function Promotions() {
  const [isVisible, setIsVisible] = useState(true);

  // This data will later come from your CMS
  const promotion = {
    isActive: true, // Toggle this to show/hide banner
    title: "Black Friday Sale!",
    message: "Get 25% off on all yogurt products. Use code: YOGURT25",
    backgroundColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    link: "/products", // Optional: link to products page
    linkText: "Shop Now"
  };

  // Don't render if promotion is not active or user closed it
  if (!promotion.isActive || !isVisible) {
    return null;
  }

  return (
    <div className={`${promotion.backgroundColor} text-white py-3 px-4 relative`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left side - Icon and message */}
        <div className="flex items-center gap-3 flex-1">
          <Tag className="w-5 h-5 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-bold text-sm sm:text-base">{promotion.title}</span>
            <span className="text-xs sm:text-sm opacity-95">{promotion.message}</span>
          </div>
        </div>

        {/* Right side - CTA button and close */}
        <div className="flex items-center gap-3">
          {promotion.link && (
            <a
              href={promotion.link}
              className="bg-white text-purple-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              {promotion.linkText}
            </a>
          )}
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors flex-shrink-0"
            aria-label="Close promotion banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Promotions;