import { Mail, Phone, Facebook } from 'lucide-react';
import logo from '../assets/sunrise images/sunriselogo.jpg';

function Footer() {
  return (
    <footer className=" bg-sunriseYellow border-t-2 border-pink-400 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo */}
          <div className="flex items-center mb-6 sm:mb-0">
            
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-3 text-gray-700">
            {/* Email */}
            <h4  
              className="flex items-center gap-2 hover:text-pink-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>sunrisecreameries@gmail.com</span>
            </h4>

            {/* Phone */}
            <h4 
              className="flex items-center gap-2 hover:text-pink-500 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>0702 126007</span>
            </h4>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/share/17YZ47ebvm/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span>Follow us on Facebook</span>
            </a>
          </div>
        </div>

        <hr className="my-6 border-black" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Sunrise Creameries. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;