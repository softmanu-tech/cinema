
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, showtimes, generateRandomSeats } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie, ShowTime, Seat, AppliedOffer } from "@/types";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Info, Ticket, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENCY } from "@/constants";
import { initiateMpesaPayment } from "@/services/mpesa";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtime, setShowtime] = useState<ShowTime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [step, setStep] = useState<'seats' | 'details' | 'payment'>('seats');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'wallet'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedOffer, setAppliedOffer] = useState<AppliedOffer | null>(null);
  const [promoCode, setPromoCode] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === movieId);
    const foundShowtime = showtimes.find((s) => s.id === showtimeId);
    
    if (foundMovie && foundShowtime) {
      setMovie(foundMovie);
      setShowtime(foundShowtime);
      
      // Generate random seats
      const seatsData = generateRandomSeats(showtimeId ?? "");
      setSeats(seatsData);
    } else {
      navigate("/");
    }
  }, [movieId, showtimeId, navigate]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalPrice = () => {
    if (!showtime) return 0;
    let total = selectedSeats.length * showtime.price;
    
    // Apply discount if an offer is applied
    if (appliedOffer) {
      total -= appliedOffer.discountAmount;
    }
    
    return Math.max(0, total); // Ensure total is not negative
  };

  const applyPromoCode = () => {
    if (!promoCode) return;
    
    // In a real app, this would validate against actual offers
    // For demo purposes, we'll use a fixed discount
    if (promoCode === "MOVIE25") {
      const discountAmount = getTotalPrice() * 0.25; // 25% discount
      setAppliedOffer({
        offerId: "offer-1",
        code: promoCode,
        discountAmount
      });
      toast.success("Promo code applied successfully!");
      setPromoCode("");
    } else {
      toast.error("Invalid promo code. Please try again.");
    }
  };

  const handleNextStep = () => {
    if (step === 'seats') {
      if (selectedSeats.length === 0) {
        toast.error("Please select at least one seat");
        return;
      }
      setStep('details');
    } else if (step === 'details') {
      if (!name || !email) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (paymentMethod === 'mpesa' && !phone) {
        toast.error("Please provide a phone number for M-Pesa payment");
        return;
      }
      
      setStep('payment');
    } else {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'mpesa') {
        const totalPrice = getTotalPrice() + 1.50; // Including booking fee
        
        // Format phone number for M-Pesa (ensure it starts with 254)
        let formattedPhone = phone;
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '254' + formattedPhone.substring(1);
        }
        
        const response = await initiateMpesaPayment({
          phoneNumber: formattedPhone,
          amount: totalPrice,
          reference: `TKT-${Date.now()}`
        });
        
        if (response.ResponseCode === "0") {
          toast.success("Payment request sent! Check your phone.");
          
          // In a real app, we would wait for the callback
          // For demo, we'll simulate success after a delay
          setTimeout(() => {
            toast.success("Payment completed successfully!");
            
            navigate("/booking-confirmation", { 
              state: { 
                movie, 
                showtime, 
                selectedSeats,
                name,
                email,
                phone,
                totalPrice: getTotalPrice(),
                paymentMethod,
                mpesaReference: response.CheckoutRequestID
              } 
            });
          }, 3000);
        } else {
          toast.error("Payment request failed. Please try again.");
          setIsProcessing(false);
        }
      } else if (paymentMethod === 'card') {
        // Simulate card payment
        setTimeout(() => {
          toast.success("Card payment successful!");
          
          navigate("/booking-confirmation", { 
            state: { 
              movie, 
              showtime, 
              selectedSeats,
              name,
              email,
              totalPrice: getTotalPrice(),
              paymentMethod
            } 
          });
        }, 2000);
      } else if (paymentMethod === 'wallet') {
        // Simulate wallet payment
        setTimeout(() => {
          toast.success("Payment from wallet successful!");
          
          navigate("/booking-confirmation", { 
            state: { 
              movie, 
              showtime, 
              selectedSeats,
              name,
              email,
              totalPrice: getTotalPrice(),
              paymentMethod
            } 
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred while processing your payment");
      setIsProcessing(false);
    }
  };

  const renderSeats = () => {
    const rows = Array.from(new Set(seats.map(seat => seat.row))).sort();
    
    return (
      <motion.div
        className="mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Screen */}
        <motion.div className="mb-10 text-center" variants={itemVariants}>
          <div className="h-2 bg-primary/50 rounded-lg w-4/5 mx-auto mb-2 transform perspective-500 rotateX-40"></div>
          <p className="text-sm text-muted-foreground">SCREEN</p>
        </motion.div>
        
        <motion.div className="flex justify-center mb-8" variants={itemVariants}>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="seat seat-available w-6 h-6"></div>
              <span className="ml-2 text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="seat seat-selected w-6 h-6"></div>
              <span className="ml-2 text-sm">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="seat seat-booked w-6 h-6"></div>
              <span className="ml-2 text-sm">Booked</span>
            </div>
          </div>
        </motion.div>
        
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {rows.map((row, rowIndex) => (
              <motion.div 
                key={row} 
                className="flex items-center mb-2"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: rowIndex * 0.05 }}
              >
                <div className="w-8 text-center font-semibold">{row}</div>
                <div className="flex">
                  {seats
                    .filter(seat => seat.row === row)
                    .sort((a, b) => a.number - b.number)
                    .map((seat, seatIndex) => {
                      const isSelected = selectedSeats.some(s => s.id === seat.id);
                      
                      return (
                        <motion.div
                          key={seat.id}
                          className={cn(
                            "seat",
                            seat.status === 'booked' 
                              ? "seat-booked"
                              : isSelected 
                                ? "seat-selected" 
                                : "seat-available"
                          )}
                          onClick={() => handleSeatClick(seat)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { delay: rowIndex * 0.05 + seatIndex * 0.01 }
                          }}
                        >
                          {seat.number}
                        </motion.div>
                      );
                    })}
                </div>
                <div className="w-8 text-center font-semibold">{row}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCustomerDetails = () => {
    return (
      <motion.div 
        className="space-y-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your full name"
            required
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'mpesa' | 'card' | 'wallet')}
            className="mt-2 space-y-3"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted transition-colors">
              <RadioGroupItem value="mpesa" id="mpesa" />
              <Label htmlFor="mpesa" className="font-medium cursor-pointer flex-1">M-Pesa</Label>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO.png/320px-M-PESA_LOGO.png" 
                alt="M-Pesa" className="h-6" />
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted transition-colors">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="font-medium cursor-pointer flex-1">Credit/Debit Card</Label>
              <div className="flex space-x-1">
                <div className="h-6 w-10 bg-blue-500 rounded"></div>
                <div className="h-6 w-10 bg-red-500 rounded"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted transition-colors">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="font-medium cursor-pointer flex-1">Wallet Balance</Label>
              <span className="text-sm font-medium">{CURRENCY.symbol} 0.00</span>
            </div>
          </RadioGroup>
        </motion.div>
        
        {paymentMethod === 'mpesa' && (
          <motion.div variants={itemVariants}>
            <Label htmlFor="phone">M-Pesa Phone Number <span className="text-destructive">*</span></Label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted">
                <Phone className="h-4 w-4" />
              </div>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712345678"
                className="rounded-l-none"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Enter the phone number registered with M-Pesa</p>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="pt-4">
          <Label htmlFor="promoCode">Promo Code</Label>
          <div className="flex space-x-2">
            <Input 
              id="promoCode" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <Button type="button" onClick={applyPromoCode}>Apply</Button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderPayment = () => {
    return (
      <motion.div 
        className="space-y-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="rounded-lg border p-4" variants={itemVariants}>
          <h3 className="font-semibold mb-3">Payment Summary</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tickets ({selectedSeats.length} x {CURRENCY.symbol} {showtime?.price.toFixed(2)})</span>
              <span>{CURRENCY.symbol} {(selectedSeats.length * (showtime?.price || 0)).toFixed(2)}</span>
            </div>
            
            {appliedOffer && (
              <div className="flex justify-between text-green-500">
                <span>Discount ({appliedOffer.code})</span>
                <span>- {CURRENCY.symbol} {appliedOffer.discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Booking Fee</span>
              <span>{CURRENCY.symbol} 1.50</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{CURRENCY.symbol} {(getTotalPrice() + 1.50).toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="rounded-lg border p-4" variants={itemVariants}>
          <h3 className="font-semibold mb-3">Payment Method: {paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Wallet'}</h3>
          
          {paymentMethod === 'mpesa' && (
            <div className="space-y-2">
              <p className="text-sm">You will receive a payment prompt on your phone number:</p>
              <p className="font-mono bg-muted p-2 rounded text-center">{phone}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-4">
                <p className="text-sm text-yellow-700">
                  Please ensure your phone is on and has sufficient M-Pesa balance to complete this transaction.
                </p>
              </div>
            </div>
          )}
          
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'wallet' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Available Balance:</span>
                <span className="font-bold">{CURRENCY.symbol} 0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Required Amount:</span>
                <span className="font-bold">{CURRENCY.symbol} {(getTotalPrice() + 1.50).toFixed(2)}</span>
              </div>
              
              {getTotalPrice() + 1.50 > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-4">
                  <p className="text-sm text-yellow-700">
                    Insufficient balance. Please top up your wallet or select another payment method.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
        
        <motion.div className="bg-muted rounded-lg p-4 text-sm" variants={itemVariants}>
          <h4 className="font-medium mb-2">Refund Policy</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full refunds are available up to 24 hours before the showtime</li>
            <li>50% refund available between 24 and 4 hours before showtime</li>
            <li>No refunds available less than 4 hours before showtime</li>
            <li>All refunds are processed to your wallet within 24-48 hours</li>
          </ul>
        </motion.div>
      </motion.div>
    );
  };

  if (!movie || !showtime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => step === 'seats' ? navigate(-1) : setStep(step === 'payment' ? 'details' : 'seats')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 'seats' ? 'Back to Movie' : step === 'details' ? 'Back to Seat Selection' : 'Back to Details'}
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>
                      {showtime.date} | {showtime.time} | {showtime.theater}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Step {step === 'seats' ? '1' : step === 'details' ? '2' : '3'} of 3</p>
                    <p className="text-sm text-muted-foreground">
                      {step === 'seats' 
                        ? 'Select Seats' 
                        : step === 'details' 
                          ? 'Your Details' 
                          : 'Payment'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {step === 'seats' && renderSeats()}
                {step === 'details' && renderCustomerDetails()}
                {step === 'payment' && renderPayment()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  <span>
                    {step === 'seats' 
                      ? 'Select your preferred seats' 
                      : step === 'details' 
                        ? 'We\'ll send your tickets to this email' 
                        : 'Your payment information is secure'}
                  </span>
                </div>
                <Button 
                  onClick={handleNextStep} 
                  disabled={(step === 'seats' && selectedSeats.length === 0) || isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : step === 'payment' ? (
                    `Pay ${CURRENCY.symbol} ${(getTotalPrice() + 1.50).toFixed(2)}`
                  ) : (
                    'Continue'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.rating} | {movie.duration} min</p>
                    <p className="text-sm mt-1">{showtime.date} | {showtime.time}</p>
                    <p className="text-sm">{showtime.theater}</p>
                  </div>
                </motion.div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats
                        .sort((a, b) => a.row.localeCompare(b.row) || a.number - b.number)
                        .map((seat, index) => (
                          <motion.div 
                            key={seat.id} 
                            className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { delay: index * 0.05 }
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {seat.row}{seat.number}
                          </motion.div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No seats selected</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span>{CURRENCY.symbol} {(selectedSeats.length * showtime.price).toFixed(2)}</span>
                  </div>
                  
                  {appliedOffer && (
                    <div className="flex justify-between mb-2 text-green-500">
                      <span>Discount ({appliedOffer.code})</span>
                      <span>- {CURRENCY.symbol} {appliedOffer.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between mb-2">
                    <span>Booking Fee</span>
                    <span>{CURRENCY.symbol} 1.50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{CURRENCY.symbol} {(getTotalPrice() + 1.50).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open(`tel:+254-700-TICKETS`)}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  Need Help? Call Support
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
