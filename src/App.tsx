
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MealPlanProvider } from "@/contexts/MealPlanContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MealPlanner from "./pages/MealPlanner";
import BMICalculator from "./pages/BMICalculator";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MealPlans from "./pages/MealPlans";
import MealPlanDetail from "./pages/MealPlanDetail";
import NotFound from "./pages/NotFound";
import NutritionDatabase from "./pages/NutritionDatabase";
import Blog from "./pages/Blog";
import Recipes from "./pages/Recipes";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MealPlanProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/meal-plans/:id" element={<MealPlanDetail />} />
              <Route path="/nutrition-database" element={<NutritionDatabase />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MealPlanProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
