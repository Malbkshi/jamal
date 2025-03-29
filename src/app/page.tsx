import Navbar from '@/components/navbar';
import ServiceCard from '@/components/service-card';
import Testimonials from '@/components/testimonials';
import { services } from '@/data/services';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import ServicesSection from '@/components/services-section';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

// Placeholder image
const aboutImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none"%3E%3Crect width="800" height="600" fill="%23FFB6C1"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3EAbout Clinic%3C/text%3E%3C/svg%3E';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-pink-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-ibm">
                  مركز منال الجمال
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 font-ibm">
                  نقدم خدمات تجميل متكاملة بأحدث التقنيات وأعلى جودة
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/booking"
                    className="rounded-md bg-pink-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 font-ibm"
                  >
                    احجزي موعدك الآن
                  </Link>
                  <Link
                    href="/services"
                    className="text-lg font-semibold leading-6 text-gray-900 font-ibm"
                  >
                    تعرفي على خدماتنا <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/images/hero/hero1.png"
                alt="مركز منال الجمال"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                image_url={service.image_url}
                href={`/services/${service.id}`}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center btn-primary"
            >
              <span>عرض جميع الخدمات</span>
              <FaArrowLeft className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Esthemax Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">منتجات esthemax</h2>
            <div className="relative w-full max-w-2xl aspect-[4/3] mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/images/services/esthemax.png"
                alt="منتجات esthemax"
                fill
                className="object-contain bg-white"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="text-gray-700 text-center max-w-2xl mb-8">
              نقدم مجموعة متكاملة من منتجات esthemax عالية الجودة للعناية بالبشرة، 
              مصممة خصيصاً لتلبية احتياجات بشرتك وإبراز جمالك الطبيعي.
            </p>
            <Link 
              href="/esthemax" 
              className="inline-flex items-center btn-primary"
            >
              <span>اكتشفي منتجات esthemax </span>
              <FaArrowLeft className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-pink-600 mb-4 text-right">عن مركز منال الجمال</h2>
              <p className="text-gray-700 mb-4 text-right">
                مركز منال الجمال هو مركز متخصص في مجال العناية بالبشرة وإزالة الشعر بالليزر، 
                حيث نقدم خدمات عالية الجودة بأحدث التقنيات العالمية على يد خبراء متخصصين.
              </p>
              <p className="text-gray-700 mb-6 text-right">
                نحن نؤمن بأن كل امرأة تستحق أن تشعر بالثقة والجمال، 
                لذلك نسعى دائمًا لتقديم أفضل الخدمات المتميزة التي تلبي احتياجاتك وتطلعاتك.
              </p>
              <div className="text-right">
                <Link 
                  href="/about" 
                  className="inline-flex items-center btn-primary"
                >
                  <span>المزيد عن المركز</span>
                  <FaArrowLeft className="mr-2" />
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={aboutImage}
                alt="مركز منال الجمال"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Booking Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">احجزي موعدك الآن</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            استمتعي بتجربة فريدة من نوعها مع مركز منال الجمال واحصلي على أفضل خدمات العناية بالبشرة وإزالة الشعر.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/booking" 
              className="px-6 py-3 bg-white text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors"
            >
              احجزي موعدك
            </Link>
            <a 
              href="https://wa.me/218924275555" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="ml-2" size={20} />
              <span>تواصلي معنا عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
