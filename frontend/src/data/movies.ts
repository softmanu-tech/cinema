
import { Movie, ShowTime } from "@/types";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception: The IMAX Experience",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2023-12-15",
    duration: 148,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: "PG-13",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
  {
    id: "2",
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to follow the white rabbit once more.",
    releaseDate: "2023-11-20",
    duration: 148,
    genre: ["Action", "Sci-Fi"],
    rating: "R",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
  {
    id: "3",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    releaseDate: "2024-01-10",
    duration: 155,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: "PG-13",
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
  },
  {
    id: "4",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    releaseDate: "2023-10-05",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    rating: "R",
    imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
  },
  {
    id: "5",
    title: "Blade Runner 2099",
    description: "A direct sequel to 'Blade Runner 2049' featuring new characters in the same universe.",
    releaseDate: "2024-02-15",
    duration: 160,
    genre: ["Drama", "Mystery", "Sci-Fi"],
    rating: "R",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
  {
    id: "6",
    title: "Interstellar: Extended Cut",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2023-09-28",
    duration: 195,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: "PG-13",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  }
];

export const showtimes: ShowTime[] = [
  // Movie 1 Showtimes
  {
    id: "st1",
    movieId: "1",
    theater: "Cinema 1 - IMAX",
    time: "10:00 AM",
    date: "2024-06-15",
    price: 15.99
  },
  {
    id: "st2",
    movieId: "1",
    theater: "Cinema 1 - IMAX",
    time: "1:30 PM",
    date: "2024-06-15",
    price: 15.99
  },
  {
    id: "st3",
    movieId: "1",
    theater: "Cinema 1 - IMAX",
    time: "5:00 PM",
    date: "2024-06-15",
    price: 18.99
  },
  {
    id: "st4",
    movieId: "1",
    theater: "Cinema 1 - IMAX",
    time: "8:30 PM",
    date: "2024-06-15",
    price: 18.99
  },
  
  // Movie 2 Showtimes
  {
    id: "st5",
    movieId: "2",
    theater: "Cinema 2 - Standard",
    time: "11:00 AM",
    date: "2024-06-15",
    price: 12.99
  },
  {
    id: "st6",
    movieId: "2",
    theater: "Cinema 2 - Standard",
    time: "2:15 PM",
    date: "2024-06-15",
    price: 12.99
  },
  {
    id: "st7",
    movieId: "2",
    theater: "Cinema 2 - Standard",
    time: "6:00 PM",
    date: "2024-06-15",
    price: 14.99
  },
  {
    id: "st8",
    movieId: "2",
    theater: "Cinema 2 - Standard",
    time: "9:15 PM",
    date: "2024-06-15",
    price: 14.99
  },
  
  // Movie 3 Showtimes
  {
    id: "st9",
    movieId: "3",
    theater: "Cinema 3 - Dolby Atmos",
    time: "10:30 AM",
    date: "2024-06-15",
    price: 14.99
  },
  {
    id: "st10",
    movieId: "3",
    theater: "Cinema 3 - Dolby Atmos",
    time: "1:45 PM",
    date: "2024-06-15",
    price: 14.99
  },
  {
    id: "st11",
    movieId: "3",
    theater: "Cinema 3 - Dolby Atmos",
    time: "5:30 PM",
    date: "2024-06-15",
    price: 16.99
  },
  {
    id: "st12",
    movieId: "3",
    theater: "Cinema 3 - Dolby Atmos",
    time: "9:00 PM",
    date: "2024-06-15",
    price: 16.99
  },
  
  // Add more showtimes for other movies as needed
  {
    id: "st13",
    movieId: "4",
    theater: "Cinema 4 - Standard",
    time: "1:00 PM",
    date: "2024-06-15",
    price: 12.99
  },
  {
    id: "st14",
    movieId: "4",
    theater: "Cinema 4 - Standard",
    time: "6:30 PM",
    date: "2024-06-15",
    price: 14.99
  },
  {
    id: "st15",
    movieId: "5",
    theater: "Cinema 5 - Standard",
    time: "2:00 PM",
    date: "2024-06-15",
    price: 12.99
  },
  {
    id: "st16",
    movieId: "5",
    theater: "Cinema 5 - Standard",
    time: "7:30 PM",
    date: "2024-06-15",
    price: 14.99
  },
  {
    id: "st17",
    movieId: "6",
    theater: "Cinema 6 - IMAX",
    time: "11:30 AM",
    date: "2024-06-15",
    price: 15.99
  },
  {
    id: "st18",
    movieId: "6",
    theater: "Cinema 6 - IMAX",
    time: "7:00 PM",
    date: "2024-06-15",
    price: 18.99
  }
];

export const generateRandomSeats = (showTimeId: string): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(row => {
    for (let i = 1; i <= 10; i++) {
      const random = Math.random();
      let status: 'available' | 'booked' = 'available';
      
      // Make about 25% of seats booked
      if (random < 0.25) {
        status = 'booked';
      }
      
      seats.push({
        id: `${showTimeId}-${row}${i}`,
        row,
        number: i,
        status
      });
    }
  });
  
  return seats;
};

import { Seat } from "@/types";

