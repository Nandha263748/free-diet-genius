
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <span className="mr-2">🥗</span>
          <span>DietGenius</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/meal-planner" className="text-foreground hover:text-primary transition-colors">
            Meal Planner
          </Link>
          <Link to="/bmi-calculator" className="text-foreground hover:text-primary transition-colors">
            BMI Calculator
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <span className="text-primary-foreground font-medium">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/meal-plans')}>
                  <span className="mr-2">🍽️</span>
                  <span>My Meal Plans</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
              <Button
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <Link 
              to="/" 
              className="py-3 text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/meal-planner" 
              className="py-3 text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Meal Planner
            </Link>
            <Link 
              to="/bmi-calculator" 
              className="py-3 text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              BMI Calculator
            </Link>
            <Link 
              to="/about" 
              className="py-3 text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="py-3 text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/meal-plans" 
                  className="py-3 text-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  My Meal Plans
                </Link>
                <button 
                  className="py-3 text-left text-foreground hover:text-primary transition-colors"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    toggleMenu();
                  }}
                >
                  Log in
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    toggleMenu();
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
