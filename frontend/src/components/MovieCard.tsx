
import { Movie } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CURRENCY } from "@/constants";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <motion.div 
      className="movie-card group h-full flex flex-col border border-muted rounded-xl overflow-hidden bg-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden">
        <Link to={`/movie/${movie.id}`}>
          <motion.img 
            src={movie.imageUrl} 
            alt={movie.title} 
            className="w-full aspect-[2/3] object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <Link to={`/movie/${movie.id}`}>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary/90">{movie.rating}</Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-none text-white">
            {CURRENCY.symbol} 850
          </Badge>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/movie/${movie.id}`} className="hover:text-primary">
          <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
        </Link>
        <div className="flex items-center space-x-2 mt-2 text-muted-foreground text-sm">
          <Clock className="h-4 w-4" />
          <span>{movie.duration} min</span>
          <Star className="h-4 w-4 ml-2 text-yellow-500" />
          <span className="font-medium">{Number(movie.rating.replace("PG-", "")).toFixed(1)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {movie.genre.slice(0, 3).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
          {movie.genre.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{movie.genre.length - 3}
            </Badge>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-muted">
          <Link to={`/movie/${movie.id}`}>
            <Button variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/5">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
