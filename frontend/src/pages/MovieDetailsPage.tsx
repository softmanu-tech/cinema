
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, showtimes } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, Ticket, Calendar as CalendarIcon, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Movie, ShowTime } from "@/types";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieShowtimes, setMovieShowtimes] = useState<ShowTime[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Filter showtimes for this movie
      const filteredShowtimes = showtimes.filter((s) => s.movieId === id);
      setMovieShowtimes(filteredShowtimes);
    }
  }, [id]);

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate(`/booking/${id}/${selectedShowtime}`);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Movie Hero */}
      <div className="relative h-[400px] lg:h-[500px]">
        <div className="absolute inset-0">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-card rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{movie.rating}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                <p className="text-muted-foreground">{movie.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Book Tickets</h3>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Showtimes</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {movieShowtimes.map((showtime) => (
                      <Button
                        key={showtime.id}
                        variant={selectedShowtime === showtime.id ? "default" : "outline"}
                        className={selectedShowtime === showtime.id ? "bg-primary" : ""}
                        onClick={() => setSelectedShowtime(showtime.id)}
                      >
                        <div className="text-center">
                          <div>{showtime.time}</div>
                          <div className="text-xs mt-1">{showtime.theater}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full md:w-auto" 
                  size="lg"
                  disabled={!selectedShowtime}
                  onClick={handleBooking}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
