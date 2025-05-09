
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import NotFound from "./pages/NotFound";
import TheatersPage from "./pages/TheatersPage";
import OffersPage from "./pages/OffersPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import SignInPage from "./pages/SignInPage";
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/booking/:movieId/:showtimeId" element={<BookingPage />} />
              <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="/theaters" element={<TheatersPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </LazyMotion>
  </QueryClientProvider>
);

export default App;
