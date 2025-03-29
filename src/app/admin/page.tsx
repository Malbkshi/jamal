"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaUsers, FaCalendarAlt, FaClock, FaPhone, FaStar, FaTrash, FaCheck, FaTimes, FaSearch, FaFilter, FaReply, FaSignOutAlt } from 'react-icons/fa';
import { signOut, isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
  response?: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [reviewResponse, setReviewResponse] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [checkAuth, fetchData]);

  const checkAuth = async () => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchBookings(), fetchReviews()]);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل البيانات');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setBookings(data || []);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    setReviews(data || []);
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating booking:', err);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const addReviewResponse = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ response: reviewResponse[reviewId] })
        .eq('id', reviewId);

      if (error) throw error;
      setReviewResponse({ ...reviewResponse, [reviewId]: '' });
      fetchReviews();
    } catch (err) {
      console.error('Error adding review response:', err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const uniqueServices = Array.from(new Set(bookings.map(booking => booking.service)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaSignOutAlt className="ml-2" />
            تسجيل الخروج
          </button>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">الحجوزات</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    <option value="all">جميع الخدمات</option>
                    {uniqueServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الهاتف</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخدمة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{booking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{booking.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{booking.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{booking.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-base leading-5 font-medium rounded-full ${
                        booking.status === 'confirmed' ? 'bg-pink-50 text-pink-700 border border-pink-200' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' :
                         booking.status === 'cancelled' ? 'ملغي' :
                         'قيد الانتظار'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="text-pink-600 hover:text-pink-900 transition-colors duration-150"
                            title="تأكيد الحجز"
                          >
                            <FaCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150"
                            title="إلغاء الحجز"
                          >
                            <FaTimes className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">المراجعات</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 ml-2" />
                    <span className="text-gray-900">{review.name}</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-right">{review.review}</p>
                
                {review.response ? (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaReply className="ml-2" />
                      رد المشرف
                    </div>
                    <p className="text-gray-700 text-right">{review.response}</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-right"
                      placeholder="اكتب ردك هنا..."
                      value={reviewResponse[review.id] || ''}
                      onChange={(e) => setReviewResponse({ ...reviewResponse, [review.id]: e.target.value })}
                    />
                    <button
                      onClick={() => addReviewResponse(review.id)}
                      className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      إرسال الرد
                    </button>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('ar-SA')}
                  </span>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 