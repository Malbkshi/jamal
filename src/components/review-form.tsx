"use client";

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { ReviewFormData } from '@/types/review';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!rating) {
      setError('الرجاء اختيار تقييم');
      return;
    }

    const reviewData: ReviewFormData = {
      name,
      rating,
      review,
    };

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([reviewData]);

      if (error) throw error;

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setName('');
        setReview('');
      }, 3000);
    } catch (err) {
      setError('حدث خطأ أثناء إرسال رأيك. الرجاء المحاولة مرة أخرى.');
      console.error('Error submitting review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating Stars */}
      <div className="flex items-center justify-end space-x-2 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-right">
          اسمك
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
          placeholder="أدخل اسمك"
          required
        />
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="review" className="block text-gray-700 font-medium mb-2 text-right">
          رأيك
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 text-right"
          rows={4}
          placeholder="اكتبي رأيك هنا..."
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm text-right">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={submitted}
          className={`bg-pink-500 text-white px-6 py-2 rounded-full font-medium transition-colors ${
            submitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
          }`}
        >
          {submitted ? 'تم إرسال رأيك بنجاح!' : 'إرسال'}
        </button>
      </div>
    </form>
  );
} 