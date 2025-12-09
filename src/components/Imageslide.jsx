import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images from assets folder
import kids2 from '../assets/sunrise images/kids2.jpg';
import kids3 from '../assets/sunrise images/kids3.jpg';
import kids4 from '../assets/sunrise images/kids4.jpg';
import model1 from '../assets/sunrise images/model1.jpg';
import models2 from '../assets/sunrise images/models2.jpg';

function ImageSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Your actual yogurt product images
  const images = [
    {
      url: kids3,
      alt: 'Kids enjoying Sunrise Yogurt'
    },
    {
      url: kids2,
      alt: 'Happy children with yogurt'
    },
    {
      url: kids4,
      alt: 'Delicious yogurt for all'
    },
    {
      url: model1,
      alt: ''
    },
    {
      url: models2,
      alt: 'Happy kids with Sunrise Yogurt'
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-96 bg-neutral-200 relative overflow-hidden group">
      {/* Main Image Display */}
      <div className="w-full h-full relative">
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Optional: Image overlay with text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="text-white text-lg font-medium">{images[currentIndex].alt}</p>
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlide;