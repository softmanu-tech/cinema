
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Tag, Percent, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { CURRENCY } from "@/constants";
import { toast } from "sonner";

const offers = [
  {
    id: "1",
    title: "Midweek Special",
    description: "40% off all movie tickets every Tuesday and Wednesday",
    validUntil: "2025-12-31",
    code: "MIDWEEK40",
    discount: `40% off`,
    discountType: "percentage",
    discountValue: 40,
    conditions: ["Valid only on Tuesdays and Wednesdays", "Not valid on holidays", "Cannot be combined with other offers"]
  },
  {
    id: "2",
    title: "Student Discount",
    description: "25% off with valid student ID, any day of the week",
    validUntil: "2025-12-31", 
    code: "STUDENT25",
    discount: "25% off",
    discountType: "percentage",
    discountValue: 25,
    conditions: ["Must present valid student ID", "One ticket per ID", "Valid for standard screenings only"]
  },
  {
    id: "3",
    title: "Family Package",
    description: `Buy 4 tickets and get 20% off plus a free popcorn worth ${CURRENCY.symbol} 350`,
    validUntil: "2025-08-31",
    code: "FAMILY20",
    discount: `20% off + free popcorn`,
    discountType: "percentage",
    discountValue: 20,
    conditions: ["Must purchase 4 or more tickets", "Valid on weekends and holidays", "One free regular popcorn per group"]
  },
  {
    id: "4",
    title: "Early Bird Special",
    description: "30% off all screenings before 12pm",
    validUntil: "2025-12-31",
    code: "EARLYBIRD30",
    discount: "30% off",
    discountType: "percentage",
    discountValue: 30,
    conditions: ["Valid for screenings starting before 12pm", "Available all week", "Subject to availability"]
  },
  {
    id: "5",
    title: "VIP Experience",
    description: `Premium seating and gourmet snacks for ${CURRENCY.symbol} 2,500 per person`,
    validUntil: "2025-12-31",
    code: "VIPEXP",
    discount: "Premium Package",
    discountType: "fixed",
    discountValue: 0,
    conditions: ["Includes recliner seat", "Gourmet snack platter and drink", "Priority entry to theater"]
  },
  {
    id: "6",
    title: "M-Pesa Discount",
    description: "5% cashback when you pay with M-Pesa",
    validUntil: "2025-12-31",
    code: "MPESA5",
    discount: "5% cashback",
    discountType: "percentage",
    discountValue: 5,
    conditions: ["Must pay using M-Pesa", "Cashback credited to wallet within 24 hours", "Maximum cashback of KSh 500 per transaction"]
  }
];

const OffersPage = () => {
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
      transition: { duration: 0.4 }
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <motion.div 
      className="container mx-auto pt-24 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 mt-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Special Offers
      </motion.h1>
      
      <motion.div variants={itemVariants}>
        <Alert className="mb-8 bg-primary/10 border-primary">
          <AlertDescription className="text-foreground flex items-center">
            <Check className="h-4 w-4 text-primary mr-2" />
            Use these promo codes during checkout to redeem your discount. All offers are subject to availability.
          </AlertDescription>
        </Alert>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {offers.map((offer) => (
          <motion.div key={offer.id} variants={itemVariants}>
            <Card className="h-full border-2 border-muted hover:border-primary/50 transition-colors overflow-hidden">
              <div className={`h-2 bg-primary w-full`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{offer.title}</CardTitle>
                    <CardDescription className="mt-1">{offer.description}</CardDescription>
                  </div>
                  <motion.div 
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {offer.discount}
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
                <motion.div 
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="font-medium">Promo Code:</span>
                  </div>
                  <motion.div 
                    className="bg-muted px-3 py-2 rounded-md font-mono text-center select-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCopyCode(offer.code)}
                  >
                    {offer.code}
                  </motion.div>
                </motion.div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Conditions:</p>
                  <ul className="text-sm space-y-1.5">
                    {offer.conditions.map((condition, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                      >
                        <div className="min-w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary mt-1">{index + 1}</div>
                        {condition}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  asChild
                >
                  <a href="/">Book With This Offer</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Special Membership Section */}
      <motion.div 
        className="mt-16 p-8 rounded-xl bg-card border border-muted"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Movie Lovers Membership</h2>
            <p className="text-muted-foreground mb-6">
              Join our exclusive membership program and enjoy benefits year-round with special discounts, 
              priority bookings, and members-only events.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">10% off all tickets</h3>
                  <p className="text-sm text-muted-foreground">All year round, any movie</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Priority seating</h3>
                  <p className="text-sm text-muted-foreground">Book before everyone else</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Free popcorn refills</h3>
                  <p className="text-sm text-muted-foreground">On every visit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Exclusive premieres</h3>
                  <p className="text-sm text-muted-foreground">Access to special screenings</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-primary hover:bg-primary/90">
              Become a Member
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg"></div>
            <div className="relative p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Annual Membership</h3>
              <div className="text-3xl font-bold mb-1">{CURRENCY.symbol} 2,500</div>
              <p className="text-sm text-muted-foreground mb-6">Save over {CURRENCY.symbol} 5,000 per year</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Joining fee</span>
                  <span>{CURRENCY.symbol} 0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Monthly option</span>
                  <span>{CURRENCY.symbol} 250/month</span>
                </div>
                <div className="border-t border-muted my-2"></div>
                <div className="flex items-center justify-between font-medium">
                  <span>Best value</span>
                  <span>Annual payment</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Join Now</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OffersPage;
