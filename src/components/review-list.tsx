"use client";

import { useEffect, useState } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { Review } from '@/types/review';

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
    
    // Subscribe to new reviews
    const subscription = supabase
      .channel('reviews')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews' }, payload => {
        setReviews(prev => [payload.new as Review, ...prev]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      setError('حدث خطأ أثناء تحميل الآراء');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600">
        جاري تحميل الآراء...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-600">
        لا توجد آراء حالياً. كن أول من يشارك رأيه!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600 mr-2">{review.rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-700 mb-2 text-right">
            {review.review}
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <FaUser className="ml-2" />
            <span>{review.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(review.created_at).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 