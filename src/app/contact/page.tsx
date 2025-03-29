import Navbar from '@/components/navbar';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اتصل بنا - مركز منال الجمال للعناية بالبشرة وإزالة الشعر',
  description: 'تواصل معنا للاستفسار أو حجز موعد في مركز منال الجمال للعناية بالبشرة وإزالة الشعر',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">اتصل بنا</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6 text-right">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhone className="ml-4 text-pink-500" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">رقم الهاتف</h3>
                    <a href="tel:+218924275555" dir="ltr" className="text-gray-600 hover:text-pink-600 transition-colors">
                      +218 924 275 555
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaWhatsapp className="ml-4 text-pink-500" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">واتساب</h3>
                    <a href="https://wa.me/218924275555" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
                      تواصل معنا عبر الواتساب
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaEnvelope className="ml-4 text-pink-500" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">البريد الإلكتروني</h3>
                    <a href="mailto:info@manalaljamal.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                      info@manalaljamal.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaMapMarkerAlt className="ml-4 text-pink-500" size={20} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">العنوان</h3>
                    <p className="text-gray-600">
                      طرابلس، ليبيا
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/9eSQqZo6Km4k47b47" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition-colors inline-block mt-2"
                    >
                      موقعنا على الخريطة
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="ml-4 text-pink-500">
                    <div className="flex space-x-2 space-x-reverse">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                        <FaInstagram size={20} />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                        <FaFacebook size={20} />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">تابعنا على وسائل التواصل الاجتماعي</h3>
                    <p className="text-gray-600">
                      تابعينا للحصول على آخر العروض والنصائح
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-6 text-right">راسلنا</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-right">
                    الاسم
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-right">
                    البريد الإلكتروني
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
                    placeholder="أدخل بريدك الإلكتروني"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-right">
                    رقم الهاتف
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
                    placeholder="أدخل رقم هاتفك"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-right">
                    الرسالة
                  </label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                
                <div className="text-center pt-4">
                  <button 
                    type="submit" 
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-colors w-full md:w-auto min-w-40"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-right">موقعنا</h2>
            
            <div className="h-96 w-full rounded-lg overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.4402522316945!2d13.18027757593162!3d32.85444997426151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a893613eb6b545%3A0x52f9bd5c6a65ae0!2sManal%20Beauty%20Center!5e0!3m2!1sen!2sus!4v1703863156951!5m2!1sen!2sus"
                width="100%" 
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مركز منال الجمال"
              ></iframe>
            </div>
            
            <div className="mt-4 text-right">
              <a 
                href="https://maps.app.goo.gl/9eSQqZo6Km4k47b47" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors font-medium"
              >
                الحصول على الاتجاهات
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 