import Navbar from '@/components/navbar';
import Image from 'next/image';
import { FaCheck, FaAward, FaHeart, FaHandHoldingHeart } from 'react-icons/fa';
import { Metadata } from 'next';
import ReviewForm from '@/components/review-form';
import ReviewList from '@/components/review-list';

// Placeholder images
const clinicImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none"%3E%3Crect width="800" height="600" fill="%23FFB6C1"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3EClinic%3C/text%3E%3C/svg%3E';
const ownerImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none"%3E%3Crect width="800" height="600" fill="%23FF69B4"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="40" text-anchor="middle" fill="white"%3EMedina Begovic%3C/text%3E%3C/svg%3E';

export const metadata: Metadata = {
  title: 'عن العيادة - مركز منال الجمال للعناية بالبشرة وإزالة الشعر',
  description: 'تعرفي على مركز منال الجمال وفريقنا المتخصص في العناية بالبشرة وإزالة الشعر',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="bg-pink-50 rounded-xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold text-pink-600 mb-6 text-right">عن مركز منال الجمال</h1>
                <p className="text-gray-700 mb-4 text-right">
                  مركز منال الجمال هو مركز متخصص في العناية بالبشرة وإزالة الشعر، تأسس على يد خبراء في مجال التجميل والعناية بالبشرة لتقديم خدمات متميزة ذات جودة عالمية.
                </p>
                <p className="text-gray-700 mb-4 text-right">
                  يتميز المركز بموقعه المركزي وتجهيزاته الحديثة وفريقه المتخصص، مما يجعله وجهة مثالية للسيدات الباحثات عن الجمال والعناية بالبشرة.
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src={clinicImage}
                  alt="مركز منال الجمال"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Our Vision */}
          <div className="mb-16">
            <h2 className="section-heading">رؤيتنا</h2>
            <div className="bg-white rounded-xl shadow-md p-8">
              <p className="text-gray-700 mb-6 text-right">
                نسعى لأن نكون الوجهة الأولى المتميزة للعناية بالبشرة وإزالة الشعر في المنطقة، من خلال تقديم خدمات عالية الجودة بأحدث التقنيات العالمية على يد فريق من الخبراء المتخصصين.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-pink-50 rounded-lg p-6 text-center">
                  <div className="inline-block p-3 bg-pink-500 text-white rounded-full mb-4">
                    <FaAward size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-pink-600 mb-2">الجودة</h3>
                  <p className="text-gray-600">نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا</p>
                </div>
                
                <div className="bg-pink-50 rounded-lg p-6 text-center">
                  <div className="inline-block p-3 bg-pink-500 text-white rounded-full mb-4">
                    <FaHeart size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-pink-600 mb-2">الاهتمام</h3>
                  <p className="text-gray-600">نهتم بكل تفاصيل العناية بالعميلات لضمان تجربة مثالية</p>
                </div>
                
                <div className="bg-pink-50 rounded-lg p-6 text-center">
                  <div className="inline-block p-3 bg-pink-500 text-white rounded-full mb-4">
                    <FaCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-pink-600 mb-2">التميز</h3>
                  <p className="text-gray-600">نسعى دائماً للتميز والريادة في مجال العناية بالبشرة</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expert Profile */}
          <div className="mb-16">
            <h2 className="section-heading">مؤسسة المركز</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <Image
                    src={ownerImage}
                    alt="مدينه بيجوفيتش"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4 text-right">مدينا بيجوفيتش</h3>
                  <p className="text-gray-700 mb-4 text-right">
                    خبيرة متخصصة في مجال العناية بالبشرة وإزالة الشعر بالليزر، تمتلك خبرة  في هذا المجال.
                  </p>
                  <p className="text-gray-700 mb-4 text-right">
                    حصلت على عدة شهادات معتمدة من مؤسسات  متخصصة في البوسنة والهرسك في مجال التجميل والعناية بالبشرة، وعملت في العديد من المراكز المرموقة قبل تأسيس مركز منال الجمال.
                  </p>
                  <p className="text-gray-700 mb-4 text-right">
                    تؤمن مدينه بأن الجمال الحقيقي يبدأ من العناية الصحيحة بالبشرة، وتسعى دائمًا لمساعدة عميلاتها للوصول إلى أفضل النتائج من خلال استخدام أحدث التقنيات وأفضل المنتجات العالمية.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h2 className="section-heading">شهاداتنا واعتماداتنا</h2>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة اعتماد في العناية بالبشرة</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة اعتماد في تقنيات إزالة الشعر بالليزر</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة في استعمال البلازما</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة جودة المنتجات والخدمات المستخدمة من esthemax</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة اعتماد في تقنيات مكافحة الشيخوخة المتقدمة</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-pink-500 ml-2 flex-shrink-0" />
                  <span className="text-gray-700">شهادة صيدلة معتمدة من الهيئة الصحية البوسنية</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Reviews Section */}
          <div className="mt-16">
            <h2 className="section-heading">آراء عملائنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review Form */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold text-pink-600 mb-6 text-right">شاركي رأيك</h3>
                <ReviewForm />
              </div>
              
              {/* Reviews Display */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold text-pink-600 mb-6 text-right">آراء العملاء</h3>
                <ReviewList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 