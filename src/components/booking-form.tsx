"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Plus, Trash2, Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Service } from "@/lib/services";
import { supabase } from '@/lib/supabase';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

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

interface BookingFormProps {
  serviceId?: string;
}

interface SelectedService {
  id: string;
  title: string;
  price: number;
  duration: number;
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  services: string[];
  notes: string;
}

export default function BookingForm({ serviceId }: BookingFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        console.error("Error fetching services:", error);
        return;
      }
      setServices(data || []);
    };
    fetchServices();
  }, []);

  // Time slots in Arabic format
  const timeSlots = [
    "10:00 صباحاً", "10:30 صباحاً", "11:00 صباحاً", "11:30 صباحاً",
    "12:00 مساءً", "12:30 مساءً", "01:00 مساءً", "01:30 مساءً",
    "02:00 مساءً", "02:30 مساءً", "03:00 مساءً", "03:30 مساءً",
    "04:00 مساءً", "04:30 مساءً", "05:00 مساءً", "05:30 مساءً",
  ];

  // Get tomorrow's date for the min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Get date 3 months from now for the max date attribute
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const threeMonthsLaterStr = threeMonthsLater.toISOString().split("T")[0];

  // Convert Arabic time to AM/PM format
  const convertArabicTimeToAMPM = (arabicTime: string): string => {
    const timeMatch = arabicTime.match(/(\d+):(\d+)\s+(صباحاً|مساءً)/);
    if (!timeMatch) {
      throw new Error("صيغة الوقت غير صحيحة");
    }

    let [_, hours, minutes, period] = timeMatch;
    let hoursNum = parseInt(hours);
    
    if (period === "مساءً" && hoursNum !== 12) {
      hoursNum += 12;
    } else if (period === "صباحاً" && hoursNum === 12) {
      hoursNum = 0;
    }
    
    return `${hoursNum.toString().padStart(2, "0")}:${minutes} ${period === "صباحاً" ? "AM" : "PM"}`;
  };

  // Convert AM/PM time to Arabic format
  const convertAMPMToArabicTime = (ampmTime: string): string => {
    const timeMatch = ampmTime.match(/(\d+):(\d+)\s+(AM|PM)/);
    if (!timeMatch) {
      throw new Error("Invalid time format");
    }

    let [_, hours, minutes, period] = timeMatch;
    let hoursNum = parseInt(hours);
    
    if (period === "PM" && hoursNum !== 12) {
      hoursNum -= 12;
    } else if (period === "AM" && hoursNum === 0) {
      hoursNum = 12;
    }
    
    return `${hoursNum}:${minutes} ${period === "AM" ? "صباحاً" : "مساءً"}`;
  };

  const handleAddService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service && !selectedServices.find(s => s.id === serviceId)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const calculateTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (selectedServices.length === 0) {
        throw new Error("الرجاء اختيار خدمة واحدة على الأقل");
      }

      // Convert Arabic time to AM/PM format for database
      const timeInAMPM = convertArabicTimeToAMPM(selectedTime);

      // Format date for Supabase (YYYY-MM-DD)
      const formattedDate = selectedDate.split('T')[0];

      // Validate required fields
      if (!name.trim()) {
        throw new Error("الرجاء إدخال الاسم");
      }
      if (!phone.trim()) {
        throw new Error("الرجاء إدخال رقم الهاتف");
      }
      if (!formattedDate) {
        throw new Error("الرجاء اختيار التاريخ");
      }
      if (!timeInAMPM) {
        throw new Error("الرجاء اختيار الوقت");
      }

      console.log("Submitting bookings with data:", {
        services: selectedServices,
        date: formattedDate,
        time: timeInAMPM,
        customer: {
          name,
          phone,
          email,
          notes
        }
      });

      // Create bookings one by one to better handle errors
      for (const service of selectedServices) {
        const bookingData = {
          service_id: service.id,
          customer_name: name.trim(),
          phone_number: phone.trim(),
          email: email ? email.trim() : null,
          booking_date: formattedDate,
          booking_time: timeInAMPM,
          notes: notes ? notes.trim() : null,
          status: "pending",
        };

        console.log("Creating booking for service:", service.id, bookingData);

        try {
          // Try to create a new client for each booking attempt
          const bookingClient = createClient(
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

          // First, verify the table structure
          const { data: tableInfo, error: tableError } = await bookingClient
            .from('bookings')
            .select('*')
            .limit(1);

          if (tableError) {
            console.error("Error checking table structure:", tableError);
            throw new Error("فشل في التحقق من هيكل الجدول");
          }

          // Now try to insert the booking
          const { data, error } = await bookingClient
            .from("bookings")
            .insert(bookingData)
            .select();

          if (error) {
            console.error("Error creating booking for service:", service.id, error);
            throw new Error(`فشل في إنشاء الحجز: ${error.message}`);
          }

          console.log("Successfully created booking:", data);
        } catch (err: any) {
          console.error("Error in booking creation:", err);
          throw new Error(`فشل في إنشاء الحجز: ${err.message}`);
        }
      }

      setSuccess(true);
      // Reset form after successful submission
      setSelectedServices([]);
      setName("");
      setPhone("");
      setEmail("");
      setNotes("");
      setSelectedDate("");
      setSelectedTime("");
    } catch (err: any) {
      console.error("Error in handleSubmit:", err);
      setError(err.message || "حدث خطأ أثناء الحجز");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mb-4 text-green-500">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold">تم الحجز بنجاح!</h3>
        <p className="text-gray-600">
          شكراً لك على الحجز. سنتواصل معك قريباً لتأكيد موعدك.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-6 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-sm">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center space-y-2 mb-6">
              <p className="text-sm text-pink-700 text-center">
                يمكنك استخدام رقم الهاتف أو البريد الإلكتروني للبحث عن حجزك لاحقاً
              </p>
              <a
                href="/booking-status"
                className="text-sm text-pink-600 hover:text-pink-800 font-medium"
              >
                البحث عن حالة الحجز
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-pink-900 mb-2">
                  اختر الخدمة
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => handleAddService(e.target.value)}
                  className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-sm bg-white py-2.5"
                >
                  <option value="">اختر خدمة</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} - {service.price} دينار ليبي
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Services */}
              {selectedServices.length > 0 && (
                <div className="bg-pink-50 p-4 rounded-xl border-2 border-pink-100">
                  <h3 className="text-sm font-medium text-pink-900 mb-3">الخدمات المختارة</h3>
                  <ul className="space-y-2">
                    {selectedServices.map((service) => (
                      <li key={service.id} className="flex justify-between items-center text-sm bg-white p-2 rounded-lg">
                        <span className="text-pink-800">{service.title}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-pink-700 font-medium">{service.price} دينار ليبي</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveService(service.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-pink-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-pink-900">المجموع:</span>
                      <span className="font-bold text-pink-700 text-lg">
                        {selectedServices.reduce((sum, service) => sum + service.price, 0)} دينار ليبي
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-pink-900 mb-2">
                  اختر التاريخ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={tomorrowStr}
                    max={threeMonthsLaterStr}
                    className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                  />
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-pink-900 mb-2">
                  اختر الوقت
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                  >
                    <option value="">اختر وقت</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-pink-900 mb-2">
                    الاسم
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-pink-900 mb-2">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                      required
                      placeholder="أدخل رقم الهاتف"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-pink-900 mb-2">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                      required
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-pink-900 mb-2">
                    ملاحظات (اختياري)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 pl-10 text-sm bg-white py-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading || selectedServices.length === 0}
                  className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${
                    loading || selectedServices.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  }`}
                >
                  {loading ? "جاري الحجز..." : "تأكيد الحجز"}
                </button>
              </div>

              {/* Booking Status Lookup Button */}
              <div className="mt-6 pt-4 border-t-2 border-pink-100">
                <a
                  href="/booking-status"
                  className="w-full py-3 px-4 border-2 border-pink-500 rounded-xl shadow-sm text-sm font-medium text-pink-600 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center justify-center"
                >
                  <Search className="mr-2 h-4 w-4" />
                  البحث عن حالة الحجز
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 