
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketCheck, Download, Calendar, Clock, MapPin, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CURRENCY } from "@/constants";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MyBookingsPage = () => {
  const [email, setEmail] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeBookings, setActiveBookings] = useState([
    {
      id: "BK123456",
      movieTitle: "Inception: 10th Anniversary",
      theaterName: "Cineworld IMAX",
      date: "2025-05-15",
      time: "19:30",
      seats: ["F7", "F8", "F9"],
      totalPrice: 2550.00,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
      paymentMethod: "mpesa",
      paymentReference: "MPESA9876543210"
    },
    {
      id: "BK654321",
      movieTitle: "The Dark Knight",
      theaterName: "Starlight Cinemas",
      date: "2025-05-20",
      time: "20:15",
      seats: ["D12", "D13"],
      totalPrice: 1700.00,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
      paymentMethod: "card",
      paymentReference: "CARD1234567890"
    }
  ]);
  const [walletBalance, setWalletBalance] = useState(1250.00);
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  const handleFind = () => {
    setIsProcessing(true);
    
    // In a real app, this would query the backend for the booking
    setTimeout(() => {
      if (email && bookingCode) {
        setIsLoggedIn(true);
        toast.success("Bookings found successfully!");
      } else {
        toast.error("Please enter both email and booking code");
      }
      setIsProcessing(false);
    }, 1500);
  };

  const handleCancel = (id: string) => {
    setIsProcessing(true);
    
    // In a real app, this would call an API to cancel the booking
    setTimeout(() => {
      const booking = activeBookings.find(b => b.id === id);
      if (booking) {
        setActiveBookings(activeBookings.filter(booking => booking.id !== id));
        
        // Add refund to wallet
        const refundAmount = booking.totalPrice * 0.85; // 85% refund
        setWalletBalance(prev => prev + refundAmount);
        
        toast.success(`Booking ${id} cancelled. ${CURRENCY.symbol} ${refundAmount.toFixed(2)} refunded to your wallet.`);
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="container mx-auto pt-24 pb-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 mt-4"
        variants={itemVariants}
      >
        My Bookings
      </motion.h1>
      
      {!isLoggedIn ? (
        <motion.div variants={itemVariants}>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Find Your Bookings</CardTitle>
              <CardDescription>Enter your email and booking code to view your reservations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bookingCode" className="text-sm font-medium">Booking Code</label>
                <Input 
                  id="bookingCode" 
                  placeholder="e.g. BK123456" 
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleFind}
                disabled={isProcessing}
              >
                {isProcessing ? 'Searching...' : 'Find My Bookings'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <div>
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-xl font-semibold">Hello, User!</h2>
              <p className="text-muted-foreground">Welcome to your bookings dashboard</p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Wallet Balance</div>
                <div className="font-semibold">{CURRENCY.symbol} {walletBalance.toFixed(2)}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="active">Active Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-6">
                {activeBookings.length > 0 ? (
                  activeBookings.map((booking, index) => (
                    <motion.div 
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-48 md:h-auto">
                            <img 
                              src={booking.image} 
                              alt={booking.movieTitle} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-3/4 flex flex-col">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{booking.movieTitle}</CardTitle>
                                  <CardDescription className="flex items-center gap-1 mt-1">
                                    <TicketCheck className="h-4 w-4" /> Booking ID: {booking.id}
                                  </CardDescription>
                                </div>
                                <Button variant="outline" size="sm">
                                  <Download className="h-3 w-3 mr-1" /> Ticket
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-grow">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{booking.theaterName}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">Seats:</span>{" "}
                                  <span className="font-medium">{booking.seats.join(", ")}</span>
                                </div>
                              </div>
                              <div className="pt-2 border-t">
                                <span className="text-sm text-muted-foreground">Total Paid:</span>{" "}
                                <span className="font-bold">{CURRENCY.symbol} {booking.totalPrice.toFixed(2)}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Payment Method:</span>{" "}
                                <span>{booking.paymentMethod === 'mpesa' ? 'M-Pesa' : booking.paymentMethod === 'card' ? 'Card' : 'Wallet'}</span>
                                {booking.paymentReference && (
                                  <span className="ml-2 text-xs font-mono text-muted-foreground">({booking.paymentReference})</span>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button 
                                variant="outline" 
                                className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive"
                                onClick={() => handleCancel(booking.id)}
                                disabled={isProcessing}
                              >
                                {isProcessing ? 'Processing...' : 'Cancel Booking'}
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div variants={itemVariants}>
                    <Alert>
                      <AlertDescription>
                        You have no active bookings at the moment.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                <motion.div variants={itemVariants}>
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="py-8">
                      <div className="text-center">
                        <TicketCheck className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                        <h3 className="text-xl font-semibold mb-1">No Past Bookings</h3>
                        <p className="text-muted-foreground mb-6">Your past booking history will appear here</p>
                        <Button variant="outline" asChild>
                          <a href="/">Browse Movies</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            <Card className="bg-primary/5 hover:bg-primary/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Top Up Wallet</h3>
                <p className="text-sm text-muted-foreground mb-4">Add funds to your wallet for faster checkout</p>
                <Button variant="outline" className="w-full">
                  Add Funds
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 hover:bg-primary/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Update Preferences</h3>
                <p className="text-sm text-muted-foreground mb-4">Set your preferred seats, snacks and theaters</p>
                <Button variant="outline" className="w-full">
                  Update
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 hover:bg-primary/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Join Loyalty Program</h3>
                <p className="text-sm text-muted-foreground mb-4">Get points for every booking and redeem for rewards</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MyBookingsPage;
