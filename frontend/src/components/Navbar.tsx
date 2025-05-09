
import { Link } from "react-router-dom";
import { Search, Ticket, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-card fixed w-full z-10 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Ticket className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">TicketRambler</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Movies
            </Link>
            <Link to="/theaters" className="text-foreground hover:text-primary transition-colors">
              Theaters
            </Link>
            <Link to="/offers" className="text-foreground hover:text-primary transition-colors">
              Offers
            </Link>
            <Link to="/my-bookings" className="text-foreground hover:text-primary transition-colors">
              My Bookings
            </Link>

            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
            </div>

            <Button variant="default" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary px-2 py-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/theaters" 
                className="text-foreground hover:text-primary px-2 py-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Theaters
              </Link>
              <Link 
                to="/offers" 
                className="text-foreground hover:text-primary px-2 py-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Offers
              </Link>
              <Link 
                to="/my-bookings" 
                className="text-foreground hover:text-primary px-2 py-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="py-2 pl-10 pr-4 w-full rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
              </div>
              
              <Button variant="default" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
