
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Film, Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CURRENCY } from "@/constants";
import { motion } from "framer-motion";

const theaters = [
  {
    id: "1",
    name: "Cineworld IMAX",
    location: "Downtown Cinema Complex, Nairobi",
    phone: "+254 700 123 456",
    features: ["IMAX", "4DX", "VIP Seating", "Dolby Atmos"],
    hours: "9:00 AM - 11:30 PM",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    rating: 4.8,
    movieCount: 12,
    basePrice: 850
  },
  {
    id: "2",
    name: "Starlight Cinemas",
    location: "Westfield Mall, Westlands",
    phone: "+254 700 987 654",
    features: ["Recliner Seats", "Dine-in Service", "ScreenX"],
    hours: "10:00 AM - 12:00 AM",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    rating: 4.6,
    movieCount: 10,
    basePrice: 800
  },
  {
    id: "3",
    name: "Regent Picture House",
    location: "Historic District, Mombasa",
    phone: "+254 700 456 789",
    features: ["Boutique Theater", "Classic Films", "Full Bar"],
    hours: "12:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1596445836561-991bcd39a86d",
    rating: 4.9,
    movieCount: 8,
    basePrice: 900
  },
  {
    id: "4",
    name: "Metroplex Theaters",
    location: "North Shopping Center, Nakuru",
    phone: "+254 700 789 012",
    features: ["RPX Screens", "Game Zone", "Family Packages"],
    hours: "10:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f",
    rating: 4.5,
    movieCount: 14,
    basePrice: 750
  },
  {
    id: "5",
    name: "Century Cinemas",
    location: "Gateway Mall, Kisumu",
    phone: "+254 700 234 567",
    features: ["3D Movies", "Premium Sound", "Luxury Lounge"],
    hours: "10:00 AM - 10:30 PM",
    image: "https://images.unsplash.com/photo-1568876694728-451bbf694b83",
    rating: 4.7,
    movieCount: 9,
    basePrice: 800
  },
  {
    id: "6",
    name: "Paradise Studios",
    location: "Beach Road, Malindi",
    phone: "+254 700 345 678",
    features: ["Outdoor Screenings", "Beachfront View", "Premium Audio"],
    hours: "4:00 PM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1627133805103-ce2d34ccdd37",
    rating: 4.9,
    movieCount: 6,
    basePrice: 950
  }
];

const TheatersPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="container mx-auto pt-24 pb-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2 mt-4">Our Theaters</h1>
        <p className="text-muted-foreground mb-8">Find the perfect cinema experience near you</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {theaters.map((theater) => (
          <motion.div 
            key={theater.id} 
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all">
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src={theater.image} 
                  alt={theater.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{theater.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
                  From {CURRENCY.symbol} {theater.basePrice}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{theater.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {theater.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Film className="h-3 w-3 mr-1" />
                    <span>{theater.movieCount} movies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{theater.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{theater.hours}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {theater.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90" asChild>
                  <Link to={`/`}>
                    <Ticket className="h-4 w-4" />
                    View Showtimes
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Theater Map Section */}
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Find Theaters Near You</h2>
        <div className="aspect-[16/9] bg-muted rounded-xl overflow-hidden">
          {/* In a real app this would be an actual map */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Interactive map would appear here</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TheatersPage;
