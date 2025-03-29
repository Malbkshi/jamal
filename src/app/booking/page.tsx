import { Metadata } from "next";
import { getServices } from "@/lib/services";
import Navbar from "@/components/navbar";
import BookingForm from "@/components/booking-form";

export const metadata: Metadata = {
  title: "حجز موعد - مركز منال الجمل للتجميل",
  description: "احجزي موعدك للعناية بجمالك معنا.",
};

interface BookingPageProps {
  searchParams: Promise<{ serviceId?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const services = await getServices();
  const params = await searchParams;
  const selectedService = params.serviceId
    ? services.find((s) => s.id === params.serviceId)
    : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">حجز موعد</h1>
            <div className="bg-pink-50 border border-pink-100 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-pink-900 mb-2">مرحباً بكم في مركز منال الجمال</h2>
              <p className="text-pink-700 mb-4">نقدم لكم أفضل خدمات العناية بالبشرة وإزالة الشعر</p>
              <div className="bg-pink-100 border border-pink-200 rounded-lg p-4">
                <h3 className="text-xl font-bold text-pink-900 mb-2">عرض خاص في شهر رمضان</h3>
                <p className="text-pink-800 font-medium">خصم 20% على جميع خدماتنا</p>
                <p className="text-sm text-pink-600 mt-2">* العرض ساري حتى نهاية شهر رمضان</p>
              </div>
            </div>
          </div>
          
          <div className="mx-auto max-w-2xl">
            <BookingForm serviceId={selectedService?.id} />
          </div>
        </div>
      </main>
    </div>
  );
} 