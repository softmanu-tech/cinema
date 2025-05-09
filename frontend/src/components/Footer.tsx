
import { Ticket, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Ticket className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">TicketRambler</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your one-stop destination for premium movie experiences. Book tickets, check showtimes, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-muted-foreground hover:text-primary transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/theaters" className="text-muted-foreground hover:text-primary transition-colors">
                  Theaters
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-muted-foreground hover:text-primary transition-colors">
                  Offers & Promotions
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-muted-foreground hover:text-primary transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Info</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest movies and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md border border-border focus:outline-none focus:ring-2 focus:ring-primary flex-1"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-md">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TicketRambler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
