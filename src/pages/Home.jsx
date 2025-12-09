import ImageSlide from '../components/Imageslide';

function Home() {
  return (
    <div>
      {/* Hero Image Slider */}
      <ImageSlide />
      
      {/* Rest of your homepage content */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-sunrisePink">
          Welcome to Sunrise Creameries 
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Discover our delicious range of premium yogurt products, 
          made with the finest ingredients for your health and enjoyment.
        </p>
      </section>
    </div>
  );
}

export default Home;
