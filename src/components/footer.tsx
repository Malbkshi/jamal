"use client";

import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">مركز منال الجمال</h3>
            <p className="text-pink-100 mb-4">مركز متخصص في العناية بالبشرة وإزالة الشعر بأحدث التقنيات العالمية</p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-200">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-pink-100 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-pink-100 hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-pink-100 hover:text-white transition-colors">
                  عن العيادة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-pink-100 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-pink-100 hover:text-white transition-colors">
                  احجز موعدك الآن
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="ml-2 text-pink-200" />
                <a href="tel:+218924275555" dir="ltr" className="text-pink-100 hover:text-white transition-colors">
                  +218 924 275 555
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="ml-2 text-pink-200" />
                <a href="https://wa.me/218924275555" target="_blank" rel="noopener noreferrer" className="text-pink-100 hover:text-white transition-colors">
                  واتساب
                </a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="ml-2 text-pink-200" />
                <a 
                  href="https://maps.app.goo.gl/9eSQqZo6Km4k47b47" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-100 hover:text-white transition-colors"
                >
                  موقعنا على الخريطة
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pink-400 mt-8 pt-8 text-center text-pink-100">
          <p>© {new Date().getFullYear()} مركز منال الجمال. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
} 