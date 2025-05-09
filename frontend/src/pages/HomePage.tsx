
import React, { useState } from "react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Play, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CURRENCY } from "@/constants";
import { motion } from "framer-motion";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("now-showing");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
            alt="Movie Theater"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          ></motion.div>
        </div>
        <div className="container relative z-10 px-4 text-center">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Experience Cinema <span className="text-primary">Like Never Before</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
          >
            Book your tickets now for the ultimate cinema experience with premium seating, 
            immersive sound, and the latest blockbusters in crystal-clear quality.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/movies">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 rounded-full text-lg shadow-lg shadow-primary/30">
                <Ticket className="h-5 w-5 mr-2" />
                Book Tickets
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 rounded-full text-lg">
              <Play className="h-5 w-5 mr-2" />
              Watch Trailers
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Cinema Experience Highlights */}
      <div className="bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The Ultimate Cinema Experience
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card"
              variants={itemVariants}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c" 
                  alt="Premium Seating" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Premium Comfort Seating</h3>
                <p className="text-muted-foreground">
                  Relax in our plush recliner seats with extra legroom and personal space for the ultimate viewing comfort.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card"
              variants={itemVariants}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26" 
                  alt="Dolby Atmos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Immersive Dolby Atmos</h3>
                <p className="text-muted-foreground">
                  Experience movies with breathtaking audio that flows all around you with stunning clarity and depth.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card"
              variants={itemVariants}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1585647347384-2623bc1c1c1d" 
                  alt="4K Projection" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">4K Laser Projection</h3>
                <p className="text-muted-foreground">
                  Watch movies in stunning detail with our state-of-the-art 4K laser projection technology.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="now-showing" className="w-full">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Movies
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TabsList className="bg-muted/50 p-1 rounded-full">
                <TabsTrigger 
                  value="now-showing" 
                  onClick={() => setActiveTab("now-showing")}
                  className="rounded-full transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  Now Showing
                </TabsTrigger>
                <TabsTrigger 
                  value="coming-soon" 
                  onClick={() => setActiveTab("coming-soon")}
                  className="rounded-full transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  Coming Soon
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <TabsContent value="now-showing" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {movies.map((movie, index) => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="coming-soon" className="animate-fade-in">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* We'll use the same movies data for now, but in a real app this would be different */}
              {movies.slice(0, 4).map((movie, index) => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Promotions Section */}
      <div className="bg-gradient-to-b from-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Special Offers
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Terrific Tuesdays</h3>
                <p className="text-muted-foreground mb-6">
                  All tickets at 30% off every Tuesday. Bring your friends and family for an affordable movie experience.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-semibold">Tuesday Special</p>
                  <p className="text-2xl font-bold text-primary">{CURRENCY.symbol} 600 <span className="line-through text-sm text-muted-foreground">{CURRENCY.symbol} 850</span></p>
                </div>
                <Link to="/offers">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Ticket className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Membership</h3>
                <p className="text-muted-foreground mb-6">
                  Join our premium membership for exclusive benefits including ticket discounts, free popcorn, and early access to blockbusters.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-semibold">Annual Membership</p>
                  <p className="text-2xl font-bold text-primary">{CURRENCY.symbol} 2,500 <span className="text-sm text-muted-foreground">/ year</span></p>
                </div>
                <Link to="/membership">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Weekend Combo</h3>
                <p className="text-muted-foreground mb-6">
                  Special weekend combo with 2 tickets, large popcorn and 2 soft drinks at reduced prices. Perfect for date night!
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-semibold">Weekend Deal</p>
                  <p className="text-2xl font-bold text-primary">{CURRENCY.symbol} 1,800 <span className="line-through text-sm text-muted-foreground">{CURRENCY.symbol} 2,200</span></p>
                </div>
                <Link to="/offers">
                  <Button variant="link" className="text-primary p-0">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Get the best movie experience with our mobile app. Book tickets, choose your seats, get M-Pesa payment integration, and manage your bookings - all on the go!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-black hover:bg-black/90 text-white">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39601V8.92935C17.5227 9.03268 17.4364 9.11935 17.3331 9.11935H16.0372V10.4346C16.0372 10.538 15.9508 10.6246 15.8475 10.6246H14.3148C14.2115 10.6246 14.1251 10.538 14.1251 10.4346V9.11935H12.8292C12.7259 9.11935 12.6395 9.03268 12.6395 8.92935V7.39601C12.6395 7.29268 12.7259 7.20601 12.8292 7.20601H14.1251V5.89135C14.1251 5.78801 14.2115 5.70135 14.3148 5.70135H15.8475C15.9508 5.70135 16.0372 5.78801 16.0372 5.89135V7.20601H17.3331C17.4364 7.20601 17.5227 7.29268 17.5227 7.39601Z" fill="white"/>
                    <path d="M8.21939 15.1727H9.32104V12.9113H10.4227V15.1727H11.5243V11.8099H8.21939V15.1727Z" fill="white"/>
                    <path d="M5.65696 11.8096L4.6416 14.0712L3.64696 11.8096H2.47559L4.1416 15.3293L4.6416 16.3513L5.1416 15.3293L6.8076 11.8096H5.65696Z" fill="white"/>
                    <path d="M7.32104 13.5044C7.32104 14.3113 7.95437 14.9243 8.74129 14.9243C9.34129 14.9243 9.83496 14.6195 10.0885 14.1653L9.14771 13.6493C9.03496 13.8493 8.84129 13.9727 8.64771 13.9727C8.32104 13.9727 8.06271 13.7146 8.06271 13.386C8.06271 13.0579 8.32104 12.7998 8.64771 12.7998C8.82104 12.7998 9.01477 12.9035 9.14771 13.1035L10.0885 12.6066C9.83496 12.1728 9.34125 11.8685 8.74129 11.8685C7.95437 11.8494 7.32104 12.4623 7.32104 13.5044Z" fill="white"/>
                    <path d="M15.282 13.9919H15.3203C15.4331 13.9919 15.5267 13.8979 15.5267 13.7848V11.8091H16.4331V13.7848C16.4331 14.3782 16.0139 14.8557 15.4142 14.8557H15.1884C14.5892 14.8557 14.1699 14.3978 14.1699 13.7848V11.8091H15.0761V13.7848C15.0761 13.8979 15.1696 13.9919 15.282 13.9919Z" fill="white"/>
                    <path d="M17.4336 15.1724H18.3399V11.8096H17.4336V15.1724Z" fill="white"/>
                    <path d="M21.4908 12.8301H20.8149V12.0232C20.8149 11.9391 20.7599 11.8741 20.6662 11.8741H19.7599C19.6662 11.8741 19.6108 11.9391 19.6108 12.0232V12.8301H19.2668V13.6179H19.6108V15.1724H20.517V13.6179H21.1737V12.8301H20.517V12.6492C20.517 12.5652 20.572 12.5006 20.6662 12.5006H21.4908C21.4908 12.5006 21.4908 12.8301 21.4908 12.8301Z" fill="white"/>
                  </svg>
                  Play Store
                </Button>
                <Button className="bg-black hover:bg-black/90 text-white">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5414 12.191C17.5342 10.2504 18.7536 9.01113 18.8107 8.9569C17.9963 7.76768 16.7255 7.57624 16.2684 7.56394C15.0754 7.44341 13.9219 8.26341 13.3156 8.26341C12.6962 8.26341 11.7547 7.57624 10.7445 7.59677C9.4501 7.61723 8.24072 8.35349 7.56201 9.51565C6.16895 11.876 7.19641 15.3366 8.53187 17.2362C9.19826 18.1658 9.98002 19.2063 10.9902 19.1653C11.9745 19.1215 12.3361 18.5235 13.5291 18.5235C14.709 18.5235 15.0473 19.1653 16.0786 19.1394C17.1396 19.1215 17.8123 18.2033 18.4583 17.2658C19.2194 16.1705 19.5309 15.0956 19.544 15.0253C19.5176 15.0167 17.5496 14.1937 17.5414 12.191Z" fill="white"/>
                    <path d="M15.8387 6.39262C16.3738 5.73035 16.7411 4.82778 16.6489 3.9165C15.8676 3.94782 14.8885 4.43842 14.3328 5.08577C13.8403 5.65576 13.3999 6.59539 13.5057 7.47101C14.3727 7.53938 15.2847 7.04873 15.8387 6.39262Z" fill="white"/>
                  </svg>
                  App Store
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Mobile App"
                className="max-w-xs md:max-w-sm rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, early access to ticket sales, and the latest movie news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="sm:rounded-r-none"
              />
              <Button className="sm:rounded-l-none">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Export the Input component here to fix the error
const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default HomePage;
