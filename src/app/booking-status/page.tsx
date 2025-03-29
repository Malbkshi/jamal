"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Phone, Mail, Search, Loader2, Calendar, Clock, MessageSquare } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: false
    }
  }
);

interface Booking {
  id: string;
  service_id: string;
  customer_name: string;
  phone_number: string;
  email: string;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  services?: {
    title: string;
    price: number;
  };
}

export default function BookingStatusPage() {
  const [searchType, setSearchType] = useState<"phone" | "email">("phone");
  const [searchValue, setSearchValue] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setBookings([]);

    try {
      let query = supabase
        .from("bookings")
        .select(`
          *,
          services (
            title,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (searchType === "phone") {
        query = query.eq("phone_number", searchValue);
      } else {
        query = query.eq("email", searchValue);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        setError("لم يتم العثور على حجوزات");
        return;
      }

      setBookings(data);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء البحث عن الحجوزات");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-pink-100 text-pink-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "تم الموافقة";
      case "pending":
        return "قيد الانتظار";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm border-b border-gray-100 mb-8">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
              البحث عن حالة الحجز
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              أدخل رقم الهاتف أو البريد الإلكتروني للبحث عن حجوزاتك
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setSearchType("phone")}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    searchType === "phone"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  رقم الهاتف
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("email")}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    searchType === "email"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  البريد الإلكتروني
                </button>
              </div>

              <div className="relative">
                {searchType === "phone" ? (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                ) : (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                )}
                <input
                  type={searchType === "phone" ? "tel" : "email"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white"
                  placeholder={
                    searchType === "phone"
                      ? "أدخل رقم الهاتف"
                      : "أدخل البريد الإلكتروني"
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 border border-transparent text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    جاري البحث...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    بحث
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="bg-white shadow-sm border-b border-gray-100">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">الحجوزات</h3>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 p-6 border border-gray-200 hover:border-pink-200 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">
                          {booking.services?.title}
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-2 text-pink-500" />
                            {new Date(booking.booking_date).toLocaleDateString("ar-SA")}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 ml-2 text-pink-500" />
                            {booking.booking_time}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 text-sm font-medium ${
                          booking.status === "approved"
                            ? "bg-pink-50 text-pink-700 border border-pink-200"
                            : booking.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    {booking.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 flex items-start">
                          <MessageSquare className="w-4 h-4 ml-2 mt-0.5 text-pink-500" />
                          {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 