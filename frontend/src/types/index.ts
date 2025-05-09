
export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: number; // in minutes
  genre: string[];
  rating: string;
  imageUrl: string;
  trailerUrl?: string;
}

export interface ShowTime {
  id: string;
  movieId: string;
  theater: string;
  time: string;
  date: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
}

export interface Booking {
  id: string;
  movieId: string;
  showTimeId: string;
  seats: Seat[];
  totalPrice: number;
  customerName?: string;
  customerEmail?: string;
  bookingDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod?: 'mpesa' | 'card' | 'wallet';
  refundStatus?: 'not_applicable' | 'pending' | 'completed';
  mpesaPhone?: string;
  mpesaReference?: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  code: string;
  discount: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  conditions: string[];
  minimumPurchase?: number;
}

export interface AppliedOffer {
  offerId: string;
  code: string;
  discountAmount: number;
}
