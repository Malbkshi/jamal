import Navbar from '@/components/navbar';
import ServiceCard from '@/components/service-card';
import { getServices } from '@/lib/supabase';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services as localServices } from '@/data/services';

export const metadata: Metadata = {
  title: 'خدماتنا - مركز منال الجمال للعناية بالبشرة وإزالة الشعر',
  description: 'استكشفي كافة خدماتنا المتخصصة في العناية بالبشرة، إزالة الشعر، جلسات Esthemax وعلاجات البلازما',
  openGraph: {
    title: 'خدماتنا - مركز منال الجمال',
    description: 'استكشفي كافة خدماتنا المتخصصة في العناية بالبشرة، إزالة الشعر، جلسات Esthemax وعلاجات البلازما',
    images: ['/images/services/services-banner.jpg'],
  },
};

export default async function ServicesPage() {
  let services = localServices;
  let error = null;

  try {
    const supabaseServices = await getServices();
    if (supabaseServices && supabaseServices.length > 0) {
      services = supabaseServices;
    }
  } catch (err) {
    console.error('Error fetching services from Supabase:', err);
    error = 'حدث خطأ أثناء تحميل الخدمات. نعرض حالياً البيانات المحلية.';
  }
  
  // Find the Esthemax service to feature it
  const esthemaxService = services.find(service => service.id === 'esthemax');
  // Find the Plasma service to feature it
  const plasmaService = services.find(service => service.id === 'plasma-therapy');

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pink-600 mb-4">خدماتنا</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              نقدم مجموعة متكاملة من خدمات العناية بالبشرة وإزالة الشعر بأحدث التقنيات العالمية
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg text-center">
              {error}
            </div>
          )}
          
          {/* Featured Treatments Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-pink-800 mb-8 text-center">علاجاتنا المميزة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Esthemax Featured Card */}
              {esthemaxService && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="relative aspect-[4/3] w-full bg-white">
                    <Image
                      src={esthemaxService.image_url || '/images/services/esthemax.png'}
                      alt={esthemaxService.title}
                      fill
                      className="object-contain bg-white"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-pink-600 mb-3">{esthemaxService.title}</h3>
                    <p className="text-gray-600 mb-4">{esthemaxService.description}</p>
                    <ul className="mb-6 space-y-2 text-right">
                      {esthemaxService.features?.slice(0, 4).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-500 ml-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={`/services/${esthemaxService.id}`}
                      className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                    >
                      اكتشفي المزيد
                    </Link>
                  </div>
                </div>
              )}

              {/* Plasma Therapy Featured Card */}
              {plasmaService && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 w-full">
                    <Image
                      src={plasmaService.image_url || '/images/services/plazma.png'}
                      alt={plasmaService.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-pink-600 mb-3">{plasmaService.title}</h3>
                    <p className="text-gray-600 mb-4">{plasmaService.description}</p>
                    <ul className="mb-6 space-y-2 text-right">
                      {plasmaService.features?.slice(0, 4).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-500 ml-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={`/services/${plasmaService.id}`}
                      className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                    >
                      اكتشفي المزيد
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Services Grid - Exclude featured services */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-pink-800 mb-8 text-center">جميع الخدمات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter(service => service.id !== 'esthemax' && service.id !== 'plasma-therapy')
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    image_url={service.image_url}
                    href={`/services/${service.id}`}
                  />
                ))
              }
            </div>
          </div>

          {/* Esthemax Products Section */}
          <div className="mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-16">
                <Image
                  src="/images/services/esthemax.png"
                  alt="Esthemax Logo"
                  fill
                  className="object-contain"
                  priority
                  quality={90}
                  sizes="192px"
                />
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-center">
              نستخدم في مركزنا منتجات وتقنيات Esthemax العالمية للحصول على أفضل النتائج
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">HYDROJELLY® MASK</h3>
                <p className="text-gray-600">أقنعة هيدروجيلي للترطيب العميق وتهدئة البشرة</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">POLY-L-LACTIC ACID</h3>
                <p className="text-gray-600">تقنية تحفيز الكولاجين وتحسين مرونة البشرة</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">DERMAPLLA®</h3>
                <p className="text-gray-600">علاجات متخصصة لتجديد البشرة ومكافحة علامات التقدم في العمر</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">ENZYME POWDER</h3>
                <p className="text-gray-600">تقشير طبيعي للبشرة لإزالة الخلايا الميتة وتنقية المسام</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">RUBBER MASK</h3>
                <p className="text-gray-600">أقنعة متخصصة للعناية المكثفة وترطيب البشرة</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">LED TREATMENT</h3>
                <p className="text-gray-600">علاج بالضوء لتحفيز تجديد الخلايا ومكافحة حب الشباب</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">THERMAL MUMMY MASK</h3>
                <p className="text-gray-600">قناع حراري للتنظيف العميق والتخلص من السموم</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">STEM CELL MIST</h3>
                <p className="text-gray-600">رذاذ الخلايا الجذعية لتجديد البشرة وترطيبها</p>
              </div>
              <div className="bg-pink-50 p-5 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-3">SCULPLLA TREATMENT</h3>
                <p className="text-gray-600">علاج سكولبلا المتطور لشد البشرة وتقليل التجاعيد</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/services/esthemax"
                className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                تعرفي على المزيد عن جلسات Esthemax
              </Link>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-right">لماذا تختارنا؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">خبرة متخصصة</h3>
                <p className="text-gray-600">فريق من المتخصصين ذوي الخبرة العالية في مجال العناية بالبشرة وإزالة الشعر</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">تقنيات متطورة</h3>
                <p className="text-gray-600">نستخدم أحدث الأجهزة والتقنيات العالمية لضمان أفضل النتائج</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">خدمة متميزة</h3>
                <p className="text-gray-600">نقدم خدمة شخصية متميزة مع متابعة مستمرة لنتائج العلاج</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">بيئة آمنة</h3>
                <p className="text-gray-600">نلتزم بأعلى معايير النظافة والسلامة في جميع خدماتنا</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">احجزي موعدك الآن</h2>
            <p className="text-gray-700 mb-6">تواصلي معنا لحجز موعدك والاستمتاع بأفضل خدمات العناية بالبشرة</p>
            <Link
              href="/booking"
              className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors"
            >
              احجزي الآن
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 