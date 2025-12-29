import fancyyog from '../assets/sunrise images/fancyyog.jpg';
import parffe2 from '../assets/sunrise images/parffe2.jpg';

function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-pink-500 mb-6">
            About Sunrise Creameries
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            At Sunrise Creameries, we are passionate about bringing you the finest quality yogurt products made from the freshest ingredients. Our mission is to provide delicious and healthy options that cater to a variety of tastes and dietary needs.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2010, Sunrise Creameries has grown from a small local business to a trusted brand known for its commitment to quality and customer satisfaction. We believe in sustainability and source our ingredients from local farms whenever possible.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for choosing Sunrise Creameries. We look forward to serving you the best yogurt products for years to come!
          </p>

          {/* Optional: Stats or Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-3xl font-bold text-pink-500">10</p>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="space-y-6">
          {/* First Image - Fancy Yogurt */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img 
              src={fancyyog} 
              alt="Premium Sunrise Yogurt" 
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-semibold text-lg">Premium Quality</p>
            </div>
          </div>

          {/* Second Image - Parfait */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img 
              src={parffe2} 
              alt="Delicious Yogurt Parfait" 
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-semibold text-lg">Delicious Parfaits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;