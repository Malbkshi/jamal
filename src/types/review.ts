export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

export interface ReviewFormData {
  name: string;
  rating: number;
  review: string;
} 