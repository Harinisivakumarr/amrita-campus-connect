
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, BookOpen, Coffee, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              A-Reserve
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link 
                  to="/classrooms" 
                  className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Classrooms</span>
                </Link>
                <Link 
                  to="/canteen" 
                  className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  <Coffee className="h-4 w-4" />
                  <span>Canteen</span>
                </Link>
                <Link 
                  to="/faculty" 
                  className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  <Users className="h-4 w-4" />
                  <span>Faculty</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="hidden md:flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <div className="hidden md:block">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="mr-2">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">Register</Button>
                </Link>
              </div>
            )}
            
            <button 
              className="md:hidden text-foreground focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {user ? (
              <>
                <Link 
                  to="/classrooms" 
                  className="flex items-center space-x-2 text-foreground p-2 rounded-lg hover:bg-primary/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Classrooms</span>
                </Link>
                <Link 
                  to="/canteen" 
                  className="flex items-center space-x-2 text-foreground p-2 rounded-lg hover:bg-primary/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Coffee className="h-5 w-5" />
                  <span>Canteen</span>
                </Link>
                <Link 
                  to="/faculty" 
                  className="flex items-center space-x-2 text-foreground p-2 rounded-lg hover:bg-primary/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span>Faculty</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center space-x-2 w-full"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
