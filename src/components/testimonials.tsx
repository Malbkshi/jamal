"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Testimonial = {
  id: number;
  name: string;
  quote: string;
  image: string;
};

// Placeholder avatar images
const placeholderAvatars = [
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none"%3E%3Ccircle cx="100" cy="100" r="100" fill="%23FFB6C1"%3E%3C/circle%3E%3Ctext x="100" y="110" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3E1%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none"%3E%3Ccircle cx="100" cy="100" r="100" fill="%23FF69B4"%3E%3C/circle%3E%3Ctext x="100" y="110" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3E2%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none"%3E%3Ccircle cx="100" cy="100" r="100" fill="%23FF1493"%3E%3C/circle%3E%3Ctext x="100" y="110" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3E3%3C/text%3E%3C/svg%3E',
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'مريم أحمد',
    quote: 'تجربتي في مركز منال الجمال كانت ممتازة. النتائج رائعة والموظفين محترفين ومهتمين جداً.',
    image: placeholderAvatars[0],
  },
  {
    id: 2,
    name: 'نور الشمري',
    quote: 'جربت العديد من المراكز لكن مركز منال الجمال من أفضل المراكز من حيث الجودة والاهتمام بالتفاصيل.',
    image: placeholderAvatars[1],
  },
  {
    id: 3,
    name: 'سارة محمد',
    quote: 'أنا سعيدة جداً بنتائج جلسات الليزر، فريق العمل متعاون والمركز نظيف ومريح.',
    image: placeholderAvatars[2],
  },
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-16 bg-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">آراء عملائنا</h2>
        
        <div className="relative mt-12">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeTestimonial * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center text-center md:text-right">
                    <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-3/4 md:pr-6">
                      <p className="text-gray-600 text-lg mb-4">{testimonial.quote}</p>
                      <h4 className="text-pink-600 font-bold">{testimonial.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === activeTestimonial ? 'bg-pink-500' : 'bg-pink-200'
                }`}
                aria-label={`إعرض آراء العميل ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 